var drawer = (function () {
    var ret = {};
    var width, height,
        width_log, height_log;
    var canvas_ctx;

    ret.setContext = function(canvasCtxValue) {
        canvas_ctx = canvasCtxValue;
    };

    /**
     * @param dimensions [width, height, width_log, height_log]
     */
    ret.setDimensions = function (dimensions) {
        width = dimensions[0];
        height = dimensions[1];
        width_log = dimensions[2];
        height_log = dimensions[3];
    };

    function drawTile(i, j, color) {
        function rectDef(i, j) {
            // hard code this bitch
            return [
                i * width / width_log + width / width_log * 0.2,
                j * height / height_log + height / height_log * 0.2,
                width / width_log * 0.8,
                height / height_log * 0.8
            ];
        }
        canvas_ctx.fillStyle = color;
        canvas_ctx.fillRect.apply(canvas_ctx, rectDef(i, j) );
    }

    ret.drawArena = function drawArena() {
        for(var i = 0; i < width_log; i++) {
            for(var j = 0; j < height_log; j++) {
                drawTile(i, j, '#e3ff6e');
            }
        }
    };

    ret.drawSnake = function (snake) {
        var tiles = snake.body;
        tiles.forEach(function (tile) {
            drawTile(tile[0], tile[1], snake.getColor() );
        });
    };

    ret.drawApple = function (apple) {
        drawTile(apple[0], apple[1], '#dd0f00');
    };

    return ret;
})();

module.exports = drawer;