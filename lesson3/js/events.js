// validation form register
function checkRegisterForm() {
    // check name
    if(!checkName()) alert('Name Bad!');
    // check password
    if(!checkPassword()) alert('Password Bad!');
    // check e-mail
    if(!checkEmail()) alert('Email Bad!');
}

let checkName = () => {
    let checkNameFlag = false;
    let inputName = document.getElementById('inputNameId');
    let lblName = document.getElementById('lblNameId');
    let inputNameText = inputName.value;
    if(String(inputNameText).length < 3) { // Преобразовать строго к типу String для получения length
        lblName.style.color = 'red';
        inputName.style.background = 'rgb(214, 152, 152)';
        checkNameFlag = false;
    } else {
        lblName.style.color = 'white';
        inputName.style.background = 'white';
        checkNameFlag = true;
    }
    return checkNameFlag;
}

let checkPassword = () => {
    let checkPasswordFlag = false;
    let inputPassword = document.getElementById('inputPasswordId');
    let lblPassword = document.getElementById('lblPasswordId');
    let inputPasswordText = inputPassword.value;
    // Пояснение:
    // (?=.*[0-9]) - строка содержит хотя бы одно число;
    // (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
    // (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
    // (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
    // [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 вышеупомянутых символов.
    let passRegTemplate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    let passRegArr = passRegTemplate.exec(inputPasswordText);
    if(passRegArr === null) {
        lblPassword.style.color = 'red';
        inputPassword.style.background = 'rgb(214, 152, 152)';
        checkPasswordFlag = false;
    } else {
        lblPassword.style.color = 'white';
        inputPassword.style.background = 'white';
        checkPasswordFlag = true;
    }
    return checkPasswordFlag;
}

let checkEmail = () => {
    let checkEmailFlag = false;
    let lblEmail = document.getElementById('lblEmailId');
    let inputEmail = document.getElementById('inputEmailId');
    // (\w+[@]\w+[.]\w\w+) - буквы или цифры @ буквы или цифры . не меньше 2 букв или символов
    let emailRegTemplate = /(\w+[@]\w+[.]\w\w+)/g;
    let emailRegArr = emailRegTemplate.exec(inputEmail.value);
    console.log(emailRegArr);
    if(emailRegArr === null) {
        lblEmail.style.color = 'red';
        inputEmail.style.background = 'rgb(214, 152, 152)';
        checkEmailFlag = false;
    } else {
        lblEmail.style.color = 'white';
        inputEmail.style.background = 'white';
        checkEmailFlag = true;
    }
    return checkEmailFlag;
}