// ========================================
// CONFIGURAÇÕES
// ========================================

const TOTAL_COBRANCAS = 5;

const PENALTIS_PERDIDOS_A = [1];

const PENALTIS_PERDIDOS_B = [3, 5];


// ========================================
// POSIÇÕES
// ========================================

const POSICOES = [

    "top-left",
    "top-center",
    "top-right",

    "middle-left",
    "middle-center",
    "middle-right",

    "bottom-left",
    "bottom-center",
    "bottom-right"

];


// ========================================
// ESTADO DO JOGO
// ========================================

let jogo = {

    timeAtual: "A",

    rodada: 1,

    golsA: 0,

    golsB: 0,

    cobrancasA: 0,

    cobrancasB: 0,

    processando: false,

    finalizado: false

};


// ========================================
// ELEMENTOS
// ========================================

const scoreA =
    document.getElementById("scoreA");

const scoreB =
    document.getElementById("scoreB");

const roundInfo =
    document.getElementById("roundInfo");

const turnTitle =
    document.getElementById("turnTitle");

const turnDescription =
    document.getElementById("turnDescription");

const message =
    document.getElementById("message");

const goalkeeper =
    document.getElementById("goalkeeper");

const ball =
    document.getElementById("ball");

const player =
    document.getElementById("player");

const historyList =
    document.getElementById("historyList");

const restartButton =
    document.getElementById("restartButton");

const targetButtons =
    document.querySelectorAll(".target");

const field =
    document.querySelector(".field");


// ========================================
// NOVAS TELAS
// ========================================

const victoryScreen =
    document.getElementById("victoryScreen");

const openLetterButton =
    document.getElementById("openLetterButton");

const letterScreen =
    document.getElementById("letterScreen");


// ========================================
// POSIÇÕES DO GOLEIRO
// ========================================

const posicoesGoleiro = {

    "top-left": {
        left: "16%",
        top: "18%"
    },

    "top-center": {
        left: "50%",
        top: "18%"
    },

    "top-right": {
        left: "84%",
        top: "18%"
    },

    "middle-left": {
        left: "16%",
        top: "50%"
    },

    "middle-center": {
        left: "50%",
        top: "50%"
    },

    "middle-right": {
        left: "84%",
        top: "50%"
    },

    "bottom-left": {
        left: "16%",
        top: "82%"
    },

    "bottom-center": {
        left: "50%",
        top: "82%"
    },

    "bottom-right": {
        left: "84%",
        top: "82%"
    }

};


// ========================================
// ATUALIZAR JOGADOR
// ========================================

function atualizarJogador() {

    player.classList.remove(
        "flamengo-player",
        "palmeiras-player"
    );


    if (jogo.timeAtual === "A") {

        player.classList.add(
            "flamengo-player"
        );

    }

    else {

        player.classList.add(
            "palmeiras-player"
        );

    }

}


// ========================================
// ANIMAÇÃO DO CHUTE
// ========================================

function animarChute() {

    player.classList.remove(
        "kicking"
    );


    void player.offsetWidth;


    player.classList.add(
        "kicking"
    );

}


// ========================================
// RESETAR GOLEIRO
// ========================================

function resetarGoleiro() {

    goalkeeper.style.transition =
        "left 0.35s ease, top 0.35s ease";


    goalkeeper.style.left =
        "50%";


    goalkeeper.style.top =
        "50%";

}


// ========================================
// POSIÇÃO INICIAL DA BOLA
// ========================================

function obterPosicaoInicialBola() {

    const campoRect =
        field.getBoundingClientRect();


    const jogadorRect =
        player.getBoundingClientRect();


    const inicioX =
        (
            jogadorRect.left +
            jogadorRect.width / 2
        ) -
        campoRect.left;


    const inicioY =
        jogadorRect.bottom -
        campoRect.top -
        8;


    return {

        x: inicioX,

        y: inicioY

    };

}


// ========================================
// RESETAR BOLA
// ========================================

function resetarBola() {

    ball.style.transition =
        "none";


    ball.style.left =
        "50%";


    ball.style.top =
        "auto";


    ball.style.bottom =
        "18px";


    ball.style.transform =
        "translate(-50%, -50%) scale(1)";

}


// ========================================
// MOVER GOLEIRO
// ========================================

