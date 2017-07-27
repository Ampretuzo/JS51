/**
 * Created by aro on 7/27/17.
 */

var config = require('./config');

// TODO მკვდარსაც შეუძლია კონტროლების გამოგზავნა, ამიტომ შემოწმებები უნდა ყველგან სანამ players.get(i).snake მოხდება,
// იდეალურ შემთხვევაში კლასი უნდა იყოს მოთამაშის კიდე ცალკე მარა რაცაა იყოს ახლა..

var GameServer = function (options) {
    console.log('!@#: game logic ctor goin on..');
    var Snake = require('./shared/snake');
    var player_cnt = 0;
    /*
     * მოთამაშე არის:
     * {
     *  snake: {...},
     *  deathCallback: function() {...},
     *  nickname: 'asd',
     *  score: 100
     * }
     */
    var players = new Map();
    var apples = [];

    // საწყისი ვაშლების ჩაყრა
    for(var i = 0; i < config.initialNumApples; i++) {
        apples.push(GameServer.getRandomApple(apples) );
    }

    this.createNewSnake = function (onDeathFn) {
        var playerId = player_cnt++;
        console.log('!@#: creating snake with id: ' + playerId);
        // hard coded initial snake config...
        var newSnake = new Snake(GameServer.getRandomColor(), Snake.directions.right, [ [3, 0], [2, 0], [1, 0], [0, 0] ] );
        players.set(playerId, {
            snake: newSnake,
            deathCallback: onDeathFn,
            nickname: null,
            score: 0
        });
        return playerId;
    };

    this.getSnake = function (id) {
        return players.get(id).snake;
    };

    /**
     *
     * @param id player id
     * @param direction Snake.directions.---
     */
    this.changeDirection = function(id, direction) {
        console.log('!@#: changing direction of ' + id + ' to ' + direction);
        players.get(id).snake.setDirection(direction);
    };

    /**
     * snake ass hoes
     * @returns {*|{}|Array}
     */
    this.getSnakes = function () {
        var playersArray = Array.from(players.values() );
        return playersArray.map(function (player) { return player.snake; });
    };

    this.getApples = function () {
        return apples;
    };


    function advance() {
        var playersArray = Array.from(players.values());
        for(var i = 0; i < playersArray.length; i++) {
            playersArray[i].snake.advance();
        }
    }

    function eat() {
        for(player of Array.from(players.values() ) ) {
            var snake = player.snake;
            for(var i = 0; i < apples.length; i++)
                if(snake.head().join() === apples[i].join() ) {
                    snake.eat(apples[i]);
                    apples.splice(i, 1);
                    player.score = player.score + config.appleBaseScoreGain;
                    // TODO ჩამატება უნდა ახალი ვაშლის და ქულის მომატება უნდა მოთამაშეს
                }
        }
    }

    function hitOtherSnake(snake) {
        for(id of Array.from(players.keys() ) ) {
            var enemy = players.get(id).snake;
            if(enemy.killed(snake) ) return true;
        }
        return false;
    }

    function kill() {
        function killSnake(id) {
            (players.get(id).deathCallback) ();
            players.delete(id);
        }

        function outOfBounds(head) {
            if(head[0] < 0 || head[0] >= config.tiles) return true;
            if(head[1] < 0 || head[1] >= config.tiles) return true;
            return false;
        }

        for(id of Array.from(players.keys() ) ) {

            // თუ თავი გაცდა საზღრებს სიკვდილია
            if(outOfBounds(players.get(id).snake.head() ) ) {
                killSnake(id);
                continue;
            }
            if(hitOtherSnake(players.get(id).snake) ) {
                console.log('!@#: player ' + id + ' got killed by the other snake');
                killSnake(id);
                // TODO ქულა უნდა დაემატოს მკვლელს მერე
            }
        }
    }

    /**
     * Moves clock one tick further.
     */
    this.worldTick = function() {
        kill();
        eat();
        advance();
    };

    this.setNickname = function(playerId, nickname) {
        players.get(playerId).nickname = nickname;
    };

    this.getLeaders = function (limit) {
        var board = Array.from(players.values() ).map(function (player) {
            return {
                nickname: player.nickname,
                score: player.score
            };
        });
        var leaderBoard = board;
        leaderBoard.sort(function (a, b) {
            return b.score - a.score;
        });
        leaderBoard.slice(0, 0 + limit);
        return leaderBoard;
    }
};

// static method
// FIXME აქ პრობლემაა, ერთიდაიგივე ფერზე ებმევა ყველა გველი
GameServer.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

GameServer.getRandomApple = function (currentApples) {
    var x, y;
    while(true) {
        x = Math.floor((Math.random() * config.tiles) );
        y = Math.floor((Math.random() * config.tiles) );
        if(currentApples.map(function (apple) {
            return apple.join();
        }).indexOf([x, y].join()) === -1) break;
    }
    return [x, y];
};

module.exports = GameServer;