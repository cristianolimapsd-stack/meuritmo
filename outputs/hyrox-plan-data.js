const hyroxPlan = {
  title: 'HYROX São Paulo · Ciclo 1',
  eventDate: '2027-05-07',
  eventLabel: '7 e 8 de maio de 2027 · Open Solo',
  cycleStart: '2026-10-26',
  cycleEnd: '2026-12-06',
  goal: 'Ganhar força e massa muscular, construir base aeróbica sem lesão e aprender a técnica das estações.',
  targets: [
    ['Força e massa muscular', 'Prioridade do Ciclo 1'],
    ['Corrida fácil', 'Esforço 4–5/10 · fale frases completas'],
    ['Proteína', 'Mínimo de 120 g por dia'],
    ['Sono', '7–8 h · referência 21h–22h'],
  ],
  phases: [
    { name: '1 · Base', period: 'nov–dez/2026', focus: 'Músculo, base aeróbica, core e pegada. Em dezembro, 1 contato semanal com as estações em academia equipada.' },
    { name: '2 · HYROX', period: 'jan–fev/2027', focus: 'Cerca de 17 semanas até a prova. 2 treinos específicos por semana, corrida contínua e musculação 2–3 vezes.' },
    { name: '3 · Específica', period: 'mar–abr/2027', focus: 'Simulações parciais e completas, ritmo de prova e manutenção da força.' },
    { name: '4 · Taper', period: 'fim de abr–7/05/2027', focus: 'Redução de fadiga e preparação para a prova.' },
  ],
  stations: [
    ['SkiErg', '1.000 m'], ['Sled Push', '50 m · referência Open masculino: 152 kg com trenó'],
    ['Sled Pull', '50 m · referência Open masculino: 103 kg com trenó'], ['Burpee Broad Jump', '80 m'],
    ['Remo', '1.000 m'], ['Farmers Carry', '200 m · referência Open masculino: 2 × 24 kg'],
    ['Sandbag Lunges', '100 m · referência Open masculino: 20 kg'], ['Wall Balls', '100 repetições · referência Open masculino: 6 kg / alvo 3 m'],
  ],
  strength: [
    { id: 'upper-a', title: 'Superiores A', day: 'Segunda · 12h', duration: '≈55 min', objective: 'Peito, ombros, tríceps e costas (empurrar)', exercises: [
      ['Supino reto com halteres (ou máquina)', '8–10', '3·4·4·2'], ['Remada sentada na polia, pegada neutra', '10–12', '3·3·3·2'], ['Desenvolvimento com halteres sentado', '8–10', '3·3·3·2'], ['Crucifixo na máquina (peck deck)', '12–15', '2·2·2·2'], ['Elevação lateral com halteres', '12–15', '3·3·3·2'], ['Rosca direta com barra W', '10–12', '3·3·3·2'], ['Tríceps na corda', '12–15', '2·2·2·2'], ['Pallof press (cabo ou elástico)', '10 por lado', '2·2·2·2'],
    ]},
    { id: 'lower-a', title: 'Inferiores A', day: 'Terça · 12h', duration: '≈50 min', objective: 'Força de pernas: agachamento e posterior de coxa', exercises: [
      ['Agachamento livre (goblet ou barra)', '6–8', '3·4·4·2'], ['Levantamento terra romeno', '8–10', '3·3·3·2'], ['Passada reversa com halteres', '8 por perna', '2·2·2·2'], ['Panturrilha em pé', '12–15', '3·3·3·2'], ['Prancha lateral', '30 s por lado', '2·2·2·2'],
    ]},
    { id: 'upper-b', title: 'Superiores B', day: 'Quarta · 12h', duration: '≈55 min', objective: 'Costas, ombro posterior, bíceps, postura e pegada', exercises: [
      ['Puxada frontal, pegada pronada aberta', '8–10', '3·4·4·2'], ['Supino inclinado com halteres (banco a 30°)', '8–10', '3·3·3·2'], ['Remada unilateral com halter (serrote)', '8–10 por lado', '3·3·3·2'], ['Crucifixo inverso na máquina', '12–15', '3·3·3·2'], ['Rosca martelo com halteres', '10–12', '2·2·2·2'], ['Tríceps testa com halteres', '10–12', '2·2·2·2'], ['Farmers hold com halteres pesados', '30–40 s', '3·3·3·2'], ['Dead hang (pendurar na barra)', '20–40 s', '2·2·2·2'],
    ]},
    { id: 'lower-b', title: 'Inferiores B', day: 'Sexta · 12h', duration: '≈50 min', objective: 'Pernas em volume moderado, trabalho unilateral e glúteos', exercises: [
      ['Leg press', '10–12', '3·4·4·2'], ['Step-up com halteres', '8–10 por perna', '3·3·3·2'], ['Cadeira flexora', '10–12', '3·3·3·2'], ['Hip thrust', '8–10', '3·3·3·2'], ['Panturrilha sentada', '15', '3·3·3·2'], ['Dead bug', '8 por lado', '3·3·3·2'],
    ]},
    { id: 'arms', title: 'Ombro e braço', day: 'Sábado à tarde · opcional nas semanas 1–2', duration: '≈30 min', objective: 'Volume extra, sem falhar; recomendado nas semanas 3–4 se sono e pernas estiverem bem', exercises: [
      ['Elevação lateral com halteres', '15', '—·—·3·2'], ['Face pull na polia alta', '15', '—·—·3·2'], ['Rosca alternada no banco inclinado', '12', '—·—·2·2'], ['Tríceps na corda', '15', '—·—·2·2'],
    ]},
  ],
  running: [
    { week: 'Pré-ciclo', dates: '30/10–4/11', monday: '—', saturday: '31/10 · 2 min correndo / 1 min caminhando × 7', total: '21 min' },
    { week: 'Semana 0', dates: '5–8/11', monday: '—', saturday: '7/11 · 3 min correndo / 1 min caminhando × 5', total: '20 min' },
    { week: 'Semana 1', dates: '9–15/11', monday: '3 min / 1 min × 5', saturday: '3 min / 1 min × 6', total: '20 e 24 min' },
    { week: 'Semana 2', dates: '16–22/11', monday: '3 min / 1 min × 6', saturday: '4 min / 1 min × 5', total: '24 e 25 min' },
    { week: 'Semana 3', dates: '23–29/11', monday: '4 min / 1 min × 5', saturday: '5 min / 1 min × 5', total: '25 e 30 min' },
    { week: 'Semana 4', dates: '30/11–6/12', monday: '3 min / 1 min × 5 · recuperação', saturday: '5/12 · teste leve de 20 min', total: '20 min' },
  ],
  stairs: [
    ['Semanas 1–2', '4 rounds: 2 min de escada + 6 wall balls + 1 min caminhando', 'Esforço 5–6/10'],
    ['Semana 3', '5 rounds: 2 min de escada + 8 wall balls + 1 min caminhando', 'Esforço 5–6/10'],
    ['Semana 4 · recuperação', '3 rounds: 2 min de escada + 6 wall balls + 1 min caminhando', 'Esforço 5/10'],
  ],
  safety: [
    'Corrida fácil: esforço 4–5/10 e conversa em frases completas. Termine sentindo que poderia continuar.',
    'Antes e depois de correr: 5 min caminhando. Se a perna estiver muito dolorida, troque por caminhada.',
    'Dor articular acima de 3/10 por mais de 48 h ou sono abaixo de 6 h em duas noites: reduza o volume por uma semana.',
    'Dor aguda, tontura ou desconforto no peito: interrompa a sessão e procure atendimento.',
    'Aquecimento de musculação: 5 min de caminhada ou bicicleta e séries leves. Trabalhe com 2–3 repetições sobrando.',
  ],
};

