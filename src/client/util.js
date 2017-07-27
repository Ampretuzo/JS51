/**
 * Created by aro on 7/27/17.
 */

// https://stackoverflow.com/a/3855394

var getUrlParameters = function(url, key) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
};

module.exports = {
    getUrlParameters: getUrlParameters
}