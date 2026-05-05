
var score = Number(localStorage.getItem("score")) ||0
var total = Number(localStorage.getItem("total")) ||0
var answered = Number(localStorage.getItem("answered")) ||0

 var percentage = 0;
    if (total > 0) {
        percentage = Math.round((score / total) * 100);
    }
document.getElementById("total").innerText = answered
document.getElementById("score").innerText = percentage + " %"
document.getElementById("correctAns").innerText = score



console.log(score, total, answered);



var circle = document.querySelector("svg circle:nth-child(2)");

var radius = 45;
var circumference = 2 * Math.PI * radius;

var offset = circumference - (percentage / 100) * circumference;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = offset;

function ResetExam(){
    localStorage.removeItem("score")
    localStorage.removeItem("answered")
    localStorage.removeItem("totalAns")
    localStorage.removeItem("leftQ")

}

function goExam(){
    window.location.href= "examPage.html"
}

function goLogin() {
    var loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser){
        
        localStorage.removeItem("loggedInUser")

    }
    
    ResetExam()
    window.location.href = "login.html"
}
