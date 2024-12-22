// Survey questions and options
const questions = [
    {
        question: "Do you love me?",
        options: ["A) Yes", "B) No", "C) IDK", "D) Maybe a lil bit"],
        jumpscareTrigger: "B"
    },
    {
        question: "How much?",
        options: ["A) Dunyalar kadar", "B) Hic"],
        jumpscareTrigger: "B"
    },
    {
        question: "What is my favorite food?",
        options: [],
        jumpscareTrigger: null
    },
    {
        question: "What is my favorite dessert?",
        options: [],
        jumpscareTrigger: null
    },
    {
        question: "Where do I want to go for our honeymoon?",
        options: [],
        jumpscareTrigger: null
    }
];

let currentQuestion = 0;
let wrongAnswers = 0;
const backgrounds = [
    "background_image2.jpg", // Change after 2 wrong answers
    "background_image3.jpg", // Change after 3rd wrong answer
    "background_image4.jpg", // Change after 4th wrong answer
    "background_image5.jpg"  // Change after 5th wrong answer
];

// Display the first question
function displayQuestion() {
    const surveyDiv = document.getElementById("survey");
    surveyDiv.innerHTML = "";

    const question = questions[currentQuestion];
    const questionElem = document.createElement("h2");
    questionElem.textContent = question.question;
    surveyDiv.appendChild(questionElem);

    if (question.options.length > 0) {
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => handleAnswer(option.charAt(0));
            surveyDiv.appendChild(button);
            surveyDiv.appendChild(document.createElement("br"));
        });
    } else {
        const input = document.createElement("input");
        input.type = "text";
        surveyDiv.appendChild(input);

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.onclick = () => handleAnswer(input.value);
        surveyDiv.appendChild(button);
    }
}

// Handle user answer
function handleAnswer(answer) {
    const question = questions[currentQuestion];
    if (question.jumpscareTrigger && answer.toUpperCase() === question.jumpscareTrigger) {
        wrongAnswers++;
        triggerJumpscare();
        updateBackground();
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        finishSurvey();
    }
}

// Trigger jumpscare
function triggerJumpscare() {
    const jumpscare = document.getElementById("jumpscare");
    const sound = document.getElementById("jumpscare-sound");
    sound.play();
    jumpscare.style.display = "block";

    setTimeout(() => {
        jumpscare.style.display = "none";
    }, 3000);
}

// Update background based on wrong answers
function updateBackground() {
    if (wrongAnswers <= backgrounds.length) {
        document.body.style.backgroundImage = `url('${backgrounds[wrongAnswers - 1]}')`;
    }
}

// Finish survey
function finishSurvey() {
    const surveyDiv = document.getElementById("survey");
    surveyDiv.innerHTML = "<h2>Thank you for completing the survey, Lutphosh!</h2>";
}

// Initialize survey
displayQuestion();

document.addEventListener('click', () => {
    const music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    }
});
