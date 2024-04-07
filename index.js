let participantes = [
  {
       nome: "William Ribeiro",
       email: "william@gmail.com",
       dataInscricao: new Date(2024,2,01,19,23),
       dataCheckIn: new Date(2024,2,25,20,20)
  },
  {
       nome: "Mayk Brito",
       email: "mayk@gmail.com",
       dataInscricao: new Date(2024,1,02,19,23),
       dataCheckIn: null
  },
  {
       nome: "João da Silva",
       email: "joao@gmail.com",
       dataInscricao: new Date(2024,1,03,19,23),
       dataCheckIn: new Date(2024,1,05,20,20)
  },
  {
       nome: "Maria Souza",
       email: "maria@gmail.com",
       dataInscricao: new Date(2024,1,04,19,23),
       dataCheckIn: null
  },
  {
       nome: "Pedro Santos",
       email: "pedro@gmail.com",
       dataInscricao: new Date(2024,1,05,19,23),
       dataCheckIn: new Date(2024,1,05,20,20)
  },
  {
       nome: "Ana Oliveira",
       email: "ana@gmail.com",
       dataInscricao: new Date(2024,1,06,19,23),
       dataCheckIn: new Date(2024,1,05,20,20)
  },
  {
       nome: "José Pereira",
       email: "jose@gmail.com",
       dataInscricao: new Date(2024,1,07,19,23),
       dataCheckIn: new Date(2024,1,05,20,20)
  },
  {
       nome: "Carla Mendes",
       email: "carla@gmail.com",
       dataInscricao: new Date(2024,1,08,19,23),
       dataCheckIn: new Date(2024,1,05,20,20)
  },
  {
       nome: "Marta Costa",
       email: "marta@gmail.com",
       dataInscricao: new Date(2024,1,09,19,23),
       dataCheckIn: null
  },
  {
       nome: "Ricardo Almeida",
       email: "ricardo@gmail.com",
       dataInscricao: new Date(2024,1,10,19,23),
       dataCheckIn: null
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
       Confirmar check-in 
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>    
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar ser o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email   
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}