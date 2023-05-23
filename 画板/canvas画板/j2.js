var yyy = document.getElementById('xxx');//访问
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToMouse(yyy)
//橡皮擦 
//橡皮擦和画笔切换

/*画笔，橡皮擦切换按钮
if(eraserEnabled){
    eraser.textContent='画笔'
}else{
    eraser.textContent='橡皮擦'
}*/

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}
//自动设置
function autoSetCanvasSize(canvas) {
    setCanvasSize()
    //用户改变画布大小自动刷新
    window.onresize = function () {
        setCanvasSize()
    }
    //将画布大小设置为浏览器大小
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
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
function listenToMouse(canvas) {
    var using = false//是否再用橡皮擦
    var lastPoint = { x: undefined, y: undefined }
//特性检测
    if (document.body.ontouchstart !== undefined) {//触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x , y , 10, 10)
            } else {
                lastPoint = { x: x, y: y }
            }
        }
        
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x , y , 10, 10)
            }
            else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {//非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x , y , 10, 10)
            } else {
                lastPoint = { x: x, y: y }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x , y , 10, 10)
            }
            else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}
