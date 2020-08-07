var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

var clicked = false
canvas.addEventListener('click',function(event){
    var y = event.y-10
    var x = event.x-10
    if(clicked){
        ctx.lineTo(x, y)
        ctx.stroke()
    }else{
        ctx.moveTo(x, y) 
         
    }
    clicked = !clicked
}) 
canvas.addEventListener('mousemove',function(event){
    console.log(event)

    var y = event.y-10
    var x = event.x-10
    
    if(clicked){
        ctx.lineTo(x, y)
        ctx.stroke()
    }
})
document.getElementById('clear').addEventListener('click',function(){
    var inputs = document.getElementsByTagName('input')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    console.log(inputs)
    ctx.beginPath()

})