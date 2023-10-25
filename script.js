"use strict"

const life = document.querySelector(".life"),
word = document.querySelector(".word"),
letters = document.querySelector(".letters"),

guess = "arboricole",

keyboard = "azertyuiopqsdfghjklmwxcvbn",
keyboardSplit = keyboard.split(" ");

let wordContainer = [{}];

let health = 7;


init()

function init(){
    health = 7;
    getLife();
    getWord();
    getKeyboard();
}

function getLife(){
    life.textContent = ""
    for(let i = 1; i <= health; i++){
        const heart = document.createElement("div");
        heart.className = "heart";
        life.append(heart);
    }
}


function getWord(){
    for(let i = 1 ; i < guess.length ; i++){
        wordContainer[i] = {};
    }
    for(let i = 0 ; i < guess.length ; i++){
        wordContainer[i].letter = guess[i];
        wordContainer[i].found = /^[a-zA-Z]+$/.test(guess[i])? false:true;
        word.textContent = "";
        for(let i = 0 ; i < guess.length ; i++){
            if(wordContainer[i].found){
                if(/^[a-zA-Z]+$/.test(wordContainer[i].letter)){
                     word.textContent += wordContainer[i].letter + " ";
                }else{
                    word.textContent +=  wordContainer[i].letter + "         ";
                }
            }else{
                word.textContent += "_ "
            }
        }
    }
    
}

function getKeyboard(){

    letters.textContent = "";
    for(let i = 0 ; i < keyboard.length ; i++){
        const btn = document.createElement("button");
        btn.textContent = keyboard[i];
        letters.append(btn);
        btn.addEventListener("click", checkWord);
    }
    
}

function checkWord(e){
    let x = true
    e.target.disabled = true;
    for(let i = 0 ; i < guess.length; i++){
        if(e.target.textContent == wordContainer[i].letter){
           wordContainer[i].found = true;
           x = false
           refreshWord();
        }
    }
    if(x){
        refreshLife();
    }
}

function refreshWord(){
    word.textContent = "";
    for(let i = 0 ; i < guess.length ; i++){
        if(wordContainer[i].found){
            if(/^[a-zA-Z]+$/.test(wordContainer[i].letter)){
                word.textContent += wordContainer[i].letter + " ";
            }else{
                word.textContent +=  wordContainer[i].letter + "         ";
            }
        }else{
            word.textContent += "_ "
        }
    }
    checkComplete();
}

function refreshLife(){
    health--;
    getLife();
    if(health == 0){
        endGame(false);
    }
}


function checkComplete(){
    let c = 0;
    for(let i = 0 ; i < guess.length ; i++){
        if(wordContainer[i].found){
            c++;
        }
    }
    if(c == guess.length){
        endGame(true);
    }
}

function endGame(e){ 
    e?letters.textContent = "Vous avez gagné !":letters.textContent = `Vous avez perdu, le mot était ${guess} !`;
    const retryButton = document.createElement("button");
    retryButton.textContent = "Rejouer";
    letters.append(retryButton);
    retryButton.addEventListener("click", init);
}