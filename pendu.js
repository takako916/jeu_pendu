const resultArray= new Array
let guessNum = 11; //Nombre de fois où l'on peut deviner.
const guess = []; //tableau de lettres deja trouvee
const orders =[]; //tableau de position de bonne lettre(plus de 1)
const wrongLetters=[]; //liste des mauvaises lettres 
let letter;
var showResult = resultArray.concat(); //
let found = 0;
let sumCounter = 0; //compteur global
let counter; //nombres de lettres trouvée dans le mot
let word; //le mot selectioné
let zeroCounter=0; //nombres de fois d'échouer
let left; //nb d'essaie reste
 
const bouton = document.getElementById("start");
const boutonValide = document.getElementById("valider");
const guessedLetter = document.querySelector("#guessedLetter");
const inputHandle =  document.querySelector("#inputHandle");
const resultat = document.getElementById("result")
const alreadyFound = document.getElementById("alreadyFound");
const gameResult = document.getElementById("gameResult");
const input = document.querySelector("#inputletter");
const countDown = document.querySelector("#countDown");
const wordsFround = document.querySelector("#wordsFound");
const hangmanIllust = document.getElementById('hangmanIllust');
const resetButton = document.getElementById("reset");
const answer = document.getElementById("answer");

//Bouton reset: reload
resetButton.addEventListener('click',function(){
    window.location.reload();
});

//Liste de mots
const words = ["brun","dauphin","course","remplir","guide","cassette", "respirateur","nez","bourdonnement","mesures","arche","adulte","singulier","cadenas","royal","pelle","clignotement","sonner","forme","serpent","festival","dinosaure","niveau","taverne","miette","amour","crocodile","chemise","convertir","violet","rebelle","jument","tissage","avertissement","boomerang","faux","turbulence","alcool","dupliquer","pizza","sol","enseigne","trampoline","raide","composer","coquille","multiplication","balcon","Organisation","Equipe","Sous","ciseaux","sourcils","soleil","lampe","pingouin","ordinateur","herbe","fer","biscuit"]

// Commencer le jeux: 
// le button commencer:sélectionnez un mot au hasard
//                    :afficher le tableau de résultat basé sur la longueur de mot

bouton.addEventListener("click",clickCommencer);

function clickCommencer (){
    word = words[Math.floor(Math.random()*words.length)];
    word = word.toUpperCase();
    console.log(word)
     // console.dir(resultat);
    let i = 0;
    for(i = 0; i < word.length; i++){
        resultArray[i] = "_";    
    }
    // console.log(resultArray.join(" "))
    resultat.innerHTML = resultArray.join(" ");
}

// Examinier la lettre saisie par l'utlisateur
// le button valider: saisir la lettre + examinier la lettre    


boutonValide.addEventListener("click",checkGuess);

