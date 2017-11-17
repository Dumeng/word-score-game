var LETTERS = [
    new Letter('_', 2, 0),
    new Letter('_', 2, 0),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('B', 2, 3),
    new Letter('B', 2, 3),
    new Letter('C', 2, 3),
    new Letter('C', 2, 3),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('F', 2, 4),
    new Letter('F', 2, 4),
    new Letter('G', 3, 2),
    new Letter('G', 3, 2),
    new Letter('G', 3, 2),
    new Letter('H', 2, 4),
    new Letter('H', 2, 4),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('J', 1, 8),
    new Letter('K', 1, 5),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('M', 2, 3),
    new Letter('M', 2, 3),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('P', 2, 3),
    new Letter('P', 2, 3),
    new Letter('Q', 1, 10),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('V', 2, 4),
    new Letter('V', 2, 4),
    new Letter('W', 2, 4),
    new Letter('W', 2, 4),
    new Letter('X', 1, 8),
    new Letter('Y', 2, 4),
    new Letter('Y', 2, 4),
    new Letter('Z', 1, 10),
];

var BAG_OF_LETTERS = [];
var YOUR_HAND = new Array();
var SCORE = 0;

/**
 Initialize HTML and global variable for a new game.
 *
 @method startGame
 */
function startGame() {
    SCORE = 0;
    $("#score-number").html(SCORE);
    for (var i in LETTERS) {
        BAG_OF_LETTERS[i] = new Letter(LETTERS[i].letter, LETTERS[i].numberOfStartingTiles, LETTERS[i].pointsWhenLettersUsed);
    }
    $("#word-history-list").empty();
    $("div.tile-piece").show();
    retireHand();
};

/**
 Add new letters to YOUR_HAND until it has 7 letters.
 *
 @method addNumbersFromBag
 */
function addNumbersFromBag() {
    console.log("your hand has:" + YOUR_HAND.length);
    for (i = YOUR_HAND.length; i < 7; i++) {
        if (BAG_OF_LETTERS.length == 0) {
            break;
        } else {
            YOUR_HAND[i] = getAvailableLetter();
        }
    }
    if (YOUR_HAND.length == 0) {
        gameOver();
    }
}

/**
 Update ".tile-piece" elements in HTML to display letters in YOUR_HAND.
 *
 @method displayHand
 */
function displayHand() {
    $(".tile-piece").hide();
    console.log("your hand has:" + YOUR_HAND.length);
    $("#letters-in-bag-number").html(BAG_OF_LETTERS.length);
    for (i = 0; i < YOUR_HAND.length; i++) {
        //console.log("#letter-" + (i+1) +" set to " + YOUR_HAND[i].letter);
        $("#letter-" + (i + 1)).addClass("letter-" + YOUR_HAND[i].letter);
        $("#points-" + (i + 1)).addClass("points-" + YOUR_HAND[i].pointsWhenLettersUsed);
        $("#letter-" + (i + 1)).html(YOUR_HAND[i].letter);
        $("#points-" + (i + 1)).html(YOUR_HAND[i].pointsWhenLettersUsed);
        $("#tile-piece-" + (i + 1)).show();
    }

}

/**
 Get a random available Letter from BAG_OF_LETTERS.
 *
 @method getAvailableLetter
 *
 @return {Letter} The random available Letter.
 */
function getAvailableLetter() {
    var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
    var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
    //console.log(randomLetter[0]);
    return randomLetter[0];
}

/**
 Find the vaild word with the highest point from current YOUR_HAND and submit it.
 *
 @method findWordToUse
 */
