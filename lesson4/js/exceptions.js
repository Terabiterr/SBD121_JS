// throw new Error('Your message exception message');
// function CustomException(message) {
//     const error = new Error(message);
  
//     error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
//     return error;
//   }
  
//   CustomException.prototype = Object.create(Error.prototype);
//   console.log(CustomException('Mistake'));

// function CustomException(message) {
//     const error = new Error(message);
//     return error;
//   }
  
//   CustomException.prototype = Object.create(Error.prototype);

//   throw new CustomException("Stack overflow!")

// function CustomException(message, metadata) {
//     const error = new Error(message);
//     error.metadata = metadata;
//     console.log(error.metadata)
//     return error;
//   }

//   metadata = {
//     line: 15,
//     message: 'mistake something'
//   }
//   console.log(CustomException('Error stack', metadata))

// throw "Error2"; // генерирует исключение, значением которого является строка
// throw 42;       // генерирует исключение, значением которого является число 42
// throw true;     // генерирует исключение, значением которого является логическое значение true
function UserException(message) {
    this.message = message;
    this.name = "Исключение, определённое пользователем";
 }
 function getMonthName(mo) {
    mo = mo-1; // Нужно скорректировать номер месяца согласно индексам массива (1=Jan, 12=Dec)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
       "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (months[mo] !== undefined) {
       return months[mo];
    } else {
       throw new UserException("Неверно указан номер месяца");
    }
 }
 
 try {
    // statements to try
    var myMonth = 15; // 15 находится вне границ массива, что приведёт к исключению
    var monthName = getMonthName(myMonth);
 } catch (e) {
    monthName = "неизвестен";
    logMyErrors(e.message, e.name); // передаём исключение в обработчик ошибок
 }