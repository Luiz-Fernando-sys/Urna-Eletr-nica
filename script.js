//Criação de variáveis que serão responsáveis por fazermos o controle de cada tela da urna.
//Criamos essas variáveis para manipular cada elemento na tela da urna em cada etapa, e poder manipular cada tela com cada elemento que deverá aparecer.
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = ''; //Variável responsável por armazenar o número que o usuário digitou do candidato que ele quer votar
let votoBranco = false;
let votos = []; //Variável responsável por guardar as informações de quem foi o vereador e prefeito que o usuário votou

function comecarEtapa(){ //Esta função limpa a tela e pega as informações da etapa atual e preenche o que precisa ser preenchido
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros;i++) { //Comando responsável por multiplicar os campos de quadrados para inserção dos números do candidato
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) { // O número do candidato que já está cadastrado no meu array, é igual ao número ue meu usuário digitou?
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0){ //Se ele achou algum candidato lá dentro igual ao que o usuário digitou,
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else { //Se não, significa que ele digitou um número inválido e o voto é nulo, ou seja, ele digitou o número de alguém que não está cadastrado no nosso array de objetos do arquivo etapas.js
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca'); //Após o usuário clicar num número, ele coloca o número dentro do quadrado e tira a class pisca dele para ele não ficar clicando, pois ela já foi preenchido.
        if(elNumero.nextElementSibling !== null) { //Se o próximo item for diferente de nulo, significa que tem um próximo item e então ele irá executar o código abaixo para adicionar aclass pisca no próximo quadrinho
            elNumero.nextElementSibling.classList.add('pisca'); //Após ter removido a class pisca do número do quadradinho que foi preenchido com um número, ele precisará adicionar a class pisca no quadradinho seguinte para poder ficar piscando até o usuário preencher ele também.
        } else { //Caso contrário, significa que chegamos no último ítem, e então ele fará o procedimento de pegar as informações do candidato e mostrar na tela.
            atualizaInterface();
        }   

    }
}

function branco() {
    if(numero === ''){ //Se não tiver nada guardado na variável numero, ou seja, se o usuário não digitou nada, significa que podemos fazer ele votar em branco
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display ='block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    } else {
        alert("Para votar em branco nao pode ter digitado nenhum número")
    }
}

function corrige() { //Quando clicarmos para corrigir, ele limpará os campos e variável número que tínhamos selecionado, porém somente na etapa em que estamos. Por exemplo, se estivermos na etapa de colocar o número do prefeito, ele corrigirá e voltará para o prefeito com os campos tudo limpos para selecionarmos, não precisando selecionar o vereador de novo para depois chegar no prefeito que é o queríamos corrigir.
    comecarEtapa();
}

function confirma() { //Só funcionará se você tiver um candidato selecionado, ou se você votou em nulo (numero que não existe) ou então se você votou em branco.
    let etapa = etapas[etapaAtual];

    let cotoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) { 
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) { //Se o voto do usuário na primeira parte da votação tiver confirmado com sucesso, então podemos passar para ele poder fazer o outro voto dele só que agora para prefeito
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();