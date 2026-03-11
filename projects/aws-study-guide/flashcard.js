let flashcards=[];
let currentCard=0;
let showingQuestion=true;
let flashcardElement, flipButton, nextButton, prevButton, currentElement, totalElement;

document.addEventListener("DOMContentLoaded", function() {
    flashcardElement = document.getElementById("flashcard");
    flipButton = document.getElementById("flip");
    nextButton = document.getElementById("next");
    prevButton = document.getElementById("prev");
    currentElement = document.getElementById("current");
    totalElement = document.getElementById("total");

    fetch("flashcards.json")
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.length,'Flashcards loaded.');
            flashcards = data;
            totalElement.textContent = flashcards.length;
            flipButton.addEventListener("click", flipCard);
            nextButton.addEventListener("click", nextCard);
            prevButton.addEventListener("click", prevCard);

            updateCard();
        })
        .catch(error => {
            console.error("Error loading flashcards:", error);
            flashcardElement.textContent = "Failed to load flashcards.";
        });
});

function updateCard() {
    if (flashcards.length === 0) return;

    if(showingQuestion) {
        flashcardElement.textContent = flashcards[currentCard].question;
        flipButton.textContent = "Show Answer";
    } else {
        flashcardElement.textContent = flashcards[currentCard].answer;
        flipButton.textContent = "Show Question";
    }
    currentElement.textContent = currentCard + 1;
}
function flipCard() {
    showingQuestion = !showingQuestion;
    updateCard();
}
function nextCard() {
    currentCard = (currentCard + 1) % flashcards.length;
    showingQuestion = true;
    updateCard();
}
function prevCard() {
    currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    showingQuestion = true;
    updateCard();
}