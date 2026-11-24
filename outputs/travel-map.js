let tripMapSelectedDate = '';
let tripMapInstance = null;
let tripMapRequestActive = false;
let tripMapMessage = '';
let tripRouteLastRequestAt = 0;

function tripMapEntries(destinationId, date) {
  return (data.tripItinerary || [])
    .filter(item => item.destinationId === destinationId && String(item.date || '') === String(date || ''))
    .sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')));
}

function hasTripMapCoords(item) { return item?.lat !== '' && item?.lat != null && item?.lon !== '' && item?.lon != null && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)); }

function tripMapSignature(entries) {
  return JSON.stringify(entries.map(item => [item.id, hasTripMapCoords(item) ? Number(item.lat) : null, hasTripMapCoords(item) ? Number(item.lon) : null]));
}

function tripMapStraightDistance(points) {
  const radians = value => value * Math.PI / 180;
  return points.slice(1).reduce((sum, point, index) => {
    const previous = points[index];
    const dLat = radians(point[1] - previous[1]);
    const dLon = radians(point[0] - previous[0]);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(previous[1])) * Math.cos(radians(point[1])) * Math.sin(dLon / 2) ** 2;
    return sum + 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }, 0);
}

function tripMapRoute(destinationId, date, entries) {
  const signature = tripMapSignature(entries);
  return (data.tripRoutes || []).find(route => route.destinationId === destinationId && route.date === date && route.signature === signature) || null;
}