function moverGoleiro(posicao) {

    const destino =
        posicoesGoleiro[posicao];


    if (!destino) {

        return;

    }


    goalkeeper.style.transition =
        "left 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), " +
        "top 0.65s cubic-bezier(0.25, 0.8, 0.25, 1)";


    goalkeeper.style.left =
        destino.left;


    goalkeeper.style.top =
        destino.top;

}


// ========================================
// DESTINO DA BOLA
// ========================================

function obterDestinoBola(posicao) {

    const botao =
        document.querySelector(
            `.target[data-position="${posicao}"]`
        );


    if (!botao) {

        return null;

    }


    const campoRect =
        field.getBoundingClientRect();


    const botaoRect =
        botao.getBoundingClientRect();


    return {

        x:
            (
                botaoRect.left +
                botaoRect.width / 2
            ) -
            campoRect.left,

        y:
            (
                botaoRect.top +
                botaoRect.height / 2
            ) -
            campoRect.top

    };

}


// ========================================
// MOVER BOLA
// ========================================

function moverBola(posicao) {

    const destino =
        obterDestinoBola(posicao);


    if (!destino) {

        return;

    }


    const inicio =
        obterPosicaoInicialBola();


    const inicioX =
        inicio.x;


    const inicioY =
        inicio.y;


    const distanciaX =
        destino.x -
        inicioX;


    const distanciaY =
        destino.y -
        inicioY;


    const controleX =
        inicioX +
        distanciaX * 0.45;


    const alturaCurva =
        Math.min(
            170,
            Math.max(
                90,
                Math.abs(distanciaY) * 0.55
            )
        );


    const controleY =
        inicioY -
        alturaCurva;


    ball.style.transition =
        "none";


    ball.style.left =
        `${inicioX}px`;


    ball.style.top =
        `${inicioY}px`;


    ball.style.bottom =
        "auto";


    ball.style.transform =
        "translate(-50%, -50%) scale(1)";


    void ball.offsetWidth;


    const duracao =
        800;


    const inicioTempo =
        performance.now();


    function animarBola(tempoAtual) {

        let progresso =
            (
                tempoAtual -
                inicioTempo
            ) /
            duracao;


        progresso =
            Math.min(
                Math.max(
                    progresso,
                    0
                ),
                1
            );


        const t =
            1 -
            Math.pow(
                1 - progresso,
                3
            );


        const x =
            Math.pow(
                1 - t,
                2
            ) *
            inicioX

            +

            2 *
            (1 - t) *
            t *
            controleX

            +

            Math.pow(
                t,
                2
            ) *
            destino.x;


        const y =
            Math.pow(
                1 - t,
                2
            ) *
            inicioY

            +

            2 *
            (1 - t) *
            t *
            controleY

            +

            Math.pow(
                t,
                2
            ) *
            destino.y;


        let escala;


        if (progresso < 0.5) {

            escala =
                1 +
                progresso * 0.35;

        }

        else {

            escala =
                1.175 -
                (
                    progresso - 0.5
                ) * 0.35;

        }


        ball.style.left =
            `${x}px`;


        ball.style.top =
            `${y}px`;


        ball.style.transform =
            `translate(-50%, -50%) scale(${escala})`;


        if (progresso < 1) {

            requestAnimationFrame(
                animarBola
            );

        }

        else {

            ball.style.left =
                `${destino.x}px`;


            ball.style.top =
                `${destino.y}px`;


            ball.style.transform =
                "translate(-50%, -50%) scale(0.9)";

        }

    }


    requestAnimationFrame(
        animarBola
    );

}


// ========================================
// POSIÇÃO ALEATÓRIA
// ========================================

function posicaoAleatoria() {

    const indice =
        Math.floor(
            Math.random() *
            POSICOES.length
        );


    return POSICOES[indice];

}


// ========================================
// VERIFICAR PÊNALTI PERDIDO
// ========================================

function penaltiPerdidoAutomaticamente(
    time,
    numeroPenalti
) {

    if (time === "A") {

        return PENALTIS_PERDIDOS_A.includes(
            numeroPenalti
        );

    }


    return PENALTIS_PERDIDOS_B.includes(
        numeroPenalti
    );

}


// ========================================
// HABILITAR BOTÕES
// ========================================

function habilitarBotoes() {

    targetButtons.forEach(button => {

        button.disabled =
            false;

        button.style.pointerEvents =
            "auto";

        button.style.opacity =
            "1";

    });

}


