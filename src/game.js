/**
 * Created by aro on 7/27/17.
 */

var GameServer = function (options) {
    console.log('!@#: game logic ctor goin on..');
    var Snake = require('./shared/snake');
    var player_cnt = 0;
    /*
     * მოთამაშე არის:
     * {
     *  snake: {...},
     *  deathCallback: function() {...}
     * }
     */
    var players = new Map();
    var apples = [];

    this.createNewSnake = function (onDeathFn) {
        var playerId = player_cnt++;
        console.log('!@#: creating snake with id: ' + playerId);
        // hard coded initial snake config...
        var newSnake = new Snake(GameServer.getRandomColor(), Snake.directions.right, [ [3, 0], [2, 0], [1, 0], [0, 0] ] );
        players.set(playerId, {
            snake: newSnake,
            deathCallback: onDeathFn
        });
        return playerId;
    };
    //
    // this.onDeath = function(id, callback) {
    //     death_callbacks.set(id, callback);
    // };
    //
    this.getSnake = function (id) {
        return players.get(id).snake;
    };
    //
    // this.getSnakes = function () {
    //     return Array.from(snakes.values() );
    // };
    //
    // this.getApples = function () {
    //     return apples;
    // };
    //
    // this.changeDirection = function(id, direction) {
    //     console.log('changing direction of #' + id + ' to ' + direction);
    //     function backwardsDirection(id) {
    //         var delX = snakes.get(id).body[0][0] - snakes.get(id).body[1][0];
    //         var delY = snakes.get(id).body[0][1] - snakes.get(id).body[1][1];
    //         if(delX === 1) return Snake.directions.left;
    //         if(delX === -1) return Snake.directions.right;
    //         if(delY === 1) return Snake.directions.up;
    //         if(delY === -1) return Snake.directions.down;
    //     }
    //     if(direction !== backwardsDirection(id) ) {
    //         snakes.get(id).setDirection(direction);
    //         console.log('direction now: ' + snakes.get(id).direction);
    //     } else {
    //         console.log('bad direction!');
    //     }
    // };
    //
    // function advance() {
    //     for(snake of Array.from(snakes.values()) ) {
    //         snake.advance();
    //     }
    // }
    //
    // function eat() {
    //     for(snake of Array.from(snakes.values()) )
    //         for(var i = 0; i < apples.length; i++)
    //             if(snake.head().join() === apples[i].join() ) {
    //                 snake.eat(apples[i]);
    //                 apples.splice(i, 1);
    //             }
    // }
    //
    // function hitOtherSnake(snake) {
    //     for(id of Array.from(snakes.keys() ) ) {
    //         var enemy = snakes.get(id);
    //         if(enemy.killed(snake) ) return true;
    //     }
    //     return false;
    // }
    //
    // function kill() {
    //     function outOfBounds(head) {
    //         if(head[0] < 0 || head[0] > 50) return true;
    //         if(head[1] < 0 || head[1] > 50) return true;
    //         return false;
    //     }
    //
    //     for(id of Array.from(snakes.keys() ) ) {
    //         var head = snakes.get(id).head();
    //         if(outOfBounds(head) ) {
    //             if(typeof death_callbacks.get(id) != 'undefined')
    //             {
    //                 (death_callbacks.get(id) )();
    //                 snakes.delete(id);
    //                 death_callbacks.delete(id);
    //                 continue;
    //             }
    //         }
    //         if(hitOtherSnake(snakes.get(id)) ) {
    //             console.log('snake with id' + id + 'killed by other snake');
    //             (death_callbacks.get(id) )();
    //             snakes.delete(id);
    //             death_callbacks.delete(id);
    //         }
    //     }
    // }
    //
    // this.updateView = function() {
    //     kill();
    //     eat();
    //     advance();
    // }
};

// static method
GameServer.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

module.exports = GameServer;