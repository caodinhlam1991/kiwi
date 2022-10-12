exports.config = function($){
    $.app.get('/multimedia/:id', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'multimedia');
    });
    $.app.get('/list/:id', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'list');
    });
    $.app.get('/music/:id', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'music');
    });
    $.app.get('/media/:action', function(req, res){
        $.setController('File/Controller/index.js', req, res);
    });
    $.app.get('/camera', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'camera');
    });
    $.app.get('/:lang/media/:action', function(req, res){
        $.setController('File/Controller/index.js', req, res);
    });
    $.app.post('/:lang/media/:action', function(req, res){
        $.setController('File/Controller/index.js', req, res);
    });
    $.app.get('/like/:slug', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'like');
    });
    $.app.get('/commentCount/:slug', function(req, res){
        $.setController('File/Controller/index.js', req, res, 'commentCount');
    });
    $.app.get('/file/:id', function(req, res){
        $.setController('File/Controller/index.js', req, res);
    });
    $.app.get('/am-nhac/:slug', function(req, res){
        $.setController('File/Controller/index.js', req, res);
    });
};