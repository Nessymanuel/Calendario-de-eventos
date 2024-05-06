
// Função para salvar a lista de participantes no localStorage
const salvarParticipantesLocalStorage = () => {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

// Função para carregar a lista de participantes do localStorage
const carregarParticipantesLocalStorage = () => {
    const participantesString = localStorage.getItem('participantes');
    if (participantesString) {
        participantes = JSON.parse(participantesString);
    }
}

// Função para inicializar a aplicação, chamada no carregamento da página
const inicializar = () => {
    carregarParticipantesLocalStorage();
    actualizarLista(participantes);
}

  


let participantes = [];


const criarNovoParticipante = (participante) => {

    const dataInscricao = dayjs(Date.now())
        .to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now())
        .to(participante.dataCheckIn)

    if (participante.dataCheckIn == null) {
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
        <br/>
         <small>
         ${participante.email}
         </small>
     </td>
     <td>${dataInscricao}</td>
     <td>${dataCheckIn}</td>
 </tr> `
}



const actualizarLista = (participantes) => {

    let output = ""
    for (let participante of participantes) {
        output += criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

actualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);


    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null,
    }

    //verificar se o participante ja existe
    const participanteExistente = participantes.find(
        (p) => {

            return p.email == participante.email
        }
    )

    if (participanteExistente) {
        alert('Email ja cadastrado!')
        return
    }

    participantes = [participante, ...participantes]

    actualizarLista(participantes);
    salvarParticipantesLocalStorage();

    //limpando os dados do formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = " "
}

const fazerCheckIn = (event) => {

    //confirmar se realmente quer o checkin
    const resultado = 'Tem certeza que quer fazer o checkin?'
    if (confirm(resultado) == false) {
        return
    } else {
        //encontrar o participante dentro da lista
        const participante = participantes.find((p) => {
            return p.email == event.target.dataset.email
        })

        //actualizar o checkin do participante
        participante.dataCheckIn = new Date()

        //actualizar a lista de participantes
        actualizarLista(participantes);
        salvarParticipantesLocalStorage();
    }


}
//chamando a função que faz o carregamento do localstorag2 
inicializar();