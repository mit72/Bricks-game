let intervalId;
let isPaused = false;
function drawIt() {
    let isPaused = false;
    document.getElementById('start').disabled = true;
    document.getElementById('pause').disabled = false;
    let x = 550;
    let y = 500;
    let speed = 1;
    let dx = 0.1 * speed;
    let dy = -4 * speed;
    let r = 15;
    let WIDTH, HEIGHT;
    let ctx, canvas;
    let paddlex, paddleh, paddlew;
    let checkEndVar = false;
    let rightDown = false;
    let leftDown = false;
    let bricks, NROWS, NCOLS, BRICKWIDTH, BRICKHEIGHT, PADDING;
    let tocke, padltock;


    const ballImage = new Image();
    ballImage.src = "img/hook.png";

    const bagete = [];
    for (let i = 1; i <= 3; i++) {
        let img = new Image();
        img.src = `img/riba${i}.png`;
        bagete.push(img);
    }

    const wood = new Image();
    wood.src = "img/boat1.png";

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        WIDTH = canvas.width;
        HEIGHT = canvas.height;
        tocke = 0;
        padltock = 0;
        $("#tocke").html(tocke);
        intervalId = setInterval(draw, 10);
    }

    function initPaddle() {
        paddlew = 84;
        paddlex = (WIDTH - paddlew) / 2;
        paddleh = 50;
    }

    function initBricks() {
        NROWS = 3;
        NCOLS = 11;
        PADDING = 5;
        BRICKWIDTH = (WIDTH - (NCOLS + 1) * PADDING) / NCOLS;
        BRICKHEIGHT = (HEIGHT / 4 - (NROWS + 1) * PADDING) / NROWS;
        bricks = new Array(NROWS);
        for (let i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (let j = 0; j < NCOLS; j++) {
                bricks[i][j] = bagete[Math.floor(Math.random() * bagete.length)];
            }
        }
        $("#vse").html(NROWS*NCOLS);
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function drawLine(x, y, x1, y1) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();
    }

    function checkBricks() {
        let count = 0;
        for (let i = 0; i < NROWS; i++) {
            for (let j = 0; j < NCOLS; j++) {
                if (bricks[i][j] === null) count++;
            }
        }
        if (count === NROWS * NCOLS) {
            checkEndVar = true;
            document.getElementById('start').disabled = false;
            document.getElementById('pause').disabled = true;
            Swal.fire({
                title: 'YOU WIN!',
                text: 'You caught all the fish.',
                color: 'rgb(0, 92, 15)',
                icon: 'success',
                iconColor: 'rgb(0, 92, 15)',
                confirmButtonText: 'YAY',
                customClass: {
                    confirmButton: 'btn-sa',
                }
            });
        }
    }

    function draw() {
        if (checkEndVar) return;

        clear();
        checkBricks();
        ctx.drawImage(ballImage, x - r / 2, y - r / 2, r, r);
        //circle(x, y, r);

        //paddle
        ctx.drawImage(wood, paddlex, HEIGHT - paddleh, paddlew, paddleh);
        let x1 = paddlex + paddlew - 9;
        let y1 = HEIGHT - (paddleh / 2) + 9;
        drawLine(x, y + 8, x1, y1);

        if (rightDown && paddlex + paddlew < WIDTH) paddlex += 5;
        else if (leftDown && paddlex > 0) paddlex -= 5;

        //briks
        for (let i = 0; i < NROWS; i++) {
            for (let j = 0; j < NCOLS; j++) {
                if (bricks[i][j]) {
                    let brickX = (j * (BRICKWIDTH + PADDING)) + PADDING;
                    let brickY = (i * (BRICKHEIGHT + PADDING)) + PADDING;
                    ctx.drawImage(bricks[i][j], brickX, brickY, BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        let rowheight = BRICKHEIGHT + PADDING;
        let colwidth = BRICKWIDTH + PADDING;
        let row = Math.floor((y + dy) / rowheight);
        let col = Math.floor((x + dx) / colwidth);

        if (row >= 0 && row < NROWS && col >= 0 && col < NCOLS && bricks[row][col]) {
            dy = -dy;
            bricks[row][col] = null;
            tocke++;
            $("#tocke").html(tocke);
        }


        if (x + dx > WIDTH - r || x + dx < r) dx = -dx;
        if (y + dy < r) dy = -dy;

        //padle bounce
        if (y + dy > HEIGHT - paddleh - r && y + dy < HEIGHT - r) {
            if (x > paddlex && x < paddlex + paddlew) {
                dy = -dy;
                dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
                padltock++;
            }
            else if (x <= paddlex && x + r >= paddlex) {
                dx = -Math.abs(dx);
                dy = -dy;
                padltock++;
            }
            else if (x >= paddlex + paddlew && x - r <= paddlex + paddlew) {
                dx = Math.abs(dx);
                dy = -dy;
                padltock++;
            }
        }


        else if (y + dy > HEIGHT - r) {
            checkEndVar = true;
            document.getElementById('start').disabled = false;
            document.getElementById('pause').disabled = true;
            Swal.fire({
                title: 'YOU LOSE!',
                text: 'You faild to catch all fish.',
                color: 'rgb(0, 92, 15)',
                icon: 'error',
                iconColor: 'rgb(0, 92, 15)',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn-sa',
                }
            });
        }

        x += dx;
        y += dy;
    }

    //miska
    let dragging = false;

    document.addEventListener("mousedown", function (e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        let invertedX = WIDTH - relativeX;

        if (invertedX > paddlex && invertedX < paddlex + paddlew) {
            dragging = true;
        }
    });

    document.addEventListener("mouseup", function () {
        dragging = false;
    });

    document.addEventListener("mousemove", function (e) {
        if (dragging) {
            let relativeX = e.clientX - canvas.offsetLeft;
            let invertedX = WIDTH - relativeX;

            if (invertedX > 0 && invertedX < WIDTH) {
                paddlex = invertedX - paddlew / 2;
            }
        }
    });




    // Keyboard controls
    function onKeyDown(evt) {
        if (evt.keyCode == 37) rightDown = true;
        else if (evt.keyCode == 39) leftDown = true;
    }
    function onKeyUp(evt) {
        if (evt.keyCode == 37) rightDown = false;
        else if (evt.keyCode == 39) leftDown = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    $("#pause").click(function () {
        if (isPaused) {
            isPaused = false;
            $("#playPause").attr("src", "img/pause.png");
            intervalId = setInterval(draw, 10);
        } else {
            isPaused = true;
            $("#playPause").attr("src", "img/play.png");
            clearInterval(intervalId);
        }
    });

    // Start everything
    init();
    initPaddle();
    initBricks();
}

//sweet alert
document.addEventListener("DOMContentLoaded", function () {
    const asterisk = document.querySelector('.credits');

    asterisk.addEventListener('click', () => {

        Swal.fire({
            title: 'Author',
            text: 'Mitja Filej, 4.Rb',
            color: 'rgb(0, 92, 15)',
            icon: 'info',
            iconColor: 'rgb(0, 92, 15)',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn-sa',
            }
        });

    });
});