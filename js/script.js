// Define variables
const wordText = document.querySelector(".word"); 
const hintText = document.querySelector(".hint span");
var user_input = "";
var is_click = {};
var click_order = [];
var correct_answer = false;
var total_score = 0;
let correctWord;
var interval;
var seconds = 0; 
var tens = 0; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")


function startTimer () {
    // Stopwatch

    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
}


function initGame() {
    // init the Game
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split(""); // splitting each letter of random word

    for (let i = wordArray.length - 1; i> 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //getting random number
        // shuffling and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join(""); // passing shuffled word as word text
    hintText.innerText = randomObj.hint; // passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord
    
    var chars_buttons = "";
    for (let i = 0; i < wordArray.length; i++) {
        chars_buttons +=  '<button onClick=';
        chars_buttons += "'return ";
        chars_buttons += 'addCharacter("';
        chars_buttons += wordArray[i];
        chars_buttons += '", ' + i;
        chars_buttons += ");' ";
        chars_buttons += 'class="shuffled_chrs" id="';
        chars_buttons += 'button_' + i + '"';
        chars_buttons += ">";     
        chars_buttons += wordArray[i];
        chars_buttons += "</button>";
        
        if (i != wordArray.length-1) {
            chars_buttons += "&nbsp;&nbsp;";
        } 
        is_click[i] = false; 
    }

    var shuffled_wrds_elm = document.getElementById("shuffled_wrds");
    shuffled_wrds_elm.innerHTML = chars_buttons;

    // console.log(randomObj);

    // Start the timer
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
    startTimer ();
}


function checkWord() {
    // Check if the user's answer is correct or not
    clearInterval(interval);

    var input_id_elm = document.getElementById("input_id");
    var trimmed_input = input_id_elm.value.replace(/\s/g, "");

    var message_1_id_elm = document.getElementById("message_1_id");
    var message_2_id_elm = document.getElementById("message_2_id");
    var img_id_elm = document.getElementById("img_id");

    if (trimmed_input != correctWord) {
        message_1_id_elm.innerHTML = "INCORRECT!!!";
        message_2_id_elm.innerHTML = "Please try again".toUpperCase();
        img_id_elm.src = "img/cross.png";
        openPopup();
        document.getElementById("give_up_btn").style.backgroundColor = "red";
        document.getElementById("continue_btn").style.backgroundColor = "red";
    } else if (trimmed_input == correctWord) {
        message_1_id_elm.innerHTML = "CORRECT!!!";
        message_2_id_elm.innerHTML = user_input.toUpperCase();
        img_id_elm.src = "img/tick.png";
        openPopup();
        document.getElementById("give_up_btn").style.backgroundColor = "#6fd649";
        document.getElementById("continue_btn").style.backgroundColor = "#6fd649";

        correct_answer = true;
        
        total_score += 10;
        var score_id_elm = document.getElementById("score_id");
        score_id_elm.innerHTML = total_score;
    }
}


function openPopup () {
    // Open the pop-up to display the result
    var popup_id_elm = document.getElementById("popup_id");
    popup_id_elm.classList.add("open-popup");
}


function closePopup () {
    // Close the pop-up screen
    var popup_id_elm = document.getElementById("popup_id");
    popup_id_elm.classList.remove("open-popup");
}


function addCharacter(character, char_order) {
    // User click to each character to add the answer
    var clicked = is_click[char_order];

    if (!clicked) {
        var input_id_elm = document.getElementById("input_id");
        user_input += character + " ";
        input_id_elm.value = user_input;

        document.getElementById("button_" + char_order).style.backgroundColor = "gray";

        is_click[char_order] = true;

        click_order.push(char_order);

        return true;
    } else {
        return false;
    }
}


function refresh() {
    // Change the new word
    initGame();
    user_input = "";
    is_click = {};
    click_order = [];

    var input_id_elm = document.getElementById("input_id");
    input_id_elm.value = user_input;

    correct_answer = false;
}


function reset_input() {
    // Reset input
    var input_id_elm = document.getElementById("input_id");
    user_input = "";
    input_id_elm.value = user_input;

    for(var key in is_click) {
        is_click[key] = false;
        document.getElementById("button_" + key).style.backgroundColor = "#E5E4E2";
    }

    click_order = [];
}


function delete_input() {
    // Delete input
    if (click_order.length != 0) {
        var pop_char_index = click_order.pop();
        user_input = user_input.slice(0, user_input.length-2);

        var input_id_elm = document.getElementById("input_id");
        input_id_elm.value = user_input;

        is_click[pop_char_index] = false;

        document.getElementById("button_" + pop_char_index).style.backgroundColor = "#E5E4E2";
    }
}


function continueGame() {
    // If user chooses to continue the game
    closePopup();
    if (correct_answer) {
        refresh();
    } else {
        reset_input();
    }
    clearInterval(interval);
    interval = setInterval(startTimer, 10);   
}


function giveUpGame() {
    // If user chooses to stop the game
    closePopup();

    var final_screen_id_elm = document.getElementById("final_screen_id");
    final_screen_id_elm.classList.add("open-popup");

    var final_score_id_elm = document.getElementById("final_score_id");
    final_score_id_elm.innerHTML = total_score;

    document.getElementById("refresh_id").disabled = true;
    document.getElementById("check_id").disabled = true;
}