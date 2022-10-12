exports.controller = function($, req, res){
    var index = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.ObjectId('5dae75367985c600046e3977'), type: 'post'}, {date: -1}, {title: 1, group: 1, params: 1}, function (contents) {
            res.render('App/View/Layout/index', {
                $: $,
                req: req,
                res: res,
                page: 'apps',
                slug: (typeof(req.params.slug) == "undefined")? '': '/'+req.params.slug,
                template: 'index',
                posts: contents
            });
        });
    };
    return {
        index: index
    };
};