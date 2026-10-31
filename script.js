
// ===============================
// AI & ML HUB - JAVASCRIPT
// ===============================

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// Dark / Light Theme
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeBtn.textContent = "☾";
    } else {
        themeBtn.textContent = "☼";
    }
});

// Quiz Questions
const questions = [
    {
        question: "1. What does AI stand for?",
        options: [
            "Artificial Intelligence",
            "Automatic Internet",
            "Advanced Information",
            "Artificial Integration"
        ],
        answer: 0
    },
    {
        question: "2. Which is a subset of Artificial Intelligence?",
        options: [
            "HTML",
            "Machine Learning",
            "CSS",
            "MS Word"
        ],
        answer: 1
    },
    {
        question: "3. What does Machine Learning use to learn?",
        options: [
            "Only hardware",
            "Only websites",
            "Data",
            "Printers"
        ],
        answer: 2
    },
    {
        question: "4. Which technology helps computers understand images?",
        options: [
            "Computer Vision",
            "Web Design",
            "Networking",
            "Database"
        ],
        answer: 0
    },
    {
        question: "5. Which of these is an AI chatbot?",
        options: [
            "Notepad",
            "Calculator",
            "ChatGPT",
            "Paint"
        ],
        answer: 2
    }
];

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let answered = false;

// HTML Elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionCount = document.getElementById("questionCount");
const scoreDisplay = document.getElementById("scoreDisplay");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");

// Display Question
function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    feedback.textContent = "";

    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "See Results →"
            : "Next Question →";

    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsElement.appendChild(button);

    });
}

// Check Answer
function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(button => {
        button.disabled = true;
    });

    if (selected === correct) {

        score++;

        selectedButton.classList.add("correct");
        feedback.textContent = "✓ Correct Answer! Great Job!";
        feedback.style.color = "#3ddc97";

    } else {

        selectedButton.classList.add("wrong");
        allOptions[correct].classList.add("correct");

        feedback.textContent =
            "✗ Incorrect! The correct answer is: " +
            questions[currentQuestion].options[correct];

        feedback.style.color = "#ff8585";
    }

    scoreDisplay.textContent = `Score: ${score}`;

    nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
});

// Final Result
function showResult() {

    questionCount.textContent = "Quiz Completed!";

    scoreDisplay.textContent =
        `Final Score: ${score}/${questions.length}`;

    questionElement.textContent =
        score === 5
            ? "Excellent! You are an AI Expert! 🎉"
            : score >= 3
                ? "Great Work! Keep Learning! 🚀"
                : "Good Try! Practice More! 💡";

    optionsElement.innerHTML = "";

    feedback.textContent =
        `You scored ${score} out of ${questions.length} marks.`;

    progress.style.width = "100%";

    nextBtn.disabled = false;
    nextBtn.textContent = "Play Again ↻";
}

// Restart Quiz
nextBtn.addEventListener("click", () => {

    if (currentQuestion >= questions.length) {

        currentQuestion = 0;
        score = 0;

        showQuestion();
    }

});

// Start Quiz
showQuestion();
