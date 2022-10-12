exports.controller = function ($, req, res) {
    var index = function(){
        res.render('Content/View/Layout/index', {$: $});
    };
    var game = function(){
        res.render('Game/View/Layout/game', {
            $: $,
            req: req,
            res: res,
            template: 'game',
            page: 'game',
            path: req.params.path,
            title: $.trans.gettext('Game')
        });
    };
    var gameXyz = function() {
        res.render('Game/View/Layout/game-xyz', {
            $: $,
            req: req,
            res: res,
            scene: $.done(req.params.scene, 1),
            template: 'game-xyz',
            page: 'gameXyz',
            path: req.params.path,
            title: $.trans.gettext('Game xyz')
        });
    };
    return {
        index: index,
        gameXyz: gameXyz,
        gameLogin: function(){
        	$.getModel('User', 'index', $).getUserLogin(req.query.email, $.md5(req.query.pw), function (user) {
        		console.log(user);
	            if ($.isEmptyObject(user))
	                res.end('false');
	            else
	            	res.end(user.ix.toString());
	        });
        },
        gameOnSynch: function(){
        	gameMap[req.query.myix] = {x: req.query.x, y: req.query.y, z: req.query.z, a: req.query.a, b: req.query.b, c: req.query.c};
        	temp = '';
        	$.each(gameMap, function(k, v){
        		temp += k+','+v.x+','+v.y+','+v.z+','+v.a+','+v.b+','+v.c+'¬';
        	});
            res.end(temp);
        },
        game: game
    };
};