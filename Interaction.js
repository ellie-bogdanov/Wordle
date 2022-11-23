let currentRow = 1;
let currentCollumn = 5;
const blacklist = ["ControlLeft",
    "AltLeft",
    "ShiftLeft",
    "CapsLock",
    "Tab",
    "Backquote",
     "Digit1",
     "Digit2",
     "Digit3",
     "Digit4",
     "Digit5",
     "Digit6",
     "Digit7",
     "Digit8",
     "Digit9",
     "Digit0",
     "Minus",
     "Equal",
     "ControlRight",
     "AltRight",
     "Numpad1",
     "Numpad2",
     "Numpad3",
     "Numpad4",
     "Numpad5",
     "Numpad6",
     "Numpad7",
     "Numpad8",
     "Numpad9",
     "Numpad0",
     "NumpadDecimal",
     "NumpadEnter",
     "NumpadAdd",
     "NumpadSubtract",
     "NumpadMultiply",
     "NumpadDivide",
     "NumLock",
     "F1",
     "F2",
     "F3",
     "F4",
     "F5",
     "F6",
     "F7",
     "F8",
     "F9",
     "F10",
     "F11",
     "F12"
    ];
const words = [ "תמונה" , "מצלמה" , "מחברת","בקבוק" ,"חולצה", "חברות","גלידה", "אלבום","מסיכה", "הצלחה",
    "משטרה","אולפן", "התחלה", "הסכמה","עבודה" ,"עברית" ,"עימות", "חפירה" , "מסגרת", "תאריך"];
const currentWord = oneWord();

document.addEventListener('keydown', function(event) {
    console.log(event.code);
    if(blacklist.includes(event.code)) {
        return;
    }
    switch(event.code) {
        case "Period":
            typeLetter("mm");
            return;
        case "Comma":
            typeLetter("tt");
            return;
        case "Semicolon":
            typeLetter("pp");
            return;
        case "Backspace":
            typeLetter("delete");
            return;
        case "Enter":
            typeLetter("enter");
            return;
    }
    const letter = event.code[3].toLowerCase();
    typeLetter(letter);
});


function typeLetter(idLetter) {
    if(idLetter === 'enter') {
        if(currentCollumn != 0) {
            return;
        }
        if (ifExist() == false) {
            document.getElementById(`r${currentRow}c1`).innerText = "";
            document.getElementById(`r${currentRow}c2`).innerText = "";
            document.getElementById(`r${currentRow}c3`).innerText = "";
            document.getElementById(`r${currentRow}c4`).innerText = "";
            document.getElementById(`r${currentRow}c5`).innerText = "";
            alert("Not in word list!");
            currentCollumn = 5;
        } else {
            checkAnswer();
            currentRow++;
            currentCollumn = 5;
        }
        if(currentRow == 6) {
            return;
        }

        return;
    }

    if(idLetter === 'delete') {
        if(currentCollumn == 5) {
            return;
        }
        currentCollumn++;
        document.getElementById(`r${currentRow}c${currentCollumn}`).innerHTML = "";
        return;
    }

    if(currentCollumn == 0) {
        return;
    }
    const letterToHebrew = document.getElementById(idLetter).innerHTML;
    document.getElementById(`r${currentRow}c${currentCollumn}`).innerHTML = letterToHebrew;
    currentCollumn--;
}


function ifExist() {
    let letter1 = document.getElementById(`r${currentRow}c5`).innerText;
    let letter2= document.getElementById(`r${currentRow}c4`).innerText;
    let letter3 = document.getElementById(`r${currentRow}c3`).innerText;
    let letter4= document.getElementById(`r${currentRow}c2`).innerText;
    let letter5 = document.getElementById(`r${currentRow}c1`).innerText;

    let currentWord = letter1 + letter2 + letter3 + letter4 + letter5 + "";
    for (j = 0; j < words.length; j++) {
        if (currentWord === words[j]) {
            return true;
        }
    } return false;
}


function oneWord(){
    let rand = Math.floor(Math.random() * (20));
    let word = words[rand];
    return word;
}


// function logKey(e) {
//     typeLetter(`${e.code}`);
// }


function convertToEnglish(letter) {
    switch(letter) {
        case "ז":
            return 'z';
        case "ס":
            return 'x';
        case "ב":
            return 'c';
        case "ה":
            return 'v';
        case "נ":
            return 'b';
        case "מ":
            return 'n';
        case "צ":
            return 'm';
        case "ת":
            return 'tt';
        case "ץ":
            return 'mm';
        case "ש":
            return 'a';
        case "ד":
            return 's';
        case "ג":
            return 'd';
        case "כ":
            return 'f';
        case "ע":
            return 'g';
        case "י":
            return 'h';
        case "ח":
            return 'j';
        case "ל":
            return 'k';
        case "ך":
            return 'l';
        case "ף":
            return 'pp';
        case "ק":
            return 'e';
        case "ר":
            return 'r';
        case "א":
            return 't';
        case "ט":
            return 'y';
        case "ו":
            return 'u';
        case "ן":
            return 'i';
        case "ם":
            return 'o';
        case "פ":
            return 'p';

                                                            
    }
}

function checkAnswer() {
    let letter1 = document.getElementById(`r${currentRow}c5`).innerText;
    let letter2= document.getElementById(`r${currentRow}c4`).innerText;
    let letter3 = document.getElementById(`r${currentRow}c3`).innerText;
    let letter4= document.getElementById(`r${currentRow}c2`).innerText;
    let letter5 = document.getElementById(`r${currentRow}c1`).innerText;

    let col = 5;

    for (i = col; i > 0; i--) {
        let letter = document.getElementById(`r${currentRow}c${i}`).innerHTML;
        const letterToEnglish = convertToEnglish(letter);
        if (letter == currentWord[col - i]) {
            document.getElementById(`r${currentRow}c${i}`).style.backgroundColor =
                "#538d4e";
            document.getElementById(letterToEnglish).style.backgroundColor = "#538d4e";
            document
                .getElementById(`r${currentRow}c${i}`)
                .setAttribute("isCorrect", true);


        } else if (currentWord.includes(letter)) {
            document.getElementById(`r${currentRow}c${i}`).style.backgroundColor =
                "#b59f3b";
            if(document.getElementById(letterToEnglish).style.backgroundColor != "#538d4e") {
                document.getElementById(letterToEnglish).style.backgroundColor = "#b59f3b";
            }
        } else {
            document.getElementById(`r${currentRow}c${i}`).style.backgroundColor =
                "#3a3a3c";
            if(document.getElementById(letterToEnglish).style.backgroundColor != "#b59f3b" && document.getElementById(letterToEnglish).style.backgroundColor != "#538d4e") {
                document.getElementById(letterToEnglish).style.backgroundColor = "#3a3a3c";
            }
        }
        document.getElementById(`r${currentRow}c${i}`).style.color = "#ffffff";
    }

    let word = `${letter1}${letter2}${letter3}${letter4}${letter5}`
    if(word === currentWord) {
        alert("you won");
    }


    if (currentRow == 6){
        if (currentCollumn == 0) {
            if(!(word === currentWord)) {
                alert("you lose, the word was: " + currentWord);
            }
        }
    }

}