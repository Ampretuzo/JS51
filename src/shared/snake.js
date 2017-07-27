/**
 * Created by aro on 7/27/17.
 */

/**
 *
 * @param colorValue color
 * @param directionValue initial direction
 * @param bodyValue array of pair numbers
 * @constructor
 */
var Snake = function(colorValue, directionValue, bodyValue) {
    color = colorValue;
    applesInStomach = [];
    this.getColor = function () {
        return color;
    };
    this.eat = function (apple) {
        applesInStomach.push(apple);
    };
    this.direction = directionValue;
    this.body = bodyValue;
};

Snake.prototype.advance = function () {
    function newHead(that) {
        var me = that;
        var newHead = [me.body[0][0], me.body[0][1]];
        switch (me.direction) {
            case Snake.directions.up:
                newHead[1]--;
                break;
            case Snake.directions.left:
                newHead[0]--;
                break;
            case Snake.directions.right:
                newHead[0]++;
                break;
            case Snake.directions.down:
                newHead[1]++;
                break;
            default:
                break;
        }
        return newHead;
    }
    var newHead = newHead(this);
    if(typeof applesInStomach[0] != 'undefined') {
        if(applesInStomach[0].join() === this.body[this.body.length - 1].join() )
            applesInStomach.pop();
        else
            this.body.pop();
    } else {
        this.body.pop();
    }

    this.body.unshift(newHead);
};

Snake.prototype.setDirection = function(direction) {
    // ადრე გარეთ იყო ეს ვალიდაცია, ასე ჯობია. თუმცა უნდა განკერძოვდეს გველის მიმართულება ამიტომ... // TODO
    function backwardsDir(snk) {
        var delX = snk.body[0][0] - snk.body[1][0];
        var delY = snk.body[0][1] - snk.body[1][1];
        if(delX === 1) return Snake.directions.left;
        if(delX === -1) return Snake.directions.right;
        if(delY === 1) return Snake.directions.up;
        if(delY === -1) return Snake.directions.down;
    }
    if(direction !== backwardsDir(this) ) {
        this.direction = direction;
        console.log('new direction: ' + this.direction);
    } else {
        console.log('bad direction!');
    }
};

Snake.prototype.head = function() {
    return this.body[0];
};

/**
 * returns true if this snake killed the other snake.
 * @param otherSnake
 * @returns {boolean}
 */
Snake.prototype.killed = function (otherSnake) {
    var otherHead = otherSnake.head();
    for (var i = 0; i < this.body.length; i++) {
        if(this === otherSnake && i === 0) continue;
        var tile = this.body[i];
        if(tile.join() === otherSnake.head().join() ) return true;
    }
    return false;
};

// Instance variables below:

Snake.directions = Object.freeze({
    up: 0,
    left: 1,
    right: 2,
    down: 3
});

module.exports = Snake;