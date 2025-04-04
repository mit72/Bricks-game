function drawIt() {
    var x = 150;
    var y = 150;
    var speed = 1;
    var dx = 2 * speed;
    var dy = 4 * speed;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var ctx;
    var canvas;
    var paddlex;
    var paddleh;
    var paddlew;
    let intervalId;
    var checkEndVar = false;
    var rightDown = false;
    var leftDown = false;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
    var paddlecolor = "#000000";
    var ballcolor = "blue";



    function draw() {
        //end game check
        if (checkEndVar) {
            clearInterval(drawIt);
            return;
        }

        clear();
        checkBricks();
        circle(x, y, 10);

        //paddle
        ctx.fillStyle = paddlecolor;
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        if (WIDTH - paddlew > paddlex && rightDown) paddlex += 5;
        else if (leftDown && 0 < paddlex) paddlex -= 5;

        //bricks
        for (i = 0; i < NROWS; i++) {
            ctx.fillStyle = rowcolors[i]; //barvanje vrstic
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        //za pravilno oddbijanje
        rowheight = (BRICKHEIGHT + PADDING) + r / 2;
        colwidth = (BRICKWIDTH + PADDING) + r / 2;

        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);

        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy; bricks[row][col] = 0;
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
        return intervalId = setInterval(draw, 10);
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.fillStyle = ballcolor;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(x, y, r-2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(x, y, r-4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(x, y, r-6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, y, r-8, 0, Math.PI * 2, true);
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
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 110;
    }

    function initbricks() {
        NROWS = 5;
        NCOLS = 3;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 15;
        PADDING = 10;
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
        }
    }

    function drawWin() {
        ctx.fillStyle = "lime";
        ctx.font = "1000 100px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    }


    init();
    init_paddle();
    initbricks();



}