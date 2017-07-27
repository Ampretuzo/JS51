/**
 * Created by aro on 7/27/17.
 */



var Game = require('./game-ui'),
    drawer = require('./drawer'),
    jQuery = require('jquery'),
    io = require('socket.io-client'),
    Snake = require('../shared/snake');

// start anonymous function to avoid variable collision in the future -- ეს აღარაა საჭირო უსაფრთხოებისთვის
// ვინაიდან და რადგანაც ახლა browserify-ს ვიყენებ, მარა legacy კოდი legacy კოდია...
(function(document, $, io, drawer, Game) {
    var game;
    var socket;

    $(document).ready(function() {
        $arena = $('#arena');
        socket = io.connect(document.location.origin);
        socket.on('joined', function (data) {
            onJoin(/* data.id */);
        });

    });

    function onJoin() {
        console.log('joined to game');
        // Initialize game object
        game = new Game($, $arena, drawer);
        // აპდეიტი რომ მოხდა შეგვატყობინებს სერვერი, ჩვენ უნდა მოვთხოვოთ რა მოხდა
        socket.on('update', function(data) {
            onWorldTick(data.snakes, data.apples);
        });
        socket.on('death', function (data) {
            alert('you are dead!');
            // TODO restart
        });
        // Feed controls to the server:
        listenKeys();
    }

    function listenKeys() {
        $(document).keydown(function(event) {
            var direction;
            switch (event.keyCode) {
                case 37: // Left
                    direction = Snake.directions.left;
                    break;
                case 38: // Up
                    direction = Snake.directions.up;
                    break;
                case 39: // Right
                    direction = Snake.directions.right;
                    break;
                case 40: // Down
                    direction = Snake.directions.down;
                    break;
                default:
                    return;
            }
            // Prevent default propagation just in case:
            event.preventDefault();
            // Don't emit if socket was closed at some point:
            if(typeof socket != 'undefined')
                socket.emit('change_dir', {direction: direction} );
        });
    }

    function onWorldTick (snakeParametersArray, apples) {
        // მოვთხოვოთ სერვერს ახალი მდგომარეობა
        var snakes = snakeParametersArray.map(function(snakeParameters) {
            return new Snake(snakeParameters.color, null, snakeParameters.body);
        });
        game.updateWorld(snakes, apples);
    }

})(document, jQuery, io, drawer, Game);