function findWordToUse() {
    if (YOUR_HAND.length < 2) {
        modal = UIkit.modal.blockUI("You have no way out, dude.");
        setTimeout(function () {
            modal.hide()
        }, 2000);
        return;
    }
    var lettersInHand = new Array();
    for (i in YOUR_HAND) {
        lettersInHand.push(YOUR_HAND[i].letter);
    }
    var vaildWords = new Array();
    for (len = 2; len <= YOUR_HAND.length; len++) {
        vaildWords = vaildWords.concat(getArrangement(lettersInHand, len));
    }
    var resultWord = "";
    var resultWordPoint = -1;
    var point = 0;
    var word = "";

    for (i in vaildWords) {
        if (isThisAWord(vaildWords[i])) {
            word = vaildWords[i];
            haveLettersForWord(word);
            for (j in YOUR_HAND) {
                if (YOUR_HAND[j].used) {
                    point += YOUR_HAND[j].pointsWhenLettersUsed;
                    j--;
                }
            }
            resetHand();
            if (point > resultWordPoint) {
                resultWord = word;
                resultWordPoint = point;
            }
            point = 0;
        }
    }
    if (resultWord == "") {
        modal = UIkit.modal.blockUI("You have no way out, dude.");
        setTimeout(function () {
            modal.hide()
        }, 2000);
        return;
    }
    haveLettersForWord(resultWord);
    successfullyAddedWord(resultWord);
}

/**
 Get all possible arrangement of letter in YOUR_HAND. The "_" will be a wildcard for all letters form "A" to "Z".
 *
 @method findWordToUse
 *
 @param {Array<String>} [letters] All available letters.{number} [len] Words length.
 *
 @return {Array<String>} All possible words.
 */
function getArrangement(letters, len) {
    var wordsList = new Array();
    if (len == 1) {
        for (i in letters) {
            if (letters[i] == "_") {
                for (l = 0; l < 26; l++) {
                    wordsList.push(String.fromCharCode(65 + l));
                }
                break;
            } else {
                wordsList.push(letters[i]);
            }
        }
        return wordsList;
    } else {
        var tLetter,
        tList;
        for (i in letters) {
            tLetter = letters[i];
            letters.splice(i, 1);
            tList = getArrangement(letters, len - 1)
                if (tLetter == "_") {
                    for (l = 0; l < 26; l++) {
                        for (j in tList) {
                            wordsList.push(String.fromCharCode(65 + l) + tList[j]);
                        }
                    }
                    letters.splice(i - 1, 0, tLetter);
                    break;
                } else {
                    for (j in tList) {
                        wordsList.push(tLetter + tList[j]);
                    }
                }
                letters.splice(i - 1, 0, tLetter);
        }
        return wordsList;
    }
}

/**
 Get the player's submit and proccess it.
 *
 @method humanFindWordToUse
 */
function humanFindWordToUse() {

    var humanFoundWord = $("#human-word-input").val();
    console.log("Checking human workd of:" + humanFoundWord);
    if (humanFoundWord.length < 1) {
        modal = UIkit.modal.blockUI("Your input is not a valid word.");
        setTimeout(function () {
            modal.hide()
        }, 1000);
        return;
    }
    if (humanFoundWord.length > 7) {
        modal = UIkit.modal.blockUI("Your input contains too many letters.");
        setTimeout(function () {
            modal.hide()
        }, 1000);
        return;
    }
    if (isThisAWord(humanFoundWord)) {
        if (haveLettersForWord(humanFoundWord)) {
            successfullyAddedWord(humanFoundWord);
        } else {
            modal = UIkit.modal.blockUI(humanFoundWord + " - Do not have the letters for this word");
            setTimeout(function () {
                modal.hide()
            }, 1000);
        }
    } else {
        modal = UIkit.modal.blockUI(humanFoundWord + " is not a valid word.");
        setTimeout(function () {
            modal.hide()
        }, 1000);
    }
}

/**
 Proccess a successful submit.
 *
 @method successfullyAddedWord
 *
 @param {String} [foundWord] The word need to be proccessed.
 */
function successfullyAddedWord(foundWord) {
    t = SCORE;
    clearClasses();
    takeOutUsedLetters();
    addNumbersFromBag();
    displayHand();
    $("#word-history-list").append("<li>" + foundWord.toUpperCase() + " - " + (SCORE - t) + "</li>");
    $("#human-word-input").val('');

}

/**
 Add the point of the letter to SCORE.
 *
 @method addToScore
 *
 @param {Letter} [letterToAddToScore] The Letter need to be proccessed.
 */
function addToScore(letterToAddToScore) {
    SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
    console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
    $("#score-number").html(SCORE);
}

/**
 Remove the Letters in YOUR_HAND marked as used and add their points to SCORE.
 *
 @method takeOutUsedLetters
 */