const hyroxMenu = {
  goals: { calories: '≈2.500 kcal/dia', protein: 'mínimo 120 g/dia', water: '≈2,2–2,6 L/dia + mais nos dias de corrida', weight: 'tendência desejada: +0,15 a 0,3 kg/semana' },
  restrictions: 'Arroz parboilizado · queijo coalho como único queijo · patinho como carne moída · sem peixe ou frutos do mar.',
  meals: [
    { id: 'preRun', name: 'Pré-corrida', time: '06:00 · seg, qua e sáb', options: [
      ['1','1 banana','90','1'],['2','1 fatia de pão de forma + 1 colher de chá de mel','84','2'],['3','1 fruta média (mamão, maçã ou laranja) + 1 colher de chá de mel','86','1'],['4','100 g de iogurte natural integral + 15 g de aveia','120','6'],['5','30 g de goma de tapioca (seca)','105','0'],
    ]},
    { id: 'breakfast', name: 'Café da manhã', time: '08:00', options: [
      ['A','2 ovos + 30 g de queijo coalho + 40 g de goma de tapioca + 1 fruta + 200 ml de leite integral','567','26'],['B','150 g de cuscuz cozido + 2 ovos + 30 g de queijo coalho + 1 banana + 1 colher de chá de azeite','536','24'],['C','1 pão francês + 2 ovos + azeite + 30 g de queijo coalho + 1 fruta + 150 ml de leite integral','582','29'],['D','1 banana + 2 ovos + 30 g de aveia + 1 colher de sopa de pasta de amendoim + 200 ml de leite integral','563','28'],['E','250 ml de leite integral + 45 g de aveia + 1 banana + 1 colher de sopa de pasta de amendoim + 1 ovo','581','25'],
    ]},
    { id: 'preWorkout', name: 'Lanche pré-treino', time: '10:30 · treino às 12h', options: [
      ['A','170 g de iogurte integral + 40 g de aveia + 1 banana + 1 colher de sopa de pasta de amendoim','440','16'],['B','250 ml de leite integral + 1 banana + 30 g de aveia + 1 colher de sopa de pasta de amendoim','450','17'],['C','2 fatias de pão de forma + 2 ovos + 30 g de queijo coalho + 1 fruta','431','24'],['D','40 g de goma de tapioca + 1 ovo + 30 g de queijo coalho + 1 banana','398','14'],['E','1 pão francês + 1 colher de sopa de pasta de amendoim + 1 banana + 200 ml de leite integral','451','15'],
    ]},
    { id: 'lunch', name: 'Almoço pós-treino', time: '14:00 · até 1 h depois do treino', options: [
      ['A','250 g de arroz parboilizado + 100 g de feijão + 120 g de frango + legumes + 1 colher de sopa de azeite','720','51'],['B','200 g de arroz parboilizado + 100 g de feijão + 120 g de patinho moído + salada + 1 colher de sopa de azeite','722','52'],['C','250 g de macarrão cozido + 120 g de frango desfiado + 100 g de molho de tomate + 1 colher de chá de azeite','657','54'],['D','150 g de mandioca + 100 g de feijão + 120 g de coxão mole + salada + 1 colher de sopa de azeite','662','45'],['E','200 g de arroz parboilizado + 100 g de feijão + 150 g de sobrecoxa sem pele + legumes + 1 colher de chá de azeite','683','50'],
    ]},
    { id: 'snack', name: 'Lanche da tarde', time: '17:00', options: [
      ['A','2 fatias de pão de forma + 2 ovos + 1 fruta','335','18'],['B','170 g de iogurte integral + 30 g de aveia + 1 banana + 1 colher de chá de mel','333','11'],['C','35 g de goma de tapioca + 45 g de queijo coalho + 1 fruta','332','11'],['D','250 ml de leite integral + 1 banana + 20 g de aveia','321','12'],['E','170 g de iogurte integral + 20 g de castanha de caju + 1 fruta','284','10'],['F','1 pão francês + 60 g de frango desfiado + 1 fruta','310','24'],
    ]},
    { id: 'dinner', name: 'Jantar', time: '19:00', options: [
      ['A','120 g de patinho moído + 200 g de batata-doce + salada + 1 colher de chá de azeite','484','43'],['B','2 ovos + 60 g de frango desfiado + 30 g de queijo coalho + 150 g de batata-doce + salada','481','40'],['C','120 g de frango grelhado + 160 g de arroz parboilizado + 100 g de legumes + 1 colher de chá de azeite','464','44'],['D','120 g de sobrecoxa sem pele + 150 g de mandioca + salada + 1 colher de chá de azeite','482','33'],['E','100 g de coxão mole + 120 g de arroz parboilizado + 100 g de feijão + salada','473','41'],
    ]},
    { id: 'supper', name: 'Ceia opcional', time: '20:00 · só se houver fome ou necessidade', options: [
      ['A','200 ml de leite integral + 20 g de aveia','201','9'],['B','200 g de iogurte natural integral + 1 banana','212','8'],['C','2 ovos + 1 fatia de pão de forma','207','15'],['D','150 g de iogurte natural integral + 20 g de castanha de caju','206','9'],
    ]},
  ],
  weekly: [
    {day:'Segunda',preRun:'1',breakfast:'A',preWorkout:'B',lunch:'C',snack:'D',dinner:'E',kcal:2558,protein:151},
    {day:'Terça',preRun:null,breakfast:'B',preWorkout:'C',lunch:'D',snack:'E',dinner:'A',kcal:2397,protein:146},
    {day:'Quarta',preRun:'3',breakfast:'C',preWorkout:'D',lunch:'E',snack:'F',dinner:'B',kcal:2540,protein:158},
    {day:'Quinta',preRun:null,breakfast:'D',preWorkout:'E',lunch:'A',snack:'A',dinner:'C',kcal:2533,protein:156},
    {day:'Sexta',preRun:null,breakfast:'E',preWorkout:'A',lunch:'B',snack:'B',dinner:'D',kcal:2558,protein:137},
    {day:'Sábado',preRun:'1',breakfast:'A',preWorkout:'B',lunch:'C',snack:'C',dinner:'E',kcal:2569,protein:150},
    {day:'Domingo',preRun:null,breakfast:'B',preWorkout:'C',lunch:'D',snack:'D',dinner:'A',kcal:2434,protein:148},
  ],
};

globalThis.MeuRitmoHyroxData = { hyroxPlan, hyroxMenu };
