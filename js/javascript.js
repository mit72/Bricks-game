document.addEventListener('DOMContentLoaded', function (){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var speed = 1.8;
    var rand = Math.random()*2;
    var dx = speed;
    var dy = -speed;
    var checkEndVar = false;

    var ballColor = "red";
    var ballRadius = 10;

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor; //"#0095DD"
        ctx.fill();
        ctx.closePath();
    }

    let gameInterval = setInterval(draw, 1);

    function draw(){

        if (checkEndVar) {
            clearInterval(gameInterval); 
            return; 
        }

        dy = speed * Math.sign(dy);
        dx = speed * Math.sign(dx);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawBricks();
        drawPaddle();

        if(x > paddleX && x < paddleX + paddleWidth && y > canvas.height - paddleHeight - ballRadius){
            dy = -(dy+rand);
            console.log("hit on paddle");
        } else if(!(x > paddleX && x < paddleX + paddleWidth) && y > canvas.height - ballRadius){
            
            checkEndVar = true;
            drawGameOver();
        }

        if(x > canvas.width - ballRadius || x < ballRadius){
            dx = -dx;
        }
        if(y > canvas.height - ballRadius || y < ballRadius){
            dy = -dy;
        }
        x = x + dx;
        y = y + dy;

    }

    function drawGameOver() {
        ctx.fillStyle = "red";
        ctx.font = "1000 100px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }










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
            
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
            
        }
    }
        
        
        
    //vlecenje z misko
    var dragging = false;
    document.addEventListener("mousedown", function(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        var relativeY = e.clientY - canvas.offsetTop;
        if (relativeX > paddleX && relativeX < paddleX + paddleWidth && relativeY > canvas.height - paddleHeight) {
            dragging = true;
        }
    });

    document.addEventListener("mouseup", function() {
        dragging = false;
    });

    document.addEventListener("mousemove", function(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        var relativeY = e.clientY - canvas.offsetTop;

        if (relativeX > paddleX && relativeX < paddleX + paddleWidth && relativeY > canvas.height - paddleHeight) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }

        if (dragging) {
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }
    });





var brickRowCount = 3;
var brickColumnCount = 11;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;



var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r] = { x: brickX, y: brickY };
    }
}


function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}






    function checkEnd(){
        if(checkEnd){

        }
        requestAnimationFrame(checkEnd);
    }
    checkEnd();
});