// ========================================
// DESABILITAR BOTÕES
// ========================================

function desabilitarBotoes() {

    targetButtons.forEach(button => {

        button.disabled =
            true;

        button.style.pointerEvents =
            "none";

        button.style.opacity =
            "0.5";

    });

}


// ========================================
// ATUALIZAR PLACAR
// ========================================

function atualizarPlacar() {

    scoreA.textContent =
        jogo.golsA;


    scoreB.textContent =
        jogo.golsB;


    roundInfo.textContent =
        `Rodada ${jogo.rodada}`;

}


// ========================================
// ATUALIZAR TURNO
// ========================================

function atualizarTurno() {

    if (jogo.finalizado) {

        return;

    }


    atualizarJogador();


    if (jogo.timeAtual === "A") {

        turnTitle.textContent =
            "⚽ FLAMENGO — SUA VEZ DE BATER!";


        turnDescription.textContent =
            "Escolha onde você quer chutar.";


        message.textContent =
            "Clique em um dos 9 cantos do gol.";

    }

    else {

        turnTitle.textContent =
            "🧤 SUA VEZ DE DEFENDER!";


        turnDescription.textContent =
            "O Palmeiras vai bater. Escolha onde seu goleiro vai pular.";


        message.textContent =
            "Clique no canto onde você quer defender.";

    }

}


// ========================================
// HISTÓRICO
// ========================================

function adicionarHistorico(
    cobrador,
    chute,
    defesa,
    resultado
) {

    const item =
        document.createElement("div");


    item.className =
        "history-item";


    item.textContent =
        `${cobrador} | Chute: ${chute} | Defesa: ${defesa} | ${resultado}`;


    historyList.prepend(item);

}


// ========================================
// FLAMENGO BATE
// ========================================

function cobrarUsuario(chute) {

    if (
        jogo.processando ||
        jogo.finalizado
    ) {

        return;

    }


    jogo.processando =
        true;


    desabilitarBotoes();


    animarChute();


    resetarGoleiro();


    const numeroPenalti =
        jogo.cobrancasA + 1;


    const penaltiPerdido =
        penaltiPerdidoAutomaticamente(
            "A",
            numeroPenalti
        );


    let defesa;


    if (penaltiPerdido) {

        defesa =
            chute;

    }

    else {

        defesa =
            posicaoAleatoria();

    }


    setTimeout(() => {

        moverBola(chute);

        moverGoleiro(defesa);

    }, 300);


    setTimeout(() => {

        if (penaltiPerdido) {

            message.textContent =
                "🧤 PALMEIRAS DEFENDEU! PÊNALTI PERDIDO!";


            adicionarHistorico(
                "FLAMENGO",
                chute,
                defesa,
                "PÊNALTI PERDIDO / DEFESA"
            );

        }

        else if (
            chute === defesa
        ) {

            message.textContent =
                "🧤 PALMEIRAS DEFENDEU!";


            adicionarHistorico(
                "FLAMENGO",
                chute,
                defesa,
                "DEFESA"
            );

        }

        else {

            message.textContent =
                "⚽ GOOOOOOL DO FLAMENGO!";


            jogo.golsA++;


            adicionarHistorico(
                "FLAMENGO",
                chute,
                defesa,
                "GOL"
            );

        }


        jogo.cobrancasA++;


        atualizarPlacar();


        setTimeout(() => {

            proximaCobranca();

        }, 1200);


    }, 1150);

}


// ========================================
// PALMEIRAS BATE
// ========================================

