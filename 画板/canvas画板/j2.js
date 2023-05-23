var yyy = document.getElementById('xxx');//访问


xxx()
//用户改变画布大小自动刷新
window.onresize = function () {
    xxx()
}
//将画布大小设置为浏览器大小
function xxx(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    yyy.width = pageWidth
    yyy.heigth = pageHeight
}
/////////////////////////////
var context = yyy.getContext('2d');

var using = false//是否再用橡皮擦
var lastPoint = { x: undefined, y: undefined }

yyy.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
   if (eraserEnabled){
    using=true
    context.clearRect(x-5,y-5,10,10)
   }else{
    using = true
    
    lastPoint = { x: x, y: y }
   }
}


yyy.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY

    if (eraserEnabled){
        if(using){
            context.clearRect(x-5,y-5,10,10)
        }
        
    }else{
        if (using) {
           
            var newPoint = { "x": x, "y": y }
           
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    
}


yyy.onmouseup = function (aaa) {
    using = false
}
function drawCircle(x, y, radious) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radious, 0, Math.PI * 2);
    context.fill()
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
//************橡皮擦 */
var eraserEnabled=false
eraser.onclick=function(){
    eraserEnabled=!eraserEnabled
}