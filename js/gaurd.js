// var userData = localStorage.getItem("loggedInUser");





// function login() {
    
//     localStorage.setItem("isLoggedIn", "true");
// }


// var isLoggedIn  = localStorage.getItem("loggedInUser") === "true" ;

(function protectPage() {

    var loggedInUser = localStorage.getItem("loggedInUser");
    var isLoggedIn = loggedInUser !== null;

    const currentPage = window.location.pathname.split("/").pop();

     if (!isLoggedIn && (currentPage === "examPage.html" || currentPage === "timeUp.html" || currentPage === "result.html") ) {
        window.location.replace("login.html");
        
        
    }

    if (isLoggedIn && (currentPage === "login.html" || currentPage === "register.html" || currentPage === "")) {
            window.location.replace("examPage.html");
        }
    
}) ();



