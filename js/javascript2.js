function drawIt() {
    var x = 150;
    var y = 150;
    var dx = 2;
    var dy = 4;
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


    function draw() {

        if (checkEndVar) {
            clearInterval(drawIt);
            return;
        }

        clear();
        circle(x, y, 10);

        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);


        if (x + dx > WIDTH - r || x + dx <  r)
            dx = -dx;
        if (y + dy < 0 + r)
            dy = -dy;
        else if (x > paddlex && x < paddlex + paddlew && y > canvas.height - paddleh - r) {
            dy = -dy ;
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
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 110;
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

    init();
    init_paddle();
    


}