function takeOutUsedLetters() {

    for (ii = 0; ii < YOUR_HAND.length; ii++) {
        if (YOUR_HAND[ii].used) {
            addToScore(YOUR_HAND[ii]);
            YOUR_HAND.splice(ii, 1);
            ii = ii - 1;
        } else {
            console.log(YOUR_HAND[ii].letter + "<- Not Used");
        }
    }

}
/**
 Determine if Letters in YOUR_HAND can make up the submit word.
 *
 @method isThisAWord
 *
 @param {String} [aProposedWord] The word need to be proccessed.
 *
 @return {boolean} If Letters in YOUR_HAND can make up the word then return True. Otherwise return False.
 */
function haveLettersForWord(aProposedWord) {
    var wordAsArray = aProposedWord.toUpperCase().split("");
    for (i = 0; i < wordAsArray.length; i++) {
        var foundLetter = false;
        var _Position = -1;
        //console.log(wordAsArray[i] + "<-For match");
        for (ii = 0; ii < YOUR_HAND.length; ii++) {
            //console.log("              " + YOUR_HAND[ii].letter + "<-Checking");
            if (YOUR_HAND[ii].letter == '_') {
                if (!YOUR_HAND[ii].used) {
                    _Position = ii;
                }
            }
            if (YOUR_HAND[ii].letter == wordAsArray[i]) {
                if (!YOUR_HAND[ii].used && !foundLetter) {
                    //console.log("     " + YOUR_HAND[ii].letter + "<-Found");
                    YOUR_HAND[ii].used = true;
                    foundLetter = true;
                    break;
                }
            }
        }

        if (!foundLetter) {
            if (_Position != -1) {
                YOUR_HAND[_Position].used = true;
                foundLetter = true;
            } else {
                resetHand();
                return false;
            }
        }
    }

    return true;
}

function resetHand() {
    for (i = 0; i < YOUR_HAND.length; i++) {
        YOUR_HAND[i].used = false;
    }
}

/**
 Determine if the submit word is a vaild word in Word_List.
 *
 @method isThisAWord
 *
 @param {String} [aProposedWord] The word need to be proccessed.
 *
 @return {boolean} If submit is a vaild word then return True. Otherwise return False.
 */
function isThisAWord(aProposedWord) {
    if (Word_List.isInList(aProposedWord)) {
        return true;
    }
    return false;
}

/**
 Discard all Letters in YOUR_HAND and add new Letters from BAG_OF_LETTERS. Then update the HTML.
 *
 @method retireHand
 */
function retireHand() {
    //Loose all the points in your hand
    clearClasses();
    YOUR_HAND = new Array();
    addNumbersFromBag();
    displayHand();
    $("#human-word-input").val("");
}

/**
 Update the HTML to clean YOUR_HAND display.
 *
 @method clearClasses
 */
function clearClasses() {
    for (ii = 0; ii < YOUR_HAND.length; ii++) {
        $("#letter-" + (ii + 1)).removeClass("letter-" + YOUR_HAND[ii].letter);
        $("#points-" + (ii + 1)).removeClass("points-" + YOUR_HAND[ii].pointsWhenLettersUsed);
    }
}

/**
 End the game and give the result. Then update the HTML. Ask the player weather want to play a new game.
 *
 @method gameOver
 */
function gameOver() {
    $("div.tile-piece").hide();
    UIkit.modal.confirm("<p style='font-size:x-large'>Game Over! Nice try.<br /><br />Your Score is: <strong>" + SCORE + "</strong>.<br /><br />Try again?</p>", function () {
        startGame();
    });
}

$(document).ready(function () {
    startGame();

    $("#find-word-button").click(function () {
        findWordToUse();
    });
    $("#human-find-word-button").click(function () {
        humanFindWordToUse();
    });
    $("#retire-hand-button").click(function () {
        retireHand();
    });
    $("#new-game-button").click(function () {
        UIkit.modal.confirm("Are you sure?", function () {
            startGame();
        });
    });
    $("form").submit(function () {
        humanFindWordToUse();
        return false;
    });
    $(".tile-piece").click(function () {
        input = $("#human-word-input");
        input.val("" + input.val() + (this.firstElementChild.innerHTML));
    });
    $("#clean-input").click(function () {
        $("#human-word-input").val("");
    });
});
