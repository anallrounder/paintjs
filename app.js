const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//마우스가 캔버스 안에 들어갔을때 움직임을 포착해서 x,y좌표를 반환하도록 설정함
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
// clientX, clientY는 윈도우 스크린 전체 범위  
// offsetX, offsetY는 캔버스 범위

function onMouseDown(event) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스가 요소 위에서 움직일 때
  canvas.addEventListener("mousedown", startPainting); //마우스 클릭시 발생
  canvas.addEventListener("mouseup", stopPainting); //마우스 떼면 발생 
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스 벗어나면 발생
}
/*
  이제 onMouseMove만 잘 신경쓰면 된다.
  왜냐하면 여기서 모든 움직임을 감지하고 라인을 만들기 때문
*/