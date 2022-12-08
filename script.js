'use strict';

// selecting total score element 
const score0el=document.querySelector('#score--0');
const score1el=document.querySelector('#score--1');

// selecting current score element
const curr0el=document.querySelector('#current--0');
const curr1el=document.querySelector('#current--1');

// selecting player elements 
const player0el=document.querySelector('.player--0');
const player1el=document.querySelector('.player--1');


// selecting button elements 
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const btnReset=document.querySelector('.btn--new');

// selecting dice element 
const showdice=document.querySelector('.dice');



let playingstate , currentscore , s0 , s1;
const init = function(){
    // At start of new game 
    player0el.classList.remove('player--winner');
    player1el.classList.remove('player--winner');

    showdice.classList.add('hidden');
    player0el.classList.add('player--active');
    player1el.classList.remove('player--active');
    
    playingstate = true;
    s0=0;
    s1=0;
    currentscore=0;
    score0el.textContent=s0;
    score1el.textContent=s1;
    curr0el.textContent=currentscore;
    curr1el.textContent=currentscore;
};
init();

const whichplayeractive = function(){
    return player0el.classList.contains('player--active') ?0:1;
}

const changeactiveplayer =function(){
    player0el.classList.toggle('player--active');
    player1el.classList.toggle('player--active');
}

btnRoll.addEventListener('click',function(){
    if(playingstate){

        // when roll button is pressed do follow 

        // 1. generate a random no and show the dice 
        const diceval = Math.trunc(Math.random()*6) +1;
        showdice.classList.remove('hidden');
        showdice.src=`dice-${diceval}.png`;

        // 2. change the currentscore of active player
                //  if diceval is greater than 1 
                // else make activeplayer's currentscore 0  and switch player 
        if(diceval!=1){
            currentscore+=diceval;
            if(whichplayeractive()==0)
                curr0el.textContent=currentscore;
            else curr1el.textContent=currentscore;
        }
        else{
            currentscore=0;
            if(whichplayeractive()==0)
                curr0el.textContent=currentscore;
            else curr1el.textContent=currentscore;
            changeactiveplayer();
        }

    }
});

btnHold.addEventListener('click',function(){

    if(playingstate){
        // when hold button is pressed 

        // 1. add current score of active player to total score of that player 
        //2. check if total score of active player is greater than or equal to winning score required
            // if yes stop game and show that player as winner 
            // else make currentscore 0 and switch player 
            if(whichplayeractive()==0){
                s0+=currentscore;
                score0el.textContent=s0;

                if(s0 >=20 ){
                    player0el.classList.remove('player--active');
                    player0el.classList.add('player--winner');
                    showdice.classList.add('hidden');
                    playingstate=false;
                }
                else {
                    currentscore=0;
                    curr0el.textContent=currentscore;
                    curr1el.textContent=currentscore;
                    changeactiveplayer();
                }
            }
            else{ 
                s1+=currentscore;
                score1el.textContent=s1;
                
                if(s1 >=20 ){
                    player1el.classList.remove('player--active');
                    player1el.classList.add('player--winner');
                    showdice.classList.add('hidden');
                    playingstate=false;
                }
                else {
                    currentscore=0;
                    curr0el.textContent=currentscore;
                    curr1el.textContent=currentscore;
                    changeactiveplayer();
                }
            }
    }    
});

btnReset.addEventListener('click',function(){

    // when we click reset button
    init();

});