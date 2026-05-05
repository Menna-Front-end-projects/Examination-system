
/////get user name ///////

window.onload = function() {
    // 1. Get the string from localStorage
    var userData = localStorage.getItem("loggedInUser");

    // 2. Check if the data actually exists (to prevent errors)
    if (userData) {
        // 3. Convert the string back into a JavaScript Object
        var user = JSON.parse(userData);

        // 4. Update the HTML element
        // Note: Replace 'name' with the actual key in your user object (e.g., username)
        document.getElementById('user-name').innerText = user.firstName + "!";
    } 
};

//////////////////////////question navigator//////////


var questions = [

    {
        id: 1,
        text: "Which OOP concept refers to wrapping data and methods into a single unit?",
        options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
        correct: 1,
        userAnswer: null,
        marked: false
    },
    {
        id: 2,
        text: "Which keyword is used to create a class in JavaScript?",
        options: ["constructor", "new", "class", "this"],
        correct: 2,
        userAnswer: null,
        marked: false
    },
    {
        id: 3,
        text: "What is the process of a class acquiring properties of another class called?",
        options: ["Inheritance", "Encapsulation", "Overloading", "Abstraction"],
        correct: 0,
        userAnswer: null,
        marked: false
    },
    {
        id: 4,
        text: "In JavaScript, which method is called automatically when an object is created?",
        options: ["start()", "init()", "main()", "constructor()"],
        correct: 3,
        userAnswer: null,
        marked: false
    },
    {
        id: 5,
        text: "Which concept allows different classes to be treated as instances of the same superclass through the same interface?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Composition"],
        correct: 1,
        userAnswer: null,
        marked: false
    },
    {
        id: 6,
        text: "Which of these is used to hide internal details and show only functionality?",
        options: ["Abstraction", "Inheritance", "Nesting", "Scripting"],
        correct: 0,
        userAnswer: null,
        marked: false
    },
    {
        id: 7,
        text: "What does 'this' keyword refer to in a JavaScript class method?",
        options: ["The global object", "The class itself", "The instance of the object", "The function"],
        correct: 2,
        userAnswer: null,
        marked: false
    },
    {
        id: 8,
        text: "Which operator is used to check if an object is an instance of a specific class?",
        options: ["typeof", "instanceof", "is", "extends"],
        correct: 1,
        userAnswer: null,
        marked: false
    },
    {
        id: 9,
        text: "A class that inherits from another class is called a:",
        options: ["Superclass", "Root class", "Subclass", "Base class"],
        correct: 2,
        userAnswer: null,
        marked: false
    },
    {
        id: 10,
        text: "What is the benefit of Encapsulation?",
        options: ["Faster execution", "Data security and control", "Less code", "None of the above"],
        correct: 1,
        userAnswer: null,
        marked: false
    }
]




var currentQuestionIndex = 0;

var questionText = document.getElementById('question-text');
var questionCount = document.getElementById('question-count');
var answersGrid = document.getElementById('answers-grid');
var navigatorList = document.getElementById('navigator-list');


function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
}


    shuffleQuestions(questions);

// 2. Re-assign IDs if you want them to show 1 to 10 in order
questions.forEach((q, index) => {
    q.id = index + 1; 
});


function displayQuestion(index) {
    
    var q = questions[index];


    questionText.innerText = `${q.id} , ${q.text}`;
    questionCount.innerText = `Question ${q.id}/10`;

    answersGrid.innerHTML = '';   // to remove old answers
    var labels = ["A", "B", "C", "D"];


    for (var i = 0; i < q.options.length; i++) {
        var opt = q.options[i];


        answersGrid.innerHTML +=
            '<div class="answer-item bg-[#F3F1EE] rounded-xl m-4 shadow-md border-1 border-dashed border-[#456882] p-5 flex gap-6 cursor-pointer hover:bg-white transition">' +
            '<span class="border rounded-full px-3 py-1 text-[15px]">' + labels[i] + '</span>' +
            '<span>' + opt + '</span>' +
            '</div>';
    }

    var answerItems = document.querySelectorAll(".answer-item");

    for (let i = 0; i < answerItems.length; i++) {

        answerItems[i].onclick = function () {

            questions[currentQuestionIndex].userAnswer = i;   // store the answer

            displayQuestion(currentQuestionIndex);
        };

        if (q.userAnswer === i) {
            answerItems[i].style.backgroundColor = "#D2C1B6";
        }
    }

    updateNavigator(index);
}