function checkGuess (){
  
    let letter = input.value.toUpperCase();
    // console.log(letter);
    
    if (letter.length !==1) { //controle de saise
        inputHandle.textContent =("Erreur: Entrez une seule lettre!");
        inputHandle.style.color = "red"
        inputletter.value = "";
        inputletter.focus();  
    }
    
    else{ // Vérifier si la lettre est déjà trouvé
        inputHandle.textContent = "";
        let guessed = findIndex (guess,letter);
        
        if (guessed !==-1) {
            // console.log ("Vous avez déjà trouvé lettre " + letter);
            alreadyFound.innerHTML ="Vous avez déjà trouvé cette lettre !";
            alreadyFound.style.color ="red"
            // console.log("Resultat "+ showResult.join(" "))
            resultat.innerHTML = showResult.join(" "); 
            inputletter.value = "";
            inputletter.focus();
        }
        
        // Sinon examiner cette lettre
        else {
            alreadyFound.textContent = "";
            inputHandle,textContent = "";
            counter = lookforLetter(word,letter); // Compter la lettre dans le mot    
            // console.log(counter);        
                  
                if(counter === 0){//Le cas 0 lettre est trouvée dans le mot 
                    zeroCounter++;
                    hangmanIllust.src = `imgs/hangman-${zeroCounter}.svg`;
                    wrongLetters.push(letter);
                    // console.log(wrongLetters);
                    guessedLetter.innerHTML = "Lettres erronées : " + wrongLetters.join(" ");
                    left = guessNum-zeroCounter
                    countDown.innerHTML = "Il vous reste "+ left +" essaie"

                        if (left === 0){ 
                            // console.log("Perdu!");
                            gameResult.innerHTML = "Perdu!" 
                            gameResult.style.color="red";
                            inputletter.value = "";
                            inputletter.focus();
                            alreadyFound.textContent = "";
                            boutonValide.disabled = true;
                            answer.innerHTML="Vous devez trouver le mot " + word                          
                            answer.style.color="pink"
                        }  
                        
                        else if(sumCounter===word.length){
                            console.log("Won!");
                            gameResult.innerHTML = "Gagné!!!" 
                            gameResult.style.color="green";
                            inputletter.value = "";
                            inputletter.focus(); 
                        }

                    // console.log("La lettre " + letter+ " n'est pas dans le mot") 
                    showResult = resultArray.concat();
                    // console.log("Resultat "+ showResult.join(" "));
                    inputletter.value = "";
                    inputletter.focus();
                    inputHandle.textContent = "";  
                    }
                    else if(counter === 1) {//Le cas 1 lettre est trouvée dans le mot 
                        guess.push(letter); //Ajouter la bonne lettre dans le tableau "guess"
                        // console.log(guess)
                        sumCounter +=counter
                        wordsFround.innerHTML="Vous avez trouvé "+sumCounter +" lettre(s)."
                        // console.log ("Avec la lettre " + letter + " ,le compteur vaut : " + sumCounter);
                        found = word.indexOf(letter); //trouver la position de lettre
                     // console.log(found); 
                        resultArray.splice(found,1,letter) //remplace la lettre dans le tableau
                        showResult = resultArray.concat();
                     // console.log("Resultat "+ showResult.join(" "))
                        inputletter.value = "";
                        inputletter.focus();
                        
                        if(sumCounter===word.length){
                            console.log("Won!");
                            gameResult.innerHTML = "Gagné!!!" 
                            gameResult.style.color="green";
                            inputletter.value = "";
                            inputletter.focus(); 
                        }
                    }

                    else { //Le cas où plus de 1 lettre sont trouvées dans le mot
                        guess.push(letter); //Ajouter la bonne lettre dans le tableau "guess"
                        // console.log(guess)
                        sumCounter+=counter
                        // console.log ("Avec la lettre " + letter + " ,le compteur vaut : " + sumCounter);
                        found = word.indexOf(letter);
                            while(found !== -1){
                                orders.push (found);//Creer un tableau pour savoir des positions de lettre
                                found = word.indexOf(letter,found+1); //trouver la position de lettre
                            }
                        // console.log (orders); 
                        for(j = 0; j<orders.length;j++){
                            resultArray.splice(orders[j],1,letter) //remplace la lettre dans le tableau
                        }
                        orders.length=0; //reinitialiser le tableau de position
                        showResult = resultArray.concat();
                        // console.log("Resultat "+ showResult.join(" "))
                        if(sumCounter===word.length){
                            console.log("Won!");
                            gameResult.innerHTML = "Gagné!!!" 
                            gameResult.style.color="green";
                            inputletter.value = "";
                            inputletter.focus(); 
                        }
                    }
                resultat.innerHTML = showResult.join(" "); 
                // console.log("Resultat "+ showResult.join(" "))
                inputletter.value = "";
                inputletter.focus();  
        }
    }   
}

  


function findIndex(guessedwords, lettre){
    let guessed; 
    guessed = guessedwords.indexOf(lettre.toUpperCase());
    return guessed;
    }

function lookforLetter(mots,lettre){
    let counter = 0;
    for (char of mots) {
        if (char.toUpperCase() == lettre.toUpperCase()) counter++;
    }
    return counter;
    }



