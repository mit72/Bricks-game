function countDown() {
    setTimeout(drawIt, 3000);

}


function drawIt() {
    var x = 550;
    var y = 550;
    var speed = 2;
    var dx = 2 * speed;
    var dy = (-4) * speed;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var ctx;
    var canvas;
    var paddlex;
    var paddleh;
    var paddlew;
    var checkEndVar = false;
    var rightDown = false;
    var leftDown = false;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    //var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
    var paddlecolor = "#000000";
    //var ballcolor = "blue";
    var baget = new Image();
    baget.src = "img/bageta.png";
    var wood = new Image();
    wood.src = "img/wood.png";
    var tocke;
    var padltock;


    function draw() {
        //end game check
        if (checkEndVar) {
            clearInterval(draw);
            return;
        }

        clear();
        checkBricks();
        circle(x, y, 10);
        

        //paddle
        ctx.fillStyle = paddlecolor;
        ctx.drawImage(wood, paddlex, HEIGHT - paddleh, paddlew, paddleh);
        let x1 = paddlex + paddlew/2;
        let y1 = HEIGHT - paddleh + 3;
        drawLine(x, y, x1, y1);

        if (WIDTH - paddlew > paddlex && rightDown) paddlex += 5;
        else if (leftDown && 0 < paddlex) paddlex -= 5;

        //bricks
        for (i = 0; i < NROWS; i++) {
            //barvanje vrstic
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    ctx.drawImage(baget, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        //za pravilno oddbijanje
        rowheight = (BRICKHEIGHT + PADDING);
        colwidth = (BRICKWIDTH + PADDING);

        row = Math.floor(y / rowheight + PADDING);
        col = Math.floor(x / colwidth + PADDING);

        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy; bricks[row][col] = 0;
            tocke += 1;
            $("#tocke").html(tocke);
        }

        //bounce
        if (x + dx > WIDTH - r || x + dx < r)
            dx = -dx;
        if (y + dy < 0 + r)
            dy = -dy;

        //bounce paddle
        else if (x > paddlex && x < paddlex + paddlew && y > canvas.height - paddleh - r) {
            dy = -dy;
            dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            console.log("hit on paddle");
            padltock++;
        } else if (!(x > paddlex && x < paddlex + paddlew) && y > canvas.height - r) {
            checkEndVar = true;
            drawGameOver();
        }
        x += dx;
        y += dy;
    }

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        tocke = 0;
        padltock = 0;
        $("#tocke").html(tocke);
        return intervalId = setInterval(draw, 10);
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();



    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }


    function init_paddle() {
        paddlew = 150;
        paddlex = (WIDTH / 2) /*- paddlew/2*/;
        paddleh = 20;
    }

    function initbricks() {
        NROWS = 1;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 32;
        PADDING = 0;
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
    }

    function drawGameOver() {
        ctx.fillStyle = "red";
        ctx.font = "1000 100px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        //fix this
        ctx.font = "1000 50px Arial";
        let gg = Math.floor(tocke/padltock*1000)
        ctx.fillText("Score: " + gg , canvas.width / 2, (canvas.height / 2 ) + 100);
    }

    //vlecenje z misko
    var dragging = false;
    document.addEventListener("mousedown", function (e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        var relativeY = e.clientY - canvas.offsetTop;
        if (relativeX > paddlex && relativeX < paddlex + paddlew && relativeY > canvas.height - paddleh) {
            dragging = true;
        }
    });

    document.addEventListener("mouseup", function () {
        dragging = false;
    });

    document.addEventListener("mousemove", function (e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        var relativeY = e.clientY - canvas.offsetTop;

        if (relativeX > paddlex && relativeX < paddlex + paddlew && relativeY > canvas.height - paddleh) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }

        if (dragging) {
            if (relativeX > 0 && relativeX < canvas.width) {
                paddlex = relativeX - paddlew / 2;
            }
        }
    });

    //tipkovnica
    function onKeyDown(evt) {
        if (evt.keyCode == 39)
            rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 39)
            rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function checkBricks() {
        let g = 0;

        for (let i = 0; i < bricks.length; i++) {
            for (let j = 0; j < bricks[i].length; j++) {
                if (bricks[i][j] == 0) {
                    g++;
                }
            }
        }
        if (g == i * j) {
            checkEndVar = true;
            drawWin();
            ctx.font = "1000 50px Arial";
            let gg = Math.floor(tocke/padltock*1000)
            ctx.fillText("Score: " + gg , canvas.width / 2, (canvas.height / 2 ) + 100);
        }
    }

    function drawWin() {
        ctx.fillStyle = "lime";
        ctx.font = "1000 100px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    }

    function drawLine(x, y , x1, y1){
        ctx.fillStyle = "lime";
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();
    }


    init();
    init_paddle();
    initbricks();


}