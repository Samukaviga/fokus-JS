const html = document.querySelector('html');

const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const cards = document.querySelectorAll('.app__card-button');
const botaoStartPause = document.querySelector('#start-pause');
const botaoIniciarOuPausar = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

const musicaImput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //Recebe o objeto com o caminho do audio como parametro
musica.loop = true; //ficar em loop

const iconePausar = document.querySelector('.app__card-primary-butto-icon');

audioPlay = new Audio('/sons/play.wav');
audioPausar = new Audio('/sons/pause.mp3');
audioTermiar = new Audio('/sons/beep.mp3');


let tempoDecorridoEmSegundos = 0;
let intervaloId = null;



musicaImput.addEventListener('change', () => {
    
    musica.volume = 0.5; //50% do volume original
    
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});



botaoFoco.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 1500;
        alterarContexto('foco');
        botaoFoco.classList.add('active');
});

botaoDescansoCurto.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 300;
        alterarContexto('descanso-curto');
        botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 900;
        alterarContexto('descanso-longo');
        botaoDescansoLongo.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    html.setAttribute('data-contexto', contexto); //Alterando atributo. Primeiro o elemento que vai ser alterado e segundo o novo valor que esse elemento terá
    imagem.setAttribute('src', `/imagens/${contexto}.png`);

    cards.forEach( (c) => {
        c.classList.remove('active');
    });


    switch (contexto) {
        case 'foco':
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;
            break;
        case 'descanso-curto':
                titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
    
        default:
            break;
    }
}

//  TEMPORIZADOR
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTermiar.play();
        alert("Tempo finalizado!");
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

botaoStartPause.addEventListener('click', iniciarOuPausar);


function iniciarOuPausar(){
    if(intervaloId){ //Pausar o temporizador
        audioPausar.play();
        zerar();
        return;
    }
    
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000); // executa uma funcao em um tempo determinado, no caso 1 segundo
    iconePausar.setAttribute('src', '/imagens/pause.png');
    botaoIniciarOuPausar.textContent = "Pausar"; 
}

function zerar(){
    clearInterval(intervaloId); //parando a execucao do setInterval
    iconePausar.setAttribute('src', '/imagens/play_arrow.png');
    botaoIniciarOuPausar.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;

}
