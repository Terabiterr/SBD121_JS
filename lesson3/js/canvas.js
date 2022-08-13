// var canvas = document.getElementById("canvasId");
// var ctx = canvas.getContext("2d");

// ctx.fillStyle = "green";
// ctx.fillRect(10, 10, 100, 100);
// (function draw() {
//     const canvas = document.getElementById('canvasId');
//     if (canvas.getContext) {
//       const ctx = canvas.getContext('2d');

//       ctx.fillStyle = 'rgb(200, 0, 0)';
//       ctx.fillRect(10, 10, 50, 50);
//       ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
//       ctx.fillRect(30, 30, 50, 50);
//       ctx.fillStyle = 'rgba(0, 0, 150, 0.5)';
//       ctx.fillRect(50, 50, 50, 50);
//     }
//     else
//         alert('The canvas is unsupported in your browser!');
// })()

// (function draw() {
//     const canvas = document.getElementById('canvasId');
//     if (canvas.getContext) {
//       const ctx = canvas.getContext('2d');
  
//       ctx.fillRect(25, 25, 100, 100);
//       ctx.clearRect(45, 45, 60, 60);
//       ctx.strokeRect(50, 50, 50, 50);
//     }
// })()

// // Создание контрольных точек:
// (function draw() {
//     const canvas = document.getElementById('canvasId');
//     if (canvas.getContext) {
//       const ctx = canvas.getContext('2d');
//       // First path
//         ctx.beginPath();
//         ctx.strokeStyle = 'blue';
//         ctx.moveTo(20, 20);
//         ctx.lineTo(200, 20);
//         ctx.stroke();

//         // Second path
//         ctx.beginPath();
//         ctx.strokeStyle = 'green';
//         ctx.moveTo(20, 20);
//         ctx.lineTo(120, 120);
//         ctx.stroke();

//         //Third path
//         ctx.beginPath();
//         ctx.moveTo(75, 50);
//         ctx.lineTo(100, 75);
//         ctx.lineTo(100, 25);
//         ctx.fill();
//     }
// })()
// moveTo
(function draw() {
    const canvas = document.getElementById('canvasId');
    if (canvas.getContext) {
       const ctx = canvas.getContext('2d');
  
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
      ctx.moveTo(110, 75);
      ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
      ctx.moveTo(65, 65);
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
      ctx.moveTo(95, 65);
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
      ctx.stroke();
    }
  })()