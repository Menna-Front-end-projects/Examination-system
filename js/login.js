var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('pass-error');

var popUp = document.getElementById('pop-up');
var popUpIcon = document.getElementById('icon');
var popUpText = document.getElementById('pop-up-text');



function handleLogin() {
        login();
        window.location.href = "exam.html";
    }


function emailValidation() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value === "") {
        emailError.textContent = "email is required"
        return false;
    }
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Invalid email format"
        return false;
    }
    emailError.textContent = "";
    return true;
}

function passwordValidation() {

    if (passwordInput.value === "") {
        passwordError.textContent = "passsword is required"
        return false;
    }

    if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long"
        return false
    }

    passwordError.textContent = "";
    return true;

}

function formValidation(e) {
    e.preventDefault();

    var isEmailValid = emailValidation();
    var isPassValid = passwordValidation();

    var users = JSON.parse(localStorage.getItem("users"))
    var loggedInUser;
    console.log(users)

    if (isEmailValid && isPassValid) {

        var foundUser = users.find(user =>
            user.email === emailInput.value && user.password === passwordInput.value
        );

        if (foundUser) {
            
            ResetExam();

            loggedInUser = foundUser;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            // Show Success UI
            popUp.classList.add("flex", "items-center", "gap-4", "border-green-600", "text-green-600");
            popUp.classList.remove("hidden", "border-red-500", "text-red-500"); // Remove error colors
            popUpText.innerText = "login successful !";

            popUpIcon.innerHTML = `
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
    `;
            setTimeout(() => {
                popUpText.innerText = "Preparing your exam... 🚀";
            }, 1500);

            // ONLY redirect if login was actually successful
            setTimeout(() => {
                window.location.href = "examPage.html";
            }, 3500);

        } else {
            // ERROR LOGIC
            popUp.classList.add("flex", "items-center", "gap-4", "border-red-500", "text-red-500");
            popUp.classList.remove("hidden", "border-green-600", "text-green-600"); // Remove success colors
            popUpText.innerText = "oops ! wrong email or password";
            popUpIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="size-10"> <path stroke-linecap="round" stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>`

            // Hide popup after 3 seconds, but DO NOT redirect
            setTimeout(() => {
                popUp.classList.replace("flex", "hidden");
            }, 3000);
        }
    }
}



function ResetExam(){
    localStorage.removeItem("score")
    localStorage.removeItem("answered")
    localStorage.removeItem("totalAns")
    localStorage.removeItem("leftQ")

}



