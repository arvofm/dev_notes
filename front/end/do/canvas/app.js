/* When no width and height attributes are specified, the canvas will initially be 300 pixels wide and 150 pixels high. */
let canvas = document.getElementById("main-canvas");
/*--some 2d context attributes, see docs for more:
 *-desynchronized: reduce the latency by desynchronizing the canvas paint cycle from the event loop.
 *-willReadFrequently: A boolean value that indicates whether or not a lot of read-back operations
 * are planned. This will force the use of a software (instead of hardware accelerated) 2D canvas
 * and can save memory when calling getImageData() frequently. */

/* for drawing, ctx has the functions
fillRect(x, y, width, height)
    Draws a filled rectangle.
strokeRect(x, y, width, height)
    Draws a rectangular outline.
clearRect(x, y, width, height)
    Clears the specified rectangular area, making it fully transparent.
*/

let x = 0;


function draw() {
    const ctx = canvas.getContext("2d", {desynchronized: true, willReadFrequently: true});

    /* control browser support */
    if (!ctx)
        console.error(new Error("Failed to get 2d context"));

    /* drawing rects */
    ctx.fillStyle = "#DD2222";
    ctx.clearRect(2+x, 2, 30, 30);
    //x++;
    ctx.fillRect(2+x, 2, 30, 30);

    /* drawing paths */
    /*  First, you create the path.
        Then you use drawing commands to draw into the path.
        Once the path has been created, you can stroke or fill the path to render it.               */
    /*
        beginPath()
            Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
        Path methods
            Methods to set different paths for objects.
        closePath()
            Adds a straight line to the path, going to the start of the current sub-path.
        stroke()
            Draws the shape by stroking its outline.
        fill()
            Draws a solid shape by filling the path's content area.                                 */
    /* When you call fill(), any open shapes are closed automatically, so you don't have to call closePath().
     * This is not the case when you call stroke(). */
    /* The first step to create a path is to call the beginPath(). Internally, paths
     * are stored as a list of sub-paths (lines, arcs, etc.) which together form a shape.
     * Every time this method is called, the list is reset and we can start drawing new shapes.     */


}

setInterval(draw, 20);

window.addEventListener("load", draw);
