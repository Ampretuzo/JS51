/**
 * Created by aro on 7/26/17.
 */
var GameServer = require('./game');

function serve(io) {
    var gameServer = new GameServer();

    console.log('!@#: Starting game');
    io.on('connection', function(client) {
        var playerId = gameServer.createNewSnake(function () {
            onDeath(playerId, client);
        });
        console.log('!@#: player created with id:' + client.id + ', he goes by the name of: ' + playerId);
        client.on('pre-join', function (data) {
            onPreJoin(client, playerId, data.nickname);
        });
        // დავარეგისტრიროთ კონტროლები
        client.on('change_dir', function (data) {
            onDirectionChange(playerId, data.direction);
        });
    });

    function onPreJoin(client, playerId, nickname) {
        gameServer.setNickname(playerId, nickname);
        client.emit('joined');
    }

    function onDirectionChange(playerId, direction) {
        console.log('!@#: player ' + playerId + ' sent direction change to ' + direction);
        gameServer.changeDirection(playerId, direction);
    }

    function onDeath(playerId, client) {
        console.log('!@#: player with id ' + playerId + ' died_');
        client.emit('death');
    }

    var update = setInterval(function() {
        var snakeIngredients = gameServer.getSnakes().map(function (snake) {
            return {
                body: snake.body,
                color: snake.getColor()
            };
        });
        var apples = gameServer.getApples();
        var leaderboard = gameServer.getLeaders(3); // 3 მეყოფა
        io.emit('update', {
            snakes: snakeIngredients,
            apples: apples,
            leaderboard: leaderboard
        });
        gameServer.worldTick();
    }, 100);
}

// არ მუშაობს პირდაპირ exports = ... რატომ არ ვიცი
module.exports = {
    serve: serve
};