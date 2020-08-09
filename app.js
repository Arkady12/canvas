var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');
var snake =[
    [3, 2],
    [2, 2],
]

var blockWidth = canvas.width/10
var blockHeight = canvas.height/10

function blockCoordsToPixels(blockCoords){
    return [
        blockWidth*(blockCoords[0]-1),
        blockHeight*(blockCoords[1]-1)
    ]    
}


snake.forEach(function(blockCoords,index){
    var coordsInPixels = blockCoordsToPixels(blockCoords)
    
    if (index==0){
        ctx.fillStyle = '#00BFF5'
    } else {
        ctx.fillStyle ='#000000'
    }

    ctx.fillRect(coordsInPixels[0],coordsInPixels[1],blockWidth,blockHeight )
})
document.addEventListener('keydown',function(event){
    
    if(event.code=="Space"){
        console.log(event)
    }
})