const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jdMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);

let painting = false;
let filling = false;

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
  if (!painting) { // 페인팅하고있지 않으면
    //console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else { // 페인팅 하고있으면
    //console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    //ctx.closePath(); 
    //->패스를 종료시켜서 시작지점에서 이동지점으로 계속 직선이 그려짐
  }
}
// clientX, clientY는 윈도우 스크린 전체 범위  
// offsetX, offsetY는 캔버스 범위

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  //console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() { //왜 event 안넣지
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
    //ctx.fillStyle = ctx.strokeStyle;
    //이것보다 handleColorClick에 추가하는게 더 좋다.
  }
}

function handleCanvasClick() { // 이것도 event신경쓸 필요 없다고함...
  if (filling) { //fill일때만 적용되도록 함.
    ctx.fillRect(0, 0, canvas.width, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); //이벤트 발생 안하게 함
}

function handleSaveClick() {
  const image = canvas.toDataURL();//("image/jpeg") 지우면 defaul png로 저장됨
  const link = document.createElement("a"); //앵커 태그를 만든다.
  link.href = image; // 이미지 주소
  link.download = "PaintJS[🎨]"; // 다운로드 이름
  console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스가 요소 위에서 움직일 때
  canvas.addEventListener("mousedown", startPainting); //마우스 클릭하고 누르고있으면 발생
  canvas.addEventListener("mouseup", stopPainting); //마우스 떼면 발생 
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스 벗어나면 발생
  canvas.addEventListener("click", handleCanvasClick); // 캔버스 클릭시 
  canvas.addEventListener("contextmenu", handleCM);
}

//컬러는 array에 있으니까 없을 수가 없어서 if문에 넣을 필요가 없다.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);
//console.log(Array.from(colors));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}