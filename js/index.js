var dx; // Direção que o Player segue
var de; // Direção que o Enemy segue
var px; // Posição atual do Player
var pe; // Posição Atual do Enemy
var vel; // Velocidade de movimentação
var player; 
var tmp;
var posplayer;
var posenemy;
var pavanco = 0; // Avanço do tiro do Player
var eavanco = 0; // Avanço do tiro do Enemy

var pt; 
var et;

var ptpos = 0; // Posição de avanço de tiro do Player
var etpos = 0; // Posição de avanço de tiro do Enemy

var plife = 3;
var elife = 3;

function inicia(){
    dx= 0;
    px= 160;
    de= 0;
    pe= 160;
    vel = 1;
    player = document.getElementById('player');
    enemy = document.getElementById('enemy');
    document.addEventListener('keydown', teclaDw);
    document.addEventListener('keyup', teclaUp);
    document.addEventListener('keydown', teclaSpace);
    tmp = setInterval(enterFrame,3);

    pt = document.getElementById('ptiro');
    et = document.getElementById('etiro');

    document.getElementById('mid').style.height = (window.innerHeight/2.1 ) + 'px';

    //====== POSIÇÃO DOS PLAYERS =========

    posplayer = player.style.left;
    posenemy = enemy.style.left;    

}

//====== Suporte a teclado ================

function teclaDw(){
    var tecla = event.keyCode;
    if(tecla==37){
        dx = -1;
    }else if(tecla==39){
        dx = +1;
    }
}

function teclaUp(){
    var tecla = event.keyCode;
    if(tecla==37){
        dx = 0;
    }else if(tecla==39){
        dx = 0;
    }
}

function teclaSpace(){
    var tecla = event.keyCode;
    if(tecla == 32){
        patk();
    }
}

//========== Suporte ao Touch ===============

/*

document.getElementById("left").addEventListener('touchstart', function(){
    dx = -1;
});

document.getElementById("left").addEventListener('touchend', function(){
    dx = 0;
});

document.getElementById("right").addEventListener('touchstart', function(){
    dx = +1;
});

document.getElementById("right").addEventListener('touchend', function(){
    dx = 0;
});

*/

//======= Movimentação e direção =========================

function enterFrame(){

//====== PLAYER ================================*/

// Impede que saia do Campo

    if(px < 0){
        dx = +1;
    }else if(px > (document.getElementById("top").clientWidth)-50 ){
        dx = -1;    
    }

//==============================================*/

    px += dx*vel;
    player.style.left = px+'px';

//======= ENEMY ================================*/

    if(pe < 0){
        de = +1;
    }else if(pe > (document.getElementById('bot').clientWidth)-50 ){
        de = -1;    
    }

//========= Tiro do Enemy ==============================*/

    pe += de*vel;
    enemy.style.left = pe+'px';
    etpos += eavanco;

//======= Munição Player ====================================*/
    
    pt.style.bottom = ptpos + 'px'; 
    et.style.top = etpos + 'px';
    ptpos += pavanco;

//======== Verificação ==========================

    if((ptpos == 320) 
        && ( (parseInt(pt.style.left, 10)+20) > pe) 
        && (parseInt(pt.style.left,10) < (pe + 50))  ){

//============== Pontuação Player ===================

        elife -= 1;
        pt.style.backgroundImage = "('../img/boom.png')";
        setTimeout(function(){ pt.style.display="none"; }, 100);
        
        if(elife<3){
            document.getElementById('elife1').style.opacity = '0';    
        }

        if(elife<2){
            document.getElementById('elife2').style.opacity = '0';    
        }

        if(elife<1){
            document.getElementById('elife3').style.opacity = '0';
            alert('Ganhou');
            location.reload();
        }
    };
 //============  Verificação Enemy =================

    if((etpos == 320)
        &&( (parseInt(et.style.left, 10)+20) > px)
        &&(parseInt(et.style.left) < ( px + 50 ) )) {
                
//============== Pontuação Enemy ===================

        plife -= 1;
        et.style.backgroundImage = "('../img/boom.png')";
        setTimeout(function(){ et.style.display="none"; }, 100);
        
        
        
        if(plife<3){
            document.getElementById('plife1').style.opacity = '0';    
        }

        if(plife<2){
            document.getElementById('plife2').style.opacity = '0';    
        }

        if(plife<1){
            document.getElementById('plife3').style.opacity = '0';
            alert('You died');
            location.reload();
        }
    }
}

//========== FIm do enterframe e inicio do TIRO ====================================

function patk(){

        pt.style.left = (px + 15) + 'px'; // Pega o posição do player e atribui ao tiro
        ptpos = 0;
        pt.style.display = 'block';
        document.getElementById('fire').setAttribute('onclick','');
        document.getElementById('fire').style.backgroundColor = '#555';
        pavanco = 2;
         
        setTimeout(function(){ 
            pvanco = 0;
            ptpos = 0;
            pt.style.display = 'none';
            pt.style.backgroundImage = "('../img/missel.png')";
            document.getElementById('fire').setAttribute('onclick','patk()');
            document.getElementById('fire').style.backgroundColor = '#ccc';

        },750)
}

//================= Inteligencia artificial ==============================

function eatk(){

    eavanco = 2;
    et.style.left = (pe+15) + 'px';
    et.style.display = 'block';

    setTimeout(function(){
        eavanco = 0;
        etpos = 0;
        et.style.display = 'none';
        et.style.backgroundImage = "('../img/missel.png')";
    },750);
}

setInterval(function(){
    if(de == +1){
        de = -1;
    }else
    if(de == -1){
        de = +1;
    }else{de = +1;}

}, 4000);

setInterval(function(){
    eatk();
}, 1500);

document.getElementById('btnMenu').addEventListener('click', function(){ alert('Pause'); })

window.addEventListener("load", inicia);











