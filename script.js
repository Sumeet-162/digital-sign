const colorPicker=document.getElementById("colorPicker")
const backColor = document.getElementById("backColor")
const canvas = document.getElementById("myCanvas")
const fontSize = document.getElementById("fontSize") 
const clearButton=document.getElementById("clear")
const saveButton = document.getElementById("save")
const retrieveButton=document.getElementById("retrieve")
const ctx = canvas.getContext('2d')

colorPicker.addEventListener('change',(e)=>{
  ctx.strokeStyle = e.target.value
  ctx.fillStyle = e.target.value
})

canvas.addEventListener('mousedown',(e)=>{
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})

canvas.addEventListener('mousemove',(e)=>{
  if(isDrawing){
    ctx.beginPath()
    ctx.moveTo(lastX,lastY)
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.stroke()

    lastX = e.offsetX
    lastY = e.offsetY
  }
})

canvas.addEventListener('mouseup',()=>{
  isDrawing=false
})

backColor.addEventListener('change',(e)=>{
  ctx.fillStyle = e.target.value
  ctx.fillRect(0,0,canvas.width,canvas.height)
})

fontSize.addEventListener('change',(e)=>{
  ctx.lineWidth = e.target.value
})

clearButton.addEventListener('click',()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height)
})

saveButton.addEventListener('click',()=>{
  localStorage.setItem('canvasContents',canvas.toDataURL())

  let link = document.createElement('a')

  link.download = 'my-canvas.png'

  link.href = canvas.toDataURL()

  link.click();
})

retrieveButton.addEventListener('click',()=>{
  let savedCanvas = localStorage.getItem('canvasContents')

  if(savedCanvas){
    let img = new Image()
    img.src=savedCanvas
    ctx.drawImage(img,0,0,)
  }
})