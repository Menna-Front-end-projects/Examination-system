function goResult(){
    window.location.href= "result.html"
}

window.onload = function() {
    // 1. Get the string from localStorage
    var userData = localStorage.getItem("loggedInUser");

    // 2. Check if the data actually exists (to prevent errors)
    if (userData) {
        // 3. Convert the string back into a JavaScript Object
        var user = JSON.parse(userData);

        // 4. Update the HTML element
        // Note: Replace 'name' with the actual key in your user object (e.g., username)
        document.getElementById('user-name').innerText = "Time's Up " + user.firstName + '!';
    } 
};

var answered = Number(localStorage.getItem("answered")) || 0
var leftQ = JSON.parse(localStorage.getItem("leftQ") || "[]")


document.getElementById("total").innerText = answered
document.getElementById("left").innerText = leftQ.length

