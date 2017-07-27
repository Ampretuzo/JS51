/**
 * Created by aro on 7/27/17.
 */

var Game = function($, containerValue, drawerValue, leaderBoardContainerValue) {
    // NOTE: რადგან კლიენტში ესენი გლობალური იყო ახლა ეს უბრალოდ გადააწერს თავზე, not good, მარა იყოს
    var $arena = $(containerValue);
    var $leaderBoardContainer = $(leaderBoardContainerValue);

    var width_log = $arena.attr('width_log'),
        height_log = $arena.attr('height_log');
    var drawer = drawerValue;

    // init drawer:
    drawer.setContext($arena.get(0).getContext('2d'));
    drawer.setDimensions([
        $arena.attr('width'),
        $arena.attr('height'),
        width_log,
        height_log
    ]);

    this.updateWorld = function(snakes, apples) {
        drawer.drawArena();
        if(snakes != null)
            snakes.forEach(function (snake) { drawer.drawSnake(snake); });
        else
            console.log('no snakes passed to draw');
        if(apples != null)
            apples.forEach(function (apple) { drawer.drawApple(apple); });
        else
            console.log('no apples passed to draw');
    };

    this.updateLeaderboard = function (leaderboard) {
        var $ol = $leaderBoardContainer.find('ol');
        $ol.empty();
        for(leader of leaderboard) {
            $ol.append('<li><span class="username">' + leader.nickname + '</span><span class="score>">' + leader.score + '</span></li>');
        }
    }
};

module.exports = Game;