function tripMapMarkup(destination, cards, itemDate) {
  const validCards = cards.filter(card => card.date);
  const fallbackDate = validCards[0]?.date || '';
  if (!validCards.some(card => card.date === tripMapSelectedDate)) tripMapSelectedDate = fallbackDate;
  const date = tripMapSelectedDate;
  const entries = tripMapEntries(destination.id, date);
  const route = tripMapRoute(destination.id, date, entries);
  const addressCount = entries.filter(hasTripMapCoords).length;
  const dateLabel = date ? tripDateLabel(date, true) : 'Escolha uma data da viagem';
  const dayTabs = validCards.map(card => {
    const count = tripMapEntries(destination.id, card.date).length;
    const label = tripDateLabel(card.date, true).replace(/,.*$/, '');
    return `<button class="trip-map-day ${card.date === date ? 'active' : ''}" data-trip-map-day="${esc(card.date)}" aria-pressed="${card.date === date}"><strong>${esc(label)}</strong><small>${count} ${count === 1 ? 'parada' : 'paradas'}</small></button>`;
  }).join('');
  const stopList = entries.length ? `<ol class="trip-map-stops">${entries.map((item, index) => {
    const query = encodeURIComponent([item.name, item.address, destination.city || destination.name, destinationCountry(destination)].filter(Boolean).join(', '));
    const coords = hasTripMapCoords(item);
    return `<li><span class="trip-map-stop-number">${index + 1}</span><div><strong>${esc(item.name)}</strong><small>${esc(item.address || 'Endereço ainda não localizado')}</small></div><a href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" rel="noopener" aria-label="Abrir ${esc(item.name)} no mapa">↗</a>${coords ? '<i class="trip-map-located" title="Localização encontrada"></i>' : ''}</li>`;
  }).join('')}</ol>` : '<p class="trip-map-empty">Ainda não há passeios nesta data. Adicione uma parada ao roteiro para ver o percurso.</p>';
  const distance = route?.distance ? `${route.distance >= 1000 ? (route.distance / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' km' : Math.round(route.distance) + ' m'}${route.profile === 'direct' ? ' · linha direta aprox.' : ''}` : '';
  return `<section class="trip-map-panel" data-trip-map-destination="${esc(destination.id)}" data-trip-map-date="${esc(date)}">
    <div class="trip-map-heading"><div><span class="eyebrow">MAPA DO ROTEIRO</span><h3>${esc(dateLabel)}</h3><p>${entries.length} ${entries.length === 1 ? 'parada' : 'paradas'}${distance ? ` · ${esc(distance)}${route?.profile === 'direct' ? '' : ' a pé'}` : addressCount ? ` · ${addressCount} no mapa` : ''}</p></div><button class="button primary" data-trip-map-build ${!entries.length || tripMapRequestActive ? 'disabled' : ''}>${tripMapRequestActive ? 'Localizando…' : '⌖ Localizar & traçar rota'}</button></div>
    <div class="trip-map-day-picker" role="tablist" aria-label="Escolher dia do roteiro">${dayTabs || '<span>Defina as datas da viagem para organizar o mapa por dia.</span>'}</div>
    <div class="trip-map-layout"><div class="trip-map-canvas" id="trip-route-map" role="region" aria-label="Mapa dos passeios do dia"></div><aside class="trip-map-side"><div class="trip-map-side-heading"><strong>Paradas do dia</strong>${distance ? `<span>${esc(distance)}</span>` : ''}</div>${stopList}<p class="trip-map-status" id="trip-map-status" aria-live="polite">${esc(tripMapMessage || (route ? route.profile === 'direct' ? 'O serviço de rotas não respondeu; esta linha liga os pontos em linha reta, sem seguir as ruas.' : 'Percurso a pé calculado pela ordem dos horários.' : addressCount ? 'Pontos localizados. Toque em “Localizar & traçar rota” para calcular o caminho a pé.' : 'Toque em “Localizar & traçar rota” para buscar os endereços e montar o percurso.'))}</p></aside></div>
    <div class="trip-map-attribution">Mapas © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · rotas a pé via <a href="https://routing.openstreetmap.de/about.html" target="_blank" rel="noopener">FOSSGIS</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener">corrigir o mapa</a>. Os nomes/endereço são enviados para localizar os pontos quando você solicita.</div>
  </section>`;
}

function initTripMap() {
  if (tripMapInstance) {
    tripMapInstance.remove();
    tripMapInstance = null;
  }
  const host = document.querySelector('#trip-route-map');
  if (!host) return;
  if (!window.L) {
    host.innerHTML = '<div class="trip-map-placeholder"><span>⌖</span><strong>Mapa temporariamente indisponível</strong><small>Confira sua conexão para carregar o mapa. Os endereços e links das paradas continuam disponíveis ao lado.</small></div>';
    return;
  }
  const panel = host.closest('[data-trip-map-destination]');
  const destinationId = panel?.dataset.tripMapDestination;
  const date = panel?.dataset.tripMapDate || '';
  const entries = tripMapEntries(destinationId, date);
  const located = entries.filter(hasTripMapCoords);
  if (!located.length) {
    host.innerHTML = '<div class="trip-map-placeholder"><span>⌖</span><strong>Seu roteiro vai aparecer aqui</strong><small>Localize os endereços para ver as paradas e o caminho no mapa.</small></div>';
    return;
  }
  const center = [Number(located[0].lat), Number(located[0].lon)];
  const map = window.L.map(host, { scrollWheelZoom: false, zoomControl: true }).setView(center, 13);
  tripMapInstance = map;
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
  }).addTo(map);
  const markers = [];
  located.forEach(item => {
    const number = entries.indexOf(item) + 1;
    const icon = window.L.divIcon({ className: 'trip-map-marker-wrap', html: `<span class="trip-map-marker">${number}</span>`, iconSize: [32, 32], iconAnchor: [16, 16] });
    const marker = window.L.marker([Number(item.lat), Number(item.lon)], { icon }).addTo(map).bindPopup(`<strong>${esc(item.name)}</strong><br>${esc(item.address || '')}`);
    markers.push(marker);
  });
  const route = tripMapRoute(destinationId, date, entries);
  if (route?.coordinates?.length > 1) {
    const line = window.L.geoJSON({ type: 'LineString', coordinates: route.coordinates }, { style: { color: '#ee741f', weight: 5, opacity: .88, lineCap: 'round', lineJoin: 'round', dashArray: route.profile === 'direct' ? '7 8' : null } }).addTo(map);
    map.fitBounds(line.getBounds().pad(.16));
  } else if (markers.length > 1) {
    map.fitBounds(window.L.featureGroup(markers).getBounds().pad(.18));
  } else {
    map.setView(center, 15);
  }
  setTimeout(() => map.invalidateSize(), 80);
}

async function geocodeTripItem(item, destination) {
  const query = [item.name, item.address, destination.city || destination.name, destinationCountry(destination)].filter(Boolean).join(', ');
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.search = new URLSearchParams({ q: query, format: 'jsonv2', limit: '1', addressdetails: '1' });
  const response = await fetch(url, { headers: { Accept: 'application/json' }, referrerPolicy: 'strict-origin-when-cross-origin' });
  if (!response.ok) throw new Error('O serviço de endereços está indisponível agora. Tente novamente mais tarde.');
  const results = await response.json();
  if (!results.length) return false;
  item.lat = Number(results[0].lat);
  item.lon = Number(results[0].lon);
  item.address = results[0].display_name || item.address || '';
  return true;
}

async function buildTripMapRoute(destinationId, date) {
  if (tripMapRequestActive) return;
  const destination = data.lugares.find(item => item.id === destinationId);
  const entries = tripMapEntries(destinationId, date);
  if (!destination || !entries.length) return;
  tripMapRequestActive = true;
  const status = document.querySelector('#trip-map-status');
  const button = document.querySelector('[data-trip-map-build]');
  if (button) { button.disabled = true; button.textContent = 'Localizando…'; }
  let lookedUp = 0;
  tripMapMessage = 'Preparando a busca dos endereços…';
  try {
    for (const item of entries) {
      if (hasTripMapCoords(item)) continue;
      if (lookedUp) await new Promise(resolve => setTimeout(resolve, 1100));
      tripMapMessage = `Buscando endereço ${lookedUp + 1} de ${entries.filter(row => !hasTripMapCoords(row)).length}…`; if (status) status.textContent = tripMapMessage;
      const found = await geocodeTripItem(item, destination);
      lookedUp++;
      save();
      if (!found) item.geocodeError = 'Endereço não localizado';
      else delete item.geocodeError;
    }
    const located = entries.filter(hasTripMapCoords);
    if (!located.length) throw new Error('Não encontrei endereços para este dia. Edite as paradas e acrescente o endereço ou a cidade.');
    let routeRecord = { destinationId, date, signature: tripMapSignature(entries), coordinates: located.map(item => [Number(item.lon), Number(item.lat)]), distance: 0, duration: 0, profile: 'foot' };
    if (located.length > 1) {
      tripMapMessage = 'Desenhando o percurso a pé…'; if (status) status.textContent = tripMapMessage;
      const points = located.map(item => `${Number(item.lon)},${Number(item.lat)}`).join(';');
      const endpoint = `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${points}?overview=full&geometries=geojson&steps=false`;
      try {
        const wait = Math.max(0, 1100 - (Date.now() - tripRouteLastRequestAt));
        if (wait) await new Promise(resolve => setTimeout(resolve, wait));
        tripRouteLastRequestAt = Date.now();
        const response = await fetch(endpoint, { headers: { Accept: 'application/json' }, referrerPolicy: 'strict-origin-when-cross-origin' });
        if (!response.ok) throw new Error('routing');
        const result = await response.json();
        if (result.code !== 'Ok' || !result.routes?.length) throw new Error('routing');
        routeRecord.coordinates = result.routes[0].geometry.coordinates;
        routeRecord.distance = result.routes[0].distance || 0;
        routeRecord.duration = result.routes[0].duration || 0;
      } catch {
        routeRecord.profile = 'direct';
        routeRecord.distance = tripMapStraightDistance(routeRecord.coordinates);
        tripMapMessage = 'O serviço de rota a pé não respondeu; mostrando uma ligação aproximada em linha reta.';
        if (status) status.textContent = tripMapMessage;
      }
    }
    data.tripRoutes = (data.tripRoutes || []).filter(route => route.destinationId !== destinationId || route.date !== date);
    data.tripRoutes.push(routeRecord);
    save();
    if (routeRecord.profile !== 'direct') tripMapMessage = located.length > 1 ? 'Percurso a pé pronto, seguindo a ordem do roteiro.' : 'Localização encontrada. Adicione mais uma parada para traçar o percurso.'; if (status) status.textContent = tripMapMessage;
  } catch (error) {
    tripMapMessage = error.message || 'Não foi possível localizar esses lugares agora.'; if (status) status.textContent = tripMapMessage;
  } finally {
    tripMapRequestActive = false;
    render();
  }
}