function initNavigator() {
    navigatorList.innerHTML = '';

    for (let i = 0; i < questions.length; i++) {

        var q = questions[i];
        var btn = document.createElement('p');

        btn.innerText = q.id;
        btn.className = "nav-item border rounded-xl p-2 w-10 text-center text-[#456882] cursor-pointer transition-all";

        btn.onclick = function () {
            currentQuestionIndex = i;
            displayQuestion(i);
        };

        navigatorList.appendChild(btn);
    }
}


var markBtn = document.getElementById('mark');

markBtn.onclick = function () {
    questions[currentQuestionIndex].marked = !questions[currentQuestionIndex].marked;
    updateNavigator(currentQuestionIndex);
};



function updateNavigator(activeIndex) {
    var navItems = document.querySelectorAll('.nav-item');

    for (var i = 0; i < navItems.length; i++) {
        var item = navItems[i];
        var isMarked = questions[i].marked;
        var isAnswered = questions[i].userAnswer !== null; // Check if an answer exists

        // 1. Default State
        item.style.backgroundColor = "transparent";
        item.style.borderColor = "#456882";
        item.style.color = "#456882"; // Default text color

        // 2. Status: Answered (Higher priority than default)
        if (isAnswered) {
            item.style.backgroundColor = "#456882";
            item.style.color = "white"; 
        }

        // 3. Status: Marked (Highest priority for background)
        if (isMarked) {
            item.style.backgroundColor = "#ffedd5";
            item.style.borderColor = "#fdba74";
            item.style.color = "#456882"; // Reset text color for light background
        }

        // 4. Current Active Question (Border highlight)
        if (i === activeIndex) {
            item.style.borderWidth = "3px";
            item.style.borderColor = "#1B3C53";
            
            // If it's the current question and NOT marked/answered, give it a soft highlight
            if (!isMarked && !isAnswered) {
                item.style.backgroundColor = "#D2C1B6";
            }
        } else {
            item.style.borderWidth = "1px";
        }
    }
}

initNavigator();
displayQuestion(0);


//////////////////////////  calculate marks   /////////////////////

function CalculateMarks() {
    var score = 0;
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer === questions[i].correct)
            score++
    }
    return score
}


///////////////Timer////////////////

var timeLeft = 300;

function updateDisplay() {
    var mins = Math.floor(timeLeft / 60);
    var secs = timeLeft % 60;
    document.getElementById('minutes').textContent = mins.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
}

var timerInterval = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timerInterval);
        var result = CalculateMarks();
        var totalAns = 0;
        var leftQ = [];

        for (var i = 0; i < questions.length; i++) {
            if (questions[i].userAnswer !== null) {
                totalAns++;
            } else {
                leftQ.push(questions[i]);
            }
        }

        localStorage.setItem("score", result);
        localStorage.setItem("answered", totalAns);
        localStorage.setItem("total", questions.length);
        localStorage.setItem("leftQ", JSON.stringify(leftQ));
        
        window.location.href = "timeUp.html";
    }
}, 1000);

updateDisplay();

 ///////////////////////////      sumbit & local storage  /////////////

var submitBtn = document.getElementById("submit")

submitBtn.onclick = function () {
    var result = CalculateMarks();
    var totalAns = 0;
    var leftQ = []

    for (var i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer !== null) {
            totalAns++;
        } else {
            leftQ.push(questions[i])
        }
    }

    localStorage.setItem("score", result)  // for correct answer
    localStorage.setItem("answered", totalAns)  // for answered questions
    localStorage.setItem("total", questions.length)  // all questions
    localStorage.setItem("leftQ", JSON.stringify(leftQ))

    window.location.href = "result.html"
}



////////////////////Mark the question//////////////////////////






