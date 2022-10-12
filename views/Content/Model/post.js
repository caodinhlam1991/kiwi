exports.model = function ($) {
    var addPost = function (c, fn) {
        $.model.db.posts.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delPostById = function (id, fn) {
        $.model.db.posts.remove({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var delPostByCId = function (id, fn) {
        $.model.db.posts.remove({ contentid: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editPost = function (c, fn) {
        $.model.db.posts.update({ _id: c._id }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editPostId = function (_id, p, fn) {
        $.model.db.posts.updateOne({ _id: _id }, { $set: p }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editPostCId = function (_id, p, fn) {
        $.model.db.posts.updateOne({ contentid: _id }, { $set: p }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPostId = function (id, fn) {
        $.model.db.posts.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPostCId = function (id, fn) {
        $.model.db.posts.findOne({ contentid: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        return $.model.db.posts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.posts = $.dbclient.db($.config.database.name).collection("posts");
    //$.model.db.posts = $.mongoose.model('posts', new $.mongoose.Schema({
    //    detail: String
    //}));
    return {
        addPost: addPost,
        delPostById: delPostById,
        delPostByCId: delPostByCId,
        editPost: editPost,
        editPostCId: editPostCId,
        getPostId: getPostId,
        getPostCId: getPostCId,
        getAll: getAll,
        editPostId: editPostId
    };
};