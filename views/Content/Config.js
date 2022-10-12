exports.config = function($){
    $.app.get('/tim-kiem/:keyword', function(req, res){
        $.setController('Content/Controller/index.js', req, res, 'search');
    });
    $.app.get('/gnews', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'articlesStatic');
    });
    $.app.get('/:path', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'index');
    });
    $.app.get('/article/:path', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'article');
    });
    $.app.get('/article/:path/:myad', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'article');
    });
    $.app.get('/game-news/:addr', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'articles');
    });
    $.app.get('/meet/:path', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'index');
    });
    $.app.get('/address/:addr/:myad', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'address');
    });
    $.app.get('/:path/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'index');
    });
    $.app.get('/article/:path/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'article');
    });
    $.app.get('/article/:path/:myad/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'article');
    });
    $.app.get('/game-news/:addr/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'articles');
    });
    $.app.get('/meet/:path/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'index');
    });
    $.app.get('/address/:addr/:myad/:lang', function (req, res) {
        $.setController('Content/Controller/index.js', req, res, 'address');
    });
    $.app.get('/:lang/content/:action', function(req, res){
        $.setController('Content/Controller/index.js', req, res);
    });
};