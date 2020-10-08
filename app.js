var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var pic = new Image();              // "Создаём" изображение
pic.src = 'snake.png';

var snake
var food
var direction
var lastDirection
var interval

var baseBlockSize = 20
var blockWidthCount = Math.round(window.innerWidth/baseBlockSize)
blockWidthCount = blockWidthCount < 30 ? blockWidthCount : 30  
var blockSize = Math.round(window.innerWidth/blockWidthCount)
var blockHeightCount = Math.round(window.innerHeight/blockSize) 
console.log(blockHeightCount)
function resetState(){
    snake = [
        [3, 2],
        [2, 2],
    ]
    food = [9,9]
    direction = 'right'
    lastDirection = direction
}

function blockCoordsToPixels(blockCoords){
    return [
        blockSize*(blockCoords[0]-1),
        blockSize*(blockCoords[1]-1)
    ]    
}
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
} 

function whereMoving (a, b) {
    if (a[0] < b[0]){
        return "right"
    }
    if (a[0] > b[0]) {
        return "left"
    }
    if (a[1] > b[1]) {
        return "up"
    }
    return "down"
}

function drawSnake (){
    snake.forEach(function(blockCoords,index){
        var coordsInPixels = blockCoordsToPixels(blockCoords)
        
        if (index==0){
            if(direction=='right'){
                ctx.drawImage(pic, 256, 0, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if(direction=='up'){
                ctx.drawImage(pic, 192, 0, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize); 
            }
            if(direction=='left'){
                ctx.drawImage(pic, 192, 64, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            
            }
            if(direction=='down'){
                ctx.drawImage(pic, 256, 64, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
        } else if(index==snake.length-1) {
            var pred = snake[index-1]
            var blockDirecttion = whereMoving(blockCoords, pred)
            if (blockDirecttion == "left"){
                ctx.drawImage(pic, 192, 192, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize); 
            }
            if (blockDirecttion == "right"){
                ctx.drawImage(pic, 256, 128, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (blockDirecttion == "up"){
                
                ctx.drawImage(pic, 192, 128, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (blockDirecttion == "down"){
                ctx.drawImage(pic, 256, 192, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }

        } else {
            var pred = snake[index-1]
            var next = snake[index+1]
            if (
                (
                    whereMoving(pred, blockCoords) == 'right' &&
                    whereMoving(next,blockCoords) == 'down'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'down' &&
                    whereMoving(next,blockCoords) == 'right'
                )
            ) 
            {
                ctx.drawImage(pic, 128, 128, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (
                (
                    whereMoving(pred, blockCoords) == 'up' &&
                    whereMoving(next,blockCoords) == 'right'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'right' &&
                    whereMoving(next,blockCoords) == 'up'
                )
            ) 
            {
                ctx.drawImage(pic, 128, 0, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (
                (
                    whereMoving(pred, blockCoords) == 'left' &&
                    whereMoving(next,blockCoords) == 'up'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'up' &&
                    whereMoving(next,blockCoords) == 'left'
                )
            ) 
            {
                ctx.drawImage(pic, 0, 0, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (
                (
                    whereMoving(pred, blockCoords) == 'down' &&
                    whereMoving(next,blockCoords) == 'left'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'left' &&
                    whereMoving(next,blockCoords) == 'down'
                )
            ) 
            {
                ctx.drawImage(pic, 0, 64, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (
                (
                    whereMoving(pred, blockCoords) == 'right' &&
                    whereMoving(next,blockCoords) == 'left'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'left' &&
                    whereMoving(next,blockCoords) == 'right'
                )
            ) 
            {
                ctx.drawImage(pic, 64, 0, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
            if (
                (
                    whereMoving(pred, blockCoords) == 'down' &&
                    whereMoving(next,blockCoords) == 'up'
                ) ||
                (
                    whereMoving(pred, blockCoords) == 'up' &&
                    whereMoving(next,blockCoords) == 'down'
                )
            ) 
            {
                ctx.drawImage(pic, 128, 64, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize);
            }
        }
    })  
}
function drawFood (){
    var coordsInPixels = blockCoordsToPixels(food)
    ctx.drawImage(pic, 0, 192, 64, 64, coordsInPixels[0],coordsInPixels[1], blockSize,blockSize); 
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
    var isNewPositionInSnake = false
    do {
        newPosition = [
            randomInteger(1,blockWidthCount),
            randomInteger(1,blockHeightCount)
        ]

        isNewPositionInSnake = snake.some(function(blockCoords){
            return checkSamePosition(newPosition, blockCoords)
        })
    } while (isNewPositionInSnake)

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
var menu = document.querySelector('.menu')
var startButton = document.querySelector('.start-button')
startButton.addEventListener('click',function(){
    startGame()
    menu.style.display = 'none'
    
})
function checkGameOver(){
    var isHeadInBody = snake.some(function(blockCoords,index){
        if (blockCoords==snake[0]) {
            return false
            
        }

        return checkSamePosition(snake[0], blockCoords)
    })
    if(snake[0][0] == 0 || snake[0][0]>blockWidthCount || snake[0][1]==0 || snake[0][1]>blockHeightCount || isHeadInBody){
        // alert('game over')
        resetState()
        clearInterval(interval)
        menu.style.display = 'block'

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
function startGame () {
    resetState()
    draw()
    interval = setInterval(step,100)
}

function tryToRotate (dir) {
    var graph = {
        left: ['up', 'down'],
        right: ['up', 'down'],
        up: ['left', 'right'],
        down: ['left', 'right'],
    }

    var availableDirections = graph[lastDirection]
    if(availableDirections.includes(dir)){
        direction = dir
    }
}

document.addEventListener('keydown', function(event){
    var directionMap = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowDown: "down",
        ArrowUp: "up",
    }

    tryToRotate(directionMap[event.code])
})
var topButton = document.getElementsByClassName("top")[0]
var leftButton = document.getElementsByClassName("left")[0]
var rightButton = document.getElementsByClassName("right")[0]
var downButton = document.getElementsByClassName("down")[0]

topButton.addEventListener('mousedown',function() {
    tryToRotate('up')
})
leftButton.addEventListener('mousedown',function(){
    tryToRotate('left')
})
 rightButton.addEventListener('mousedown',function(){
    tryToRotate('right')
})
 downButton.addEventListener('mousedown',function(){
    tryToRotate('down')
})

