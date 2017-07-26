/**
 * Created by aro on 7/26/17.
 */
$(document).ready(function () {
    var $arena = $("#arena");
    drawer.setContext($arena[0].getContext('2d'));
    var arenaDimensions = [
        $arena.attr('width'),
        $arena.attr('height'),
        $arena.attr('width_log'),
        $arena.attr('height_log')
    ];
    drawer.setDimensions(arenaDimensions);
    drawer.drawArena();
});
