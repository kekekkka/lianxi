var yyy = document.getElementById('xxx');//访问
var context = yyy.getContext('2d');
var painting = false
var lastPoint = { x: undefined, y: undefined }
yyy.onmousedown = function (aaa) {
    painting = true
    var x = aaa.clientX
    var y = aaa.clientY
    lastPoint = { x: x, y: y }
    console.log(lastPoint)
    drawCircle(x, y, 1)
}
yyy.onmousemove = function (aaa) {
    if (painting) {
        var x = aaa.clientX
        var y = aaa.clientY
        var newPoint = { "x": x, "y": y }
        drawCircle(x, y, 1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
}
yyy.onmouseup = function (aaa) {
    painting = false
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