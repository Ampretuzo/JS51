/**
 * Created by aro on 7/26/17.
 */
var GameServer = require('./game');

function serve(io) {
    var gameServer = new GameServer();

    console.log('!@#: Starting game');
    io.on('connection', function(client) {
        var playerId = gameServer.createNewSnake(function () {
            onDeath(playerId);
        });
        console.log('!@#: player created with id:' + client.id + ', he goes by the name of: ' + playerId);
        client.emit('joined');
        // დავარეგისტრიროთ კონტროლები
        client.on('change_dir', function (data) {
            onDirectionChange(playerId, data.direction);
        });
    });

    function onDirectionChange(playerId, direction) {
        console.log('!@#: player ' + playerId + ' sent direction change to ' + direction);
        gameServer.changeDirection(playerId, direction);
    }

    function onDeath(playerId) {
        console.log('!@#: player with id ' + playerId + ' died_');
        // TODO
    }

    var update = setInterval(function() {
        var snakeIngredients = gameServer.getSnakes().map(function (snake) {
            return {
                body: snake.body,
                color: snake.getColor()
            };
        });
        var apples = gameServer.getApples();
        io.emit('update', {
            snakes: snakeIngredients,
            apples: apples
        });
        gameServer.worldTick();
    }, 100);
}

// არ მუშაობს პირდაპირ exports = ... რატომ არ ვიცი
module.exports = {
    serve: serve
};