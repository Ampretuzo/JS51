/**
 * Created by aro on 7/27/17.
 */



var Game = require('./game-ui'),
    drawer = require('./drawer'),
    jQuery = require('jquery'),
    io = require('socket.io-client'),
    Snake = require('../shared/snake'),
    util = require('./util');

// start anonymous function to avoid variable collision in the future -- ეს აღარაა საჭირო უსაფრთხოებისთვის
// ვინაიდან და რადგანაც ახლა browserify-ს ვიყენებ, მარა legacy კოდი legacy კოდია...
(function(document, $, io, drawer, Game) {
    var game;
    var socket;

    $(document).ready(function() {
        startGame();
    });

    function startGame() {
        // სტრიქტით რო მექნა ამას აღარ დაუშვებდა, ცუდი ისაა რო ნებისმიერ შემთხვევაში ლიკავს ასეთი დეკლარაცია გლობალურში
        // ახლა იყოს ასე არაუშავს
        $arena = $('#arena');
        $leaderBoardContainer = $('#leaderboard');  // div არის ეს
        socket = io.connect(document.location.origin);
        socket.emit('pre-join', {nickname: util.getUrlParameters(window.location.href, 'nickname') });
        socket.on('joined', function (data) {
            onJoin(socket/* data.id */);
        });
    }

    function onJoin(socket) {
        console.log('joined to game');
        // Initialize game object
        game = new Game($, $arena, drawer, $leaderBoardContainer);
        // აპდეიტი რომ მოხდა შეგვატყობინებს სერვერი, ჩვენ უნდა მოვთხოვოთ რა მოხდა
        socket.on('update', function(data) {
            onWorldTick(data.snakes, data.apples, data.leaderboard);
        });
        socket.on('death', function (data) {
            socket.disconnect();
            var again = confirm('სიკვდილი, კიდე?');
            if(again) startGame(); else {
                alert('TODO');
                window.location.href = '/';
            }
        });
        // Feed controls to the server:
        listenKeys();
    }

    function onWorldTick (snakeParametersArray, apples, leaderboard) {
        // მოვთხოვოთ სერვერს ახალი მდგომარეობა
        var snakes = snakeParametersArray.map(function(snakeParameters) {
            return new Snake(snakeParameters.color, null, snakeParameters.body);
        });
        debugger;
        game.updateWorld(snakes, apples);
        game.updateLeaderboard(leaderboard);
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

})(document, jQuery, io, drawer, Game);
