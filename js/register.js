var password = document.getElementById("pass");
var repassword = document.getElementById("repass");
var errorMsg = document.getElementById("errorMsg");
var errorMsg2 = document.getElementById("errorMsg2");
var errorEmail = document.getElementById("errorEmail");
var errorPass = document.getElementById("errorPass");
var errorMsgRePass = document.getElementById("errorMsgRePass");

var myFname = document.getElementById("Fname");
var myLname = document.getElementById("Lname");
var myEmail = document.getElementById("myEmail");



function FnameValidation() {
    if (myFname.value == "") {
        errorMsg.textContent = "Must be not empty"
        return false;
    }
    if (isFinite(myFname.value)) {
        errorMsg.textContent = "Must be not a number"
        return false;
    }
    errorMsg.textContent = "";
    return true;
}

function LnameValidation() {
    if (myLname.value == "") {
        errorMsg2.textContent = "Must be not empty"
        return false;
    }
    if (isFinite(myLname.value)) {
        errorMsg2.textContent = "Must be not a number"
        return false;
    }
    errorMsg2.textContent = "";
    return true;
}


function emailValidation() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (myEmail.value == "") {
        errorEmail.textContent = "Must be not empty"
        return false;
    }
    if (!emailRegex.test(myEmail.value)) {
        errorEmail.textContent = "Invalid Email format"
        return false;
    }
    if (isFinite(myEmail.value)) {
        errorEmail.textContent = "Must be not a number"
        return false;
    }
    errorEmail.textContent = "";
    return true;
}


function passValidation() {
    if (password.value == "") {
        errorPass.textContent = "Must be not empty"
        return false;
    }
    if (password.value.length < 8) {
        errorPass.textContent = "Must be more than 8 char"
        return false;
    }
    errorPass.textContent = "";
    return true;
}
function rePassValidation() {
    if (repassword.value == "") {
        errorMsgRePass.textContent = "Must be not empty"
        return false;
    }
    if (repassword.value.length < 8) {
        errorMsgRePass.textContent = "Must be more than 8 char"
        return false;
    }
    errorMsgRePass.textContent = "";
    return true;
}

function checkPass() {

    if (password.value !== repassword.value) {
        errorMsgRePass.textContent = "not matched"
        return false;
    } else {
        errorMsgRePass.textContent = ""
        return true;
    }

}

function FormValidation(e) {
    e.preventDefault();

    var isFnameValid = FnameValidation()
    var isLnameValid = LnameValidation();
    var isEmailValid = emailValidation();
    var isPassValid = passValidation();
    var isrePassValid = rePassValidation();

    if (isFnameValid && isLnameValid && isEmailValid && isPassValid && isrePassValid && checkPass()) {

        var emailValue = myEmail.value;
        var passValue = password.value;     
        var fnameValue = myFname.value;
        
        var users = JSON.parse(localStorage.getItem("users")) || [];  // get old emails

       var isDuplicate = users.some(function(user) {
            return user.email === emailValue;
        });

        if (isDuplicate) {
            errorEmail.textContent = "Email already exists";
            return;
        }

        var newUser = {
            firstName: fnameValue,
            email: emailValue,
            password: passValue 
        };

        users.push(newUser);

       

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "login.html";
    }
}


// var Mydata = location.search
// console.log(Mydata)

// Mydata.split("?")[1]
// myName = Mydata.split("?")[1].split("=")[1]
// var myh2 = document.createComment('h1')
// myh2.textContent=myName;
// document.body.append(myh2)

