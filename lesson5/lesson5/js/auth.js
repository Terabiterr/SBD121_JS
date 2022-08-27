import("../model/user");
function authPage() {
    window.open("file:///C:/AcademyAndMyData/Teacher/JS/lessons/lesson5/lesson5/html/auth.html");
}

//
document.addEventListener("DOMContentLoaded", () => {
    if(
        localStorage.getItem("name") ===  "Igor" &&
        localStorage.getItem("email") ===  "brolerbrat@gmail.com" &&
        localStorage.getItem("password") ===  "00116611"
        ) {
            document.querySelector('.userAuthReg')
            .style.display = 'none';
            document.querySelector('.userCabinet')
            .style.display = 'block';
        } else {
            document.querySelector('.userAuthReg')
            .style.display = 'block';
            document.querySelector('.userCabinet')
            .style.display = 'none';
        }
});
function exitAuth() {
    localStorage.clear();
    document.location.reload();
}

