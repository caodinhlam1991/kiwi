exports.config = function($){
    $.app.get('/gamexyz/:scene', function(req, res){
        $.setController('Game/Controller/index.js', req, res, 'gameXyz');
    });
    $.app.get('/game', function (req, res) {
        $.setController('Game/Controller/index.js', req, res, 'game');
    });
    $.app.get('/gameLogin', function(req, res){
        $.setController('Game/Controller/index.js', req, res, 'gameLogin');
    });
    $.app.get('/gameOnSynch', function(req, res){
        $.setController('Game/Controller/index.js', req, res, 'gameOnSynch');
    });
};