function cobrarMaquina(defesaEscolhida) {

    if (
        jogo.processando ||
        jogo.finalizado
    ) {

        return;

    }


    jogo.processando =
        true;


    desabilitarBotoes();


    animarChute();


    resetarGoleiro();


    const numeroPenalti =
        jogo.cobrancasB + 1;


    const penaltiPerdido =
        penaltiPerdidoAutomaticamente(
            "B",
            numeroPenalti
        );


    let chute;


    if (penaltiPerdido) {

        chute =
            defesaEscolhida;

    }

    else {

        chute =
            posicaoAleatoria();

    }


    setTimeout(() => {

        moverBola(chute);

        moverGoleiro(
            defesaEscolhida
        );

    }, 300);


    setTimeout(() => {

        if (penaltiPerdido) {

            message.textContent =
                "🧤 VOCÊ DEFENDEU! PÊNALTI PERDIDO!";


            adicionarHistorico(
                "PALMEIRAS",
                chute,
                defesaEscolhida,
                "PÊNALTI PERDIDO / DEFESA"
            );

        }

        else if (
            chute === defesaEscolhida
        ) {

            message.textContent =
                "🧤 VOCÊ DEFENDEU O PALMEIRAS!";


            adicionarHistorico(
                "PALMEIRAS",
                chute,
                defesaEscolhida,
                "DEFESA"
            );

        }

        else {

            message.textContent =
                "⚽ GOL DO PALMEIRAS!";


            jogo.golsB++;


            adicionarHistorico(
                "PALMEIRAS",
                chute,
                defesaEscolhida,
                "GOL"
            );

        }


        jogo.cobrancasB++;


        atualizarPlacar();


        setTimeout(() => {

            proximaCobranca();

        }, 1200);


    }, 1150);

}


// ========================================
// PRÓXIMA COBRANÇA
// ========================================

function proximaCobranca() {

    jogo.processando =
        false;


    /*
     * Depois das 5 cobranças
     * de cada time, termina o jogo.
     */

    if (
        jogo.cobrancasA >= TOTAL_COBRANCAS &&
        jogo.cobrancasB >= TOTAL_COBRANCAS
    ) {

        finalizarJogo();

        return;

    }


    resetarGoleiro();

    resetarBola();


    if (jogo.timeAtual === "A") {

        jogo.timeAtual =
            "B";

    }

    else {

        jogo.timeAtual =
            "A";


        jogo.rodada++;

    }


    atualizarPlacar();

    atualizarTurno();

    habilitarBotoes();

}


// ========================================
// FINALIZAR JOGO
// ========================================

function finalizarJogo() {

    jogo.finalizado =
        true;


    jogo.processando =
        false;


    desabilitarBotoes();


    turnTitle.textContent =
        "🏆 FIM DE JOGO!";


    turnDescription.textContent =
        "As 10 cobranças foram realizadas.";


    /*
     * Pequena espera para a última cobrança
     * terminar de aparecer na tela.
     */

    setTimeout(() => {

        abrirTelaVitoria();

    }, 1200);

}


// ========================================
// ABRIR TELA DE VITÓRIA
// ========================================

function abrirTelaVitoria() {

    victoryScreen.classList.add(
        "show"
    );

}


// ========================================
// ABRIR CARTA
// ========================================

function abrirCarta() {

    /*
     * Primeiro esconde a tela
     * de parabéns.
     */

    victoryScreen.classList.remove(
        "show"
    );


    /*
     * Pequeno intervalo para
     * a transição ficar suave.
     */

    setTimeout(() => {

        letterScreen.classList.add(
            "show"
        );

    }, 300);

}


// ========================================
// CLIQUES DOS ALVOS
// ========================================

targetButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            if (
                jogo.processando ||
                jogo.finalizado
            ) {

                return;

            }


            const posicao =
                this.dataset.position;


            if (
                jogo.timeAtual === "A"
            ) {

                cobrarUsuario(
                    posicao
                );

            }

            else {

                cobrarMaquina(
                    posicao
                );

            }

        }
    );

});


// ========================================
// BOTÃO CONTINUAR
// ========================================

openLetterButton.addEventListener(
    "click",
    function() {

        abrirCarta();

    }
);


// ========================================
// REINICIAR
// ========================================

restartButton.addEventListener(
    "click",
    function() {

        jogo = {

            timeAtual: "A",

            rodada: 1,

            golsA: 0,

            golsB: 0,

            cobrancasA: 0,

            cobrancasB: 0,

            processando: false,

            finalizado: false

        };


        victoryScreen.classList.remove(
            "show"
        );


        letterScreen.classList.remove(
            "show"
        );


        scoreA.textContent =
            "0";


        scoreB.textContent =
            "0";


        roundInfo.textContent =
            "Rodada 1";


        historyList.innerHTML =
            "";


        resetarGoleiro();

        resetarBola();

        atualizarTurno();

        habilitarBotoes();

    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

resetarGoleiro();

resetarBola();

atualizarPlacar();

atualizarTurno();

habilitarBotoes();