exports.config = function($){
    $.app.get('/ung-dung', function(req, res){
        $.setController('App/Controller/index.js', req, res, 'index');
    });
};