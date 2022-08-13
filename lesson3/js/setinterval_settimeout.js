// function sayHi(phrase, who) {
//     alert( phrase + ', ' + who );
//   }
  
//   setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон
//   // clear
//   let timerId = setTimeout(() => alert("ничего не происходит"), 1000);
//     alert(timerId); // идентификатор таймера

//     clearTimeout(timerId);
//     alert(timerId); // тот же идентификатор (не принимает значение null после отмены)

    //setinterval
    // повторить с интервалом 2 секунды
    let timerId = setInterval(() => alert('tick'), 2000);

    // остановить вывод через 5 секунд
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);