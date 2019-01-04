let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// DARK-MODE BABY HELL YEAH !   LOOK AT ctx.strokeStyle and ctx.fillStyle THROUGHOUT THE CODE.
canvas.style.backgroundColor = "black";

function resize(w, h) {
    canvas.width = w;
    canvas.height = h;
}

let nw = 7;

window.onload = () => {
    resize(window.innerWidth, window.innerHeight);

    // NO NEED TO ASK FOR NW ------------------------ (FOR ME)
    nw = prompt("Enter the number of terms: ", 1);
    if (nw < 1) {
        nw = 1;
    }
    // ----------------------------------------------
}

window.onresize = () => {
    resize(window.innerWidth, window.innerHeight);
}

/** --------------------------------------------------------------------------------------- */

let fpsInterval, startTime, now, then, elapsed;

/**
 * This is the starting point for animations to begin.
 * @param {*} fps Frames per second.
 */
function startAnimation(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

/**
 * Animations
 */
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)

        // Draw and update here
        draw();
    }
}

/** ------------------------------------------------------------------------------------- */

/**
 * A function for drawing circles.
 * @param {int} x Abscissa of the circle
 * @param {int} y Ordinate of the circle
 * @param {int} r Radius of the circle
 * @param {int} lineWidth By default 0 and fills the circle
 */
function circle(x, y, r, lineWidth = 0) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (lineWidth == undefined || lineWidth == 0) {
        ctx.fill();
    } else {
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
    ctx.closePath();
}

/**
 * A function for drawing a line.
 * @param {*} x1 Abscissa of the beginnning of the line.
 * @param {*} y1 Ordiante of the beginning of the line.
 * @param {*} x2 Abscissa of the end of the line.
 * @param {*} y2 Ordinate of the end of the line.
 * @param {*} lineWidth Width of the line. If lineWidth is undefined
 *                      the lineWidth will be the the default lineWidth
 *                      otherwise the lineWidth in the parameter will be
 *                      used.
 */
function line(x1, y1, x2, y2, lineWidth) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    if (lineWidth == undefined) {
        ctx.lineWidth = lineWidth;
    }
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws a point on the cavas.
 * @param {*} x The abscissa of the point.
 * @param {*} y The ordinate of the point.
 * @param {*} radius The radius of the point... if undefined, its
 *                   default value i.e, 2 will be used.
 */
// THIS POINT FUNCTION LOOKS BIT SQUARE SO I CHANGED FUNCTIONALITY ----------------
function point(x, y, radius) {
    if (radius == undefined || radius == NaN) {
        // ctx.fillRect(x, y, 1, 1);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.moveTo(x - 2, y - 2);
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
    } else {
        // ctx.fillRect(x, y, radius, radius);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.moveTo(x - radius, y - radius);
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}

/** -------------------------------------------------------------------------------------------- */


let r = 60;
let theta = 0;
let points = [];
let animation_speed = 3;        // INCREASING MORE THAN 5 MAY CAUSE WEIRDNESS IN GRAPH.

/**
 * Do the drawing inside the following function.
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    generic(nw);

}

function generic(n) {
    let x = window.innerWidth / 4;
    let y = window.innerHeight / 2;

    point(x, y, 3);

    for (i = 0; i < n; i++) {

        let newradius = r * (4 / (((2 * i) + 1) * Math.PI));

        let prevx = x;
        let prevy = y;


        // Abscissa of the amplitude.
        let xamp = newradius * Math.cos(theta * ((2 * i) + 1));

        // Ordinate of the amplitude.
        let yamp = newradius * Math.sin(theta * ((2 * i) + 1));

        x += xamp;
        y += yamp;


        circle(prevx, prevy, newradius, 1);

        line(prevx, prevy, x, y);

        point(x, y, 2);
    }

    points.unshift(y);

    // THIS INCREMENT CHANGES THE ANIMATION SPEED ------ I'MEAN OF COURSE, WHY NOT !
    theta += 0.01 * animation_speed;
    // SO ANIMATION STUFF IS FOR YOU TO MAKE........................................
    // -----------------------------------------------------------------------------

    // Draw the wave.
    let ax = window.innerWidth / 2;

    // DRAWING OF POINTS CHANGED BY DRAWING OF PATH SO THAT HOW FAR TWO POINTS CAN BE PLACED ALWAYS HAVE A LINE BETWEEN THEM.
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(ax, points[0]);
    for (i = 0; i < points.length; i++) {
        ctx.lineTo(ax, points[i]);
        ax += 0.3 * animation_speed;
    }
    ctx.stroke();

    // If length of points exceeds 1300, pop the extra points. (NOPE! IT'S COMPLICATED NOW)=================================
    if (points.length > (1 / animation_speed) * 1500) {
        points.pop();
    }

    line(x, y, window.innerWidth / 2, points[0]);
}

// INCREASE THE ANIMATION SPEED -----------
// startAnimation(60);
startAnimation(180);            // FUUUUCK THIS DID NOT WORK.
// ---------------------------------------- THIS NEED TO BE WORKED OUT ! WITH theta ! THAT'S A WAY. MAYBE.