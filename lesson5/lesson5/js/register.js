import("../model/user");
function registerPage() {
    window.open("file:///C:/AcademyAndMyData/Teacher/JS/lessons/lesson5/lesson5/html/register.html");
}
/*
    Обычно Вы создаете при регистрации объект, заполняете его всеми нужными данными
    парсите в JSON и отправляете на сервер. 
*/
function register() {
    localStorage.clear();
    let u = new user("Igor", "brolerbrat@gmail.com", "00116611");
    localStorage.setItem('name', u.name);
    localStorage.setItem('email', u.email);
    localStorage.setItem('password', u.password);
    alert('success');
}