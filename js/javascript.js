document.addEventListener('DOMContentLoaded', function (){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var speed = 8;
    var dx = speed;
    var dy = -speed;
    var checkEnd;

    var ballColor = "red";
    var ballRadius = 10;

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor; //"#0095DD"
        ctx.fill();
        ctx.closePath();
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        

        if(x > paddleX && x < paddleX + paddleWidth && y > canvas.height - paddleHeight - ballRadius){
            dy = -dy;
            console.log("hit on paddle");
        } else if(!(x > paddleX && x < paddleX + paddleWidth) && y > canvas.height - ballRadius){
            alert("GAME OVER");
            document.location.reload();
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
        
        setInterval(drawPaddle,10);
        
    //vlecenje z misko
    var dragging;
    document.addEventListener("mousedown", function(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        var relativeY = e.clientY - canvas.offsetTop;
        if (relativeX > paddleX&& relativeX < paddleX + paddleWidth && relativeY > canvas.height - paddleHeight) {
            dragging = true;
        }
    });
    
    document.addEventListener("mouseup", function() {
        dragging = false;
    });

    document.addEventListener("mousemove", function(e) {
        if (dragging) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }
    });

    function checkEnd(){
        if(checkEnd){

        }
        requestAnimationFrame(checkEnd);
    }
    checkEnd();
});