const hyroxPlan = {
  planVersion: 'v9',
  title: 'HYROX São Paulo · Ciclo 1',
  eventDate: '2027-05-07',
  eventLabel: '7 e 8 de maio de 2027 · Open Solo',
  cycleStart: '2026-11-13',
  cycleEnd: '2026-12-13',
  goal: 'Prioridade em força e massa muscular, com três corridas fáceis por semana e progressão segura. O treino específico de HYROX entra no Ciclo 2, a partir de 14/12.',
  targets: [
    ['Força e massa muscular', 'Prioridade até 13/12 · foco em ombros, peito, costas e braços'],
    ['Corrida fácil', '3 vezes/semana · esforço 4–5/10 · fale frases completas'],
    ['Proteína', 'Mínimo de 120 g por dia'],
    ['Sono', '7–8 h · referência 21h–22h'],
    ['Passos', 'Meta diária de 7.000–8.000'],
  ],
  phases: [
    { name: '1 · Base', period: '13/11–13/12/2026', focus: 'Ciclo 1: quatro sessões de musculação, sábado obrigatório de ombros e braços e três corridas fáceis. Sem escada, wall balls ou estações específicas.' },
    { name: '2 · HYROX', period: 'a partir de 14/12/2026', focus: 'Ciclo 2: manter o foco em força e corpo e acrescentar 1 sessão semanal de estações, com técnica e cargas reais na academia.' },
    { name: '3 · Específica', period: 'jan–abr/2027', focus: 'Evoluir para 2 sessões específicas por semana, corrida contínua e simulações parciais, mantendo 2–3 sessões de força.' },
    { name: '4 · Taper', period: 'fim de abr–7/05/2027', focus: 'Reduzir a fadiga e chegar à prova recuperado.' },
  ],
  stations: [
    ['SkiErg', '1.000 m'], ['Sled Push', '50 m · referência Open masculino: 152 kg com trenó'],
    ['Sled Pull', '50 m · referência Open masculino: 103 kg com trenó'], ['Burpee Broad Jump', '80 m'],
    ['Remo', '1.000 m'], ['Farmers Carry', '200 m · referência Open masculino: 2 × 24 kg'],
    ['Sandbag Lunges', '100 m · referência Open masculino: 20 kg'], ['Wall Balls', '100 repetições · referência Open masculino: 6 kg / alvo 3 m'],
  ],
  strength: [
    { id: 'upper-a', title: 'Superiores A', day: 'Segunda · 12h', duration: '≈55 min', objective: 'Peito, costas, bíceps, tríceps e abdômen', exercises: [
      ['Supino inclinado com halteres (banco a 30°)', '8–10', '3·4·4·2'], ['Remada sentada na polia, pegada neutra', '10–12', '3·4·4·2'], ['Crucifixo na máquina (peck deck)', '12–15', '2·2·2·2'], ['Elevação lateral com halteres', '12–15', '2·3·3·2'], ['Rosca direta com barra W', '10–12', '3·3·3·2'], ['Tríceps na corda', '12–15', '2·3·3·2'], ['Abdominal na polia, ajoelhado', '10–15', '2·3·3·2'],
    ]},
    { id: 'lower-a', title: 'Inferiores A', day: 'Terça · 12h', duration: '≈50 min', objective: 'Força de pernas, agachamento e posterior de coxa', exercises: [
      ['Agachamento livre (goblet ou barra)', '6–8', '3·4·4·2'], ['Levantamento terra romeno', '8–10', '3·3·3·2'], ['Passada reversa com halteres', '8 por perna', '2·2·2·2'], ['Panturrilha em pé', '12–15', '3·3·3·2'], ['Prancha lateral', '30 s por lado', '2·2·2·2'],
    ]},
    { id: 'upper-b', title: 'Superiores B', day: 'Quarta · 12h', duration: '≈60 min', objective: 'Costas, peitoral superior, ombros, braços, abdômen e pegada', exercises: [
      ['Puxada frontal, pegada pronada aberta', '8–10', '3·4·4·2'], ['Supino reto com halteres (ou máquina)', '8–10', '3·3·3·2'], ['Remada unilateral com halter (serrote)', '8–10 por lado', '3·3·3·2'], ['Crucifixo inverso na máquina (peck deck reverso)', '12–15', '3·3·3·2'], ['Elevação lateral com halteres', '12–15', '2·3·3·2'], ['Rosca martelo com halteres', '10–12', '2·2·2·2'], ['Tríceps francês de costas na polia (corda)', '10–12', '2·3·3·2'], ['Rosca inversa com barra W (antebraço)', '12–15', '2·2·3·2'], ['Elevação de joelhos pendurado (ou no banco)', '8–12', '2·3·3·2'], ['Farmers hold com halteres pesados', '30–40 s', '3·3·3·2'],
    ]},
    { id: 'lower-b', title: 'Inferiores B', day: 'Sexta · 12h', duration: '≈50 min', objective: 'Pernas em volume moderado, glúteos e core', exercises: [
      ['Leg press', '10–12', '3·4·4·2'], ['Cadeira extensora', '12–15', '2·2·3·2'], ['Cadeira flexora', '10–12', '3·4·4·2'], ['Hip thrust', '8–10', '3·3·3·2'], ['Panturrilha sentada', '15', '3·3·3·2'], ['Dead bug', '8 por lado', '3·3·3·2'],
    ]},
    { id: 'arms', title: 'Ombros, braços e antebraço', day: 'Sábado à tarde · obrigatório desde a semana 1', duration: '≈50 min', objective: 'Dia principal de ombros, trapézio, braços e antebraço. Se estiver sem tempo, corte primeiro rosca de punho e tríceps; mantenha desenvolvimento e elevações laterais.', exercises: [
      ['Desenvolvimento com halteres sentado', '8–10', '3·3·3·2'], ['Elevação lateral com halteres', '12–15', '3·4·4·2'], ['Elevação lateral na polia baixa, um braço', '12–15', '2·3·3·2'], ['Face pull na polia alta', '15', '2·3·3·2'], ['Encolhimento com halteres (trapézio)', '12–15', '2·3·3·2'], ['Rosca alternada no banco inclinado', '12', '2·2·3·2'], ['Tríceps na corda', '15', '2·2·2·2'], ['Rosca de punho com halteres (antebraço)', '15–20', '2·2·3·2'],
    ]},
  ],
  running: [
    { week: 'Semana 0', dates: '13–15/11', monday: '—', wednesday: '—', saturday: '14/11 · 3 min correndo / 1 min caminhando × 6', total: '24 min totais' },
    { week: 'Semana 1', dates: '16–22/11', monday: '4 min / 1 min × 5', wednesday: '3 min / 1 min × 5', saturday: '4 min / 1 min × 6', total: '75 min totais' },
    { week: 'Semana 2', dates: '23–29/11', monday: '5 min / 1 min × 5', wednesday: '4 min / 1 min × 5', saturday: '6 min / 1 min × 4', total: '83 min totais' },
    { week: 'Semana 3', dates: '30/11–6/12', monday: '8 min / 1 min × 3', wednesday: '5 min / 1 min × 4', saturday: '10 min / 1 min × 3', total: '84 min totais' },
    { week: 'Semana 4 · recuperação', dates: '7–13/12', monday: '4 min / 1 min × 5', wednesday: '3 min / 1 min × 5', saturday: '12/12 · teste leve contínuo de 20 min', total: '65 min totais' },
  ],
  stairs: [],
  safety: [
    'Corrida fácil: esforço 4–5/10; fale frases completas e termine sentindo que poderia continuar.',
    'Antes e depois de correr, caminhe 5 minutos. Se as pernas estiverem muito doloridas, troque por caminhada.',
    'Se o esforço passar de 6/10 ou surgir dor na canela, joelho ou tendão, repita a semana anterior. Não aumente a corrida à força.',
    'Dor articular acima de 3/10 por mais de 48 horas, duas noites abaixo de 6 horas de sono ou pernas sem recuperação: reduza o volume em cerca de 30% por uma semana.',
    'Se não conseguir completar o mínimo de repetições por duas sessões seguidas, reduza a carga em 5–10% e reconstrua.',
    'Dor aguda, tontura ou desconforto no peito: interrompa a sessão e procure atendimento.',
    'Aqueça a musculação por 5 minutos e faça séries leves. Mantenha 2–3 repetições em reserva; sem falha neste ciclo.',
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
      ['A','250 g de arroz parboilizado cozido + 100 g de feijão + 120 g de peito de frango grelhado + 100 g de legumes + 1 colher de sopa de azeite','720','51'],['B','200 g de arroz parboilizado cozido + 100 g de feijão + 120 g de patinho moído + salada + 1 colher de sopa de azeite','722','52'],['C','250 g de macarrão cozido + 120 g de peito de frango desfiado + 100 g de molho de tomate + 1 colher de chá de azeite','657','54'],['D','150 g de mandioca + 100 g de feijão + 120 g de coxão mole + salada + 1 colher de sopa de azeite','662','45'],['E','200 g de arroz parboilizado cozido + 100 g de feijão + 150 g de peito de frango grelhado + 100 g de legumes + 1 colher de sopa de azeite','706','60'],
    ]},
    { id: 'snack', name: 'Lanche da tarde', time: '17:00', options: [
      ['A','2 fatias de pão de forma + 2 ovos + 1 fruta','335','18'],['B','170 g de iogurte integral + 30 g de aveia + 1 banana + 1 colher de chá de mel','333','11'],['C','35 g de goma de tapioca + 45 g de queijo coalho + 1 fruta','332','11'],['D','250 ml de leite integral + 1 banana + 20 g de aveia','321','12'],['E','170 g de iogurte integral + 20 g de castanha de caju + 1 fruta','284','10'],['F','1 pão francês + 60 g de frango desfiado + 1 fruta','310','24'],
    ]},
    { id: 'dinner', name: 'Jantar', time: '19:00', options: [
      ['A','120 g de patinho moído refogado + 200 g de batata-doce cozida + salada + 1 colher de chá de azeite','484','43'],['B','2 ovos + 60 g de peito de frango desfiado + 30 g de queijo coalho + 150 g de batata-doce + salada','481','40'],['C','120 g de peito de frango grelhado + 160 g de arroz parboilizado + 100 g de legumes + 1 colher de chá de azeite','464','44'],['D','130 g de peito de frango grelhado + 150 g de mandioca cozida + salada + 1 colher de chá de azeite','460','44'],['E','100 g de coxão mole grelhado + 120 g de arroz parboilizado + 100 g de feijão + salada','473','41'],
    ]},
    { id: 'supper', name: 'Ceia opcional', time: '20:00 · só se houver fome ou necessidade', options: [
      ['A','200 ml de leite integral + 20 g de aveia','201','9'],['B','200 g de iogurte natural integral + 1 banana','212','8'],['C','2 ovos + 1 fatia de pão de forma','207','15'],['D','150 g de iogurte natural integral + 20 g de castanha de caju','206','9'],
    ]},
  ],
  weekly: [
    {day:'Segunda',preRun:'1',breakfast:'A',preWorkout:'B',lunch:'C',snack:'D',dinner:'E',kcal:2558,protein:151},
    {day:'Terça',preRun:null,breakfast:'B',preWorkout:'C',lunch:'D',snack:'E',dinner:'A',kcal:2397,protein:146},
    {day:'Quarta',preRun:'3',breakfast:'C',preWorkout:'D',lunch:'E',snack:'F',dinner:'B',kcal:2563,protein:168},
    {day:'Quinta',preRun:null,breakfast:'D',preWorkout:'E',lunch:'A',snack:'A',dinner:'C',kcal:2533,protein:156},
    {day:'Sexta',preRun:null,breakfast:'E',preWorkout:'A',lunch:'B',snack:'B',dinner:'D',kcal:2536,protein:148},
    {day:'Sábado',preRun:'1',breakfast:'A',preWorkout:'B',lunch:'C',snack:'C',dinner:'E',kcal:2569,protein:150},
    {day:'Domingo',preRun:null,breakfast:'B',preWorkout:'C',lunch:'D',snack:'D',dinner:'A',kcal:2434,protein:148},
  ],
};

globalThis.MeuRitmoHyroxData = { hyroxPlan, hyroxMenu };
