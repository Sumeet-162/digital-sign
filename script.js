// const colorPicker=document.getElementById("colorPicker")
// const backColor = document.getElementById("backColor")
// const canvas = document.getElementById("myCanvas")
// const fontSize = document.getElementById("fontSize") 
// const clearButton=document.getElementById("clear")
// const saveButton = document.getElementById("save")
// const retrieveButton=document.getElementById("retrieve")
// const ctx = canvas.getContext('2d')

// colorPicker.addEventListener('change',(e)=>{
//   ctx.strokeStyle = e.target.value
//   ctx.fillStyle = e.target.value
// })

// canvas.addEventListener('mousedown',(e)=>{
//   isDrawing = true
//   lastX = e.offsetX
//   lastY = e.offsetY
// })

// canvas.addEventListener('mousemove',(e)=>{
//   if(isDrawing){
//     ctx.beginPath()
//     ctx.moveTo(lastX,lastY)
//     ctx.lineTo(e.offsetX,e.offsetY)
//     ctx.stroke()

//     lastX = e.offsetX
//     lastY = e.offsetY
//   }
// })

// canvas.addEventListener('mouseup',()=>{
//   isDrawing=false
// })

// backColor.addEventListener('change',(e)=>{
//   ctx.fillStyle = e.target.value
//   ctx.fillRect(0,0,canvas.width,canvas.height)
// })

// fontSize.addEventListener('change',(e)=>{
//   ctx.lineWidth = e.target.value
// })

// clearButton.addEventListener('click',()=>{
//   ctx.clearRect(0,0,canvas.width,canvas.height)
// })

// saveButton.addEventListener('click',()=>{
//   localStorage.setItem('canvasContents',canvas.toDataURL())

//   let link = document.createElement('a')

//   link.download = 'my-canvas.png'

//   link.href = canvas.toDataURL()

//   link.click();
// })

// retrieveButton.addEventListener('click',()=>{
//   let savedCanvas = localStorage.getItem('canvasContents')

//   if(savedCanvas){
//     let img = new Image()
//     img.src=savedCanvas
//     ctx.drawImage(img,0,0,)
//   }
// })

// const colorPicker=document.getElementById("colorPicker")
// const backColor = document.getElementById("backColor")
// const canvas = document.getElementById("myCanvas")
// const fontSize = document.getElementById("fontSize") 
// const clearButton=document.getElementById("clear")
// const saveButton = document.getElementById("save")
// const retrieveButton=document.getElementById("retrieve")
// const ctx = canvas.getContext('2d')

// colorPicker.addEventListener('change',(e)=>{
//   ctx.strokeStyle = e.target.value
//   ctx.fillStyle = e.target.value
// })

// canvas.addEventListener('mousedown',(e)=>{
//   isDrawing = true
//   lastX = e.offsetX
//   lastY = e.offsetY
// })

// canvas.addEventListener('mousemove',(e)=>{
//   if(isDrawing){
//     ctx.beginPath()
//     ctx.moveTo(lastX,lastY)
//     ctx.lineTo(e.offsetX,e.offsetY)
//     ctx.stroke()

//     lastX = e.offsetX
//     lastY = e.offsetY
//   }
// })

// canvas.addEventListener('mouseup',()=>{
//   isDrawing=false
// })

// backColor.addEventListener('change',(e)=>{
//   ctx.fillStyle = e.target.value
//   ctx.fillRect(0,0,canvas.width,canvas.height)
// })

// fontSize.addEventListener('change',(e)=>{
//   ctx.lineWidth = e.target.value
// })

// clearButton.addEventListener('click',()=>{
//   ctx.clearRect(0,0,canvas.width,canvas.height)
// })

// saveButton.addEventListener('click',()=>{
//   localStorage.setItem('canvasContents',canvas.toDataURL())

//   let link = document.createElement('a')

//   link.download = 'my-canvas.png'

//   link.href = canvas.toDataURL()

//   link.click();
// })

// retrieveButton.addEventListener('click',()=>{
//   let savedCanvas = localStorage.getItem('canvasContents')

//   if(savedCanvas){
//     let img = new Image()
//     img.src=savedCanvas
//     ctx.drawImage(img,0,0,)
//   }
// })

const colorPicker = document.getElementById("colorPicker");
const backColor = document.getElementById("backColor");
const canvas = document.getElementById("myCanvas");
const fontSize = document.getElementById("fontSize");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const retrieveButton = document.getElementById("retrieve");
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set color for stroke and fill
colorPicker.addEventListener('change', (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

// Function to get mouse/touch position
const getPosition = (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  return { x, y };
};

// Start drawing
const startDrawing = (e) => {
  isDrawing = true;
  const { x, y } = getPosition(e);
  lastX = x;
  lastY = y;
};

// Draw on the canvas
const draw = (e) => {
  if (!isDrawing) return;
  const { x, y } = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x;
  lastY = y;
};

// Stop drawing
const stopDrawing = () => {
  isDrawing = false;
};

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing); // Stop drawing when mouse leaves canvas

// Touch events
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent scrolling
  startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling
  draw(e);
});
canvas.addEventListener('touchend', stopDrawing);

// Background color change
backColor.addEventListener('change', (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Font size change
fontSize.addEventListener('change', (e) => {
  ctx.lineWidth = e.target.value;
});

// Clear canvas
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save canvas
saveButton.addEventListener('click', () => {
  const dataURL = canvas.toDataURL();
  localStorage.setItem('canvasContents', dataURL);

  const link = document.createElement('a');
  link.download = 'my-canvas.png';
  link.href = dataURL;
  link.click();
});

// Retrieve canvas
retrieveButton.addEventListener('click', () => {
  const savedCanvas = localStorage.getItem('canvasContents');
  if (savedCanvas) {
    const img = new Image();
    img.src = savedCanvas;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
});
