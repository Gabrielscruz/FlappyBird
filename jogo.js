console.log('Gabriel Flappy Bird');
let frames = 0;
const som_Hit = new Audio();
som_Hit.src = './efeitos/hit.wav'

const sprite = new Image();
sprite.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// Plano de fundo 
 const planodefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura:  204,
    x:       0,
    y:       canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprite, // Imagens  que carregamos em sprites 
            planodefundo.spriteX,planodefundo.spriteY,     // Sprite X, Sprite Y
            planodefundo.largura,planodefundo.altura,      // with , height Tamanho do recorte na sprites
            planodefundo.x, planodefundo.y,                // with , width Posicao que vai ficar na tela 
            planodefundo.largura,planodefundo.altura,  
        );

        contexto.drawImage(
            sprite, // Imagens  que carregamos em sprites 
            planodefundo.spriteX,planodefundo.spriteY,     // Sprite X, Sprite Y
            planodefundo.largura,planodefundo.altura,      // with , height Tamanho do recorte na sprites
            planodefundo.x + planodefundo.largura, planodefundo.y,                // with , width Posicao que vai ficar na tela 
            planodefundo.largura,planodefundo.altura,  
        );
    }
 }



// chao
function CriaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura:  112,
        x:       0,
        y:       canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 3;
            const repeteEm = chao.largura /  2;
            const movimentacao  = chao.x - movimentoDoChao;
            
            //console.log('[chao.x]', chao.x)
            //console.log('[repeteEM]', repeteEm)
            //console.log('[movimentacao]', movimentacao)

            chao.x = movimentacao % repeteEm;
        },
        desenha() {
            contexto.drawImage(
                sprite,                         // Imagens  que carregamos em sprites 
                chao.spriteX,chao.spriteY,      // Sprite X, Sprite Y
                chao.largura,chao.altura,       // with , height Tamanho do recorte na sprites
                chao.x, chao.y,                 // with , height Posicao que vai ficar na tela 
                chao.largura,chao.altura,  
            );

            contexto.drawImage(
                sprite,                         // Imagens  que carregamos em sprites 
                chao.spriteX,chao.spriteY,      // Sprite X, Sprite Y
                chao.largura,chao.altura,       // with , height Tamanho do recorte na sprites
                chao.x + chao.largura, chao.y,  // with , height Posicao que vai ficar na tela 
                chao.largura,chao.altura,  
            );
        }
    }
    return chao
}
// flappyBird

function fazcolisao(flappyBird, chao) { 
    const flappyBirdY = flappyBird.y +flappyBird.altura;
    const chaoY = chao.y

    if(flappyBirdY >= chaoY) {
        return true;
    }else {
        return false;
    }
}

function criaflappyBird () {

    let flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura:  24,
        x:       10,
        y:       50,
        pulo: 4.6,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.25,
        velocidade:0,
        atualiza(){
            if(fazcolisao(flappyBird, globais.chao)){
                console.log('fez colisao')
                som_Hit.play();

                setTimeout(()=>{
                    MudaParaTela(Telas.GAME_OVER)
                },500)
               
                
                return
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade,
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        movimentos:[
            { spriteX: 0, spriteY:  0}, // asa pra cima
            { spriteX: 0, spriteY: 26}, // asa no meio 
            { spriteX: 0, spriteY: 52}, // asa pra baixo 
        ],
        frameAtual: 0, 
        atualizaOframeAtual(){
            const intervaloDeFrame = 10;
            const passouOintervalo = frames % intervaloDeFrame === 0;
            if (passouOintervalo){
            const baseDoIncremento = 1;
            const Incremento = baseDoIncremento + flappyBird.frameAtual
            const BaseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = Incremento % BaseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOframeAtual();
            const {spriteX , spriteY} =  flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprite,                                    // Imagens  que carregamos em sprites 
                spriteX,spriteY,     // Sprite X, Sprite Y
                flappyBird.largura,flappyBird.altura,      // with , height Tamanho do recorte na sprites
                flappyBird.x, flappyBird.y,                // with , width Posicao que vai ficar na tela 
                flappyBird.largura,flappyBird.altura,  
            );
        }
    }
    return flappyBird;  
}
// mensagem Get Ready tela de inicio

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura:  152,
    x:       (canvas.width / 2) - 174 / 2,
    y:       50,

    desenha() {
        contexto.drawImage(
            sprite, // Imagens  que carregamos em sprites 
            mensagemGetReady.spriteX,mensagemGetReady.spriteY,     // Sprite X, Sprite Y
            mensagemGetReady.largura,mensagemGetReady.altura,      // with , height Tamanho do recorte na sprites
            mensagemGetReady.x, mensagemGetReady.y,                // with , width Posicao que vai ficar na tela 
            mensagemGetReady.largura,mensagemGetReady.altura,  
        );
    }
}

// tela game over 
const mensagemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura:  200,
    x:       (canvas.width / 2) - 226 / 2,
    y:       50,

    desenha() {
        contexto.drawImage(
            sprite, // Imagens  que carregamos em sprites 
            mensagemGameOver.spriteX,mensagemGameOver.spriteY,     // Sprite X, Sprite Y
            mensagemGameOver.largura,mensagemGameOver.altura,      // with , height Tamanho do recorte na sprites
            mensagemGameOver.x, mensagemGameOver.y,                // with , width Posicao que vai ficar na tela 
            mensagemGameOver.largura,mensagemGameOver.altura,  
        );
    }
}
// cria os canos

function CriaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao:{
            spriteX: 0, 
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,

        desenha() {
                canos.pares.forEach(function (par){
                const yRandom = par.y
                const espacamentoEntreCanos = 100 ;
        
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                // [Cano do ceu ]
                contexto.drawImage(
                    sprite, // Imagens  que carregamos em sprites
                    canos.ceu.spriteX,canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX,canoCeuY,
                    canos.largura, canos.altura,
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos +yRandom;     
                // [cano do chao]
                contexto.drawImage(
                    sprite, // Imagens  que carregamos em sprites
                    canos.chao.spriteX,canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX,canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu ={
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                },
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }
            })

        },
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if(globais.flappyBird.x >= par.x){

                if(cabecaDoFlappy <= par.canoCeu.y){
                    som_Hit.play();
                    return true;
                }
                if(peDoFlappy >= par.canoChao.y){
                    som_Hit.play();
                    return true;
                }

                if(globais.flappyBird.x == par.x ){
                    contador = contador + 1 
                }
            
            }
       
            return false
        },
        pares:[
       
        ],
       
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push(
                    {
                        x: canvas.width,
                        y:-150 * (Math.random()+1),
                    }
                )
            }
            canos.pares.forEach(function (par){
                par.x = par.x - 10;

                if(canos.temColisaoComOFlappyBird(par)){
                    MudaParaTela(Telas.GAME_OVER)
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift()
                }

               
            })
        }

    }

    return canos
}

function CriaPlacar(){
    const placar = {

        desenha(font , x ,  y) {
            contexto.font = `${font}px "VT323"`;
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white'
            contexto.fillText(`${contador}`,canvas.width - x,y)
        },
    
    }

    return placar
}
// criação Telas
const globais = {};
let TelaAtiva = {};
let contador = 0

function MudaParaTela(novaTela) {
  TelaAtiva = novaTela;

  if(TelaAtiva.inicializa) {
    TelaAtiva.inicializa();
  }
}

const Telas = {
    
    Inicio: {
            inicializa() {
                globais.flappyBird = criaflappyBird();
                globais.canos = CriaCanos()
                globais.chao = CriaChao();
            },
            desenha() {
                planodefundo.desenha();
                globais.chao.desenha();
                globais.flappyBird.desenha();
                mensagemGetReady.desenha();
            },
            click() {
                MudaParaTela(Telas.Jogo)
            },
            atualiza() {
              globais.chao.atualiza();
           
            }
    }
}

Telas.Jogo = {
    inicializa(){
        globais.placar = CriaPlacar();
    },
    desenha() {
        planodefundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha(35,10,35);
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza() {

        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
    }
}

Telas.GAME_OVER = {
    inicializa() {
        globais.chao = CriaChao();
        globais.placar = CriaPlacar();
    },
    desenha() {
        planodefundo.desenha();
        mensagemGameOver.desenha();
        globais.placar.desenha(30,80,145);
    },
    atualiza() {

    },
    click(){
        MudaParaTela(Telas.Inicio)
        contador = 0;
    }
}

function loop () {

    TelaAtiva.desenha();
    TelaAtiva.atualiza();
    frames = frames + 1 
    requestAnimationFrame(loop); // Vai ajudar desenhar na tela de forma performatica
}

window.addEventListener('click', function() {
    if(TelaAtiva.click){
        TelaAtiva.click();
    }
})

MudaParaTela(Telas.Inicio)
loop();