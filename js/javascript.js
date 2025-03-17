/*hard = paddle width 75, speed 7
    meduim = width 110, speed 6
    easy = width 125, speed 5
    
    */ 

document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    //spreminjaj za hitrost
    var speed = 6;
    var dx = speed;
    var dy = -speed;
    var ballColor = "#0095DD"

    var ballRadius = 10;

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor; //"#0095DD"
        ctx.fill();
        ctx.closePath();
    }



    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        x += dx;
        y += dy;

        //da se odbije pr robu
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
    }

    
    setInterval(draw, 10);
    
    var paddleHeight = 10;
    var paddleWidth = 110;
    var paddleX = (canvas.width-paddleWidth)/2;
    
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    
    var rightPressed = false;
    var leftPressed = false;
    
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
            if(canvas.width - paddleWidth > paddleX)
            paddleX = paddleX + 15;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
            if(0 < paddleX)
            paddleX = paddleX - 15;
        }
    }
    
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
            console.log(paddleX);
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
            console.log(paddleX);
        }
    }
        
        setInterval(drawPaddle,10);
        


});

/*
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

drawBricks();*/


