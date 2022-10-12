exports.config = function($){
    $.app.get('/chat', function(req, res){
        $.setController('Chat/Controller/index.js', req, res, 'index');
    });
};