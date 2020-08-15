var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

var snake = [
    [3, 2],
    [2, 2],
]
var food = [9,9]
var direction = 'right'
var lastDirection = direction

var blockWidth = canvas.width/10
var blockHeight = canvas.height/10

function blockCoordsToPixels(blockCoords){
    return [
        blockWidth*(blockCoords[0]-1),
        blockHeight*(blockCoords[1]-1)
    ]    
}
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
} 
function drawSnake (){
    snake.forEach(function(blockCoords,index){
        var coordsInPixels = blockCoordsToPixels(blockCoords)
        
        if (index==0){
            ctx.fillStyle = '#00BFF5'
        } else {
            ctx.fillStyle ='#000000'
        }
        
        ctx.fillRect(coordsInPixels[0],coordsInPixels[1],blockWidth,blockHeight )
    })  
}
function drawFood (){
    var coordsInPixels = blockCoordsToPixels(food)
    ctx.fillStyle = 'red'
    ctx.fillRect(coordsInPixels[0],coordsInPixels[1],blockWidth,blockHeight )
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
function checkSamePosition(a, b) {
    return a[0] == b[0] && a[1] == b[1]
}
function moveFood() {
    var newPosition
    var newPositionIsInSnake = false
    do {
        newPosition = [
            randomInteger(1,10),
            randomInteger(1,10)
        ]

        isNewPositionInSnake = snake.some(function(blockCoords){
            return checkSamePosition(newPosition, blockCoords)
        })
    } while (newPositionIsInSnake)

    food = newPosition
}
function moveSnake(){
    var newHead = snake[0].slice()
   
    if(direction=='left'){
        newHead[0] = newHead[0] - 1
    }
    if(direction=='up'){
        newHead[1] = newHead[1] - 1
    }
    if(direction=='down'){
        newHead[1] = newHead[1] + 1
    }
    if(direction=='right'){
        newHead[0] = newHead[0] + 1
    }

    snake.unshift(newHead)

    if (checkSamePosition(newHead, food)){
       moveFood()
    } else {
       snake.pop()
    }
}
function checkGameOver(){
    var isHeadInBody = snake.some(function(blockCoords,index){
        if (blockCoords==snake[0]) {
            return false
        }

        return checkSamePosition(snake[0], blockCoords)
    })
    if(snake[0][0] == 0 || snake[0][0]==11 || snake[0][1]==0 || snake[0][1]==11 || isHeadInBody){
        alert('game over')
    }
}
function draw(){
    clearCanvas()
    drawSnake()
    drawFood()
}
function step (){
    moveSnake()
    checkGameOver()
    draw()
    lastDirection = direction
}

draw()

document.addEventListener('keydown', function(event){
    if (event.code=="Space"){
       step()
    }
    
    
    
    if (lastDirection=='down' || lastDirection=='up'){
        if (event.code=="ArrowLeft"){
            direction='left'
        }
    
        if (event.code=="ArrowRight"){
            direction='right'
        }
    }
    if (lastDirection=='left' || lastDirection=='right'){
        if (event.code=="ArrowDown"){
            direction='down'
        }
    
        if (event.code=="ArrowUp"){
            direction='up'
        }
    }

})
var topButton = document.getElementsByClassName("top")[0]
var leftButton = document.getElementsByClassName("left")[0]
var rightButton = document.getElementsByClassName("right")[0]
var downButton = document.getElementsByClassName("down")[0]

topButton.addEventListener('click',function(){
    if (direction=='left' || direction=='right'){
      direction='up'
  }
})
leftButton.addEventListener('click',function(){
    if (direction=='up' || direction=='down'){
      direction='left'
  }
 })
 rightButton.addEventListener('click',function(){
    if (direction=='up' || direction=='down'){
        direction='right'
    }
 })
 downButton.addEventListener('click',function(){
    if (direction=='left' || direction=='right'){
        direction='down'
    }
 })
 var moveButton = document.getElementsByClassName("move")[0]
 moveButton.addEventListener('click', step)