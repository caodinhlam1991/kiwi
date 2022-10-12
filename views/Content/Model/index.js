exports.model = function($){
    var addContent = function (c, fn) {
        $.model.db.contents.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var editContent = function (c, fn) {
        $.model.db.contents.updateOne({ _id: c._id }, { $set: c }, function (err, res) {
            if (err) throw err;
            $.fill(fn, c);
        });
    };
    var editContentId = function (_id, c, fn) {
        $.model.db.contents.updateOne({ _id: _id }, { $set: c }, function (err, res) {
            if (err) throw err;
            $.fill(fn, c);
        });
    };
    var delContentByPath = function (path, fn) {
        $.model.db.contents.remove({ path: path }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentPath = function (slug, fn) {
        $.model.db.contents.findOne({ path: slug }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getParams = function (match, sort, fn) {
        $.model.db.contents.find(match).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentId = function (id, fn) {
        $.model.db.contents.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentsFullOpts = function (match, sort, project, skip, limit, fn) {
        $.model.db.contents.find(match, project).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContents = function (match, sort, skip, limit, fn) {
        $.model.db.contents.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllFull = function(match, sort, skip, limit, fn){
        $.model.db.contents.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: '_id',
                from: 'posts',
                foreignField: 'contentid',
                as: 'detail'
            }},
            {$unwind: '$detail'},
            {$project: {
                title: 1,
                except: 1,
                cats: 1,
                imgs: 1,
                path: 1,
                live: 1,
                views: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                date: 1,
                detail: 1,
                params: 1,
                wid: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllFullPe2 = function(match, sort, skip, limit, fn){
        $.model.db.contents.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'wid',
                from: 'peoples',
                foreignField: '_id',
                as: 'people'
            }},
            {$unwind: '$people'},
            {$project: {
                params: 1,
                people: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var changeLive = function (id, live, fn) {
        $.model.db.contents.update({ _id: id }, { live: live }, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentsByPath = function (path, fn) {
        $.model.db.contents.find({ path: path }).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function(match, sort, project, fn){
        $.model.db.contents.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
                $.fill(fn, dt);
        });
    };
    var getAllF = function (match, sort, skip, limit, project, fn) {
        $.model.db.contents.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentsAdv = function (match, sort, skip, limit, fn) {
        $.model.db.contents.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'wid',
                from: 'peoples',
                foreignField: '_id',
                as: 'people'
            }},
            {$unwind: '$people'},
            {$project: {
                title: 1,
                except: 1,
                cats: 1,
                imgs: 1,
                path: 1,
                position: 1,
                live: 1,
                views: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                date: 1,
                'people.displayname': 1,
                'people.schoolname': 1,
                params: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContent = function (match, fn) {
        $.model.db.contents.findOne(match, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentsOpts = function (match, sort, project, fn) {
        return $.model.db.contents.find(match, project).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getParams = function(match, sort, fn){
        return $.model.db.contents.find(match).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFullContentsType = function (match, fn) {
        return $.model.db.contents.find(match).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.contents = $.dbclient.db($.config.database.name).collection("contents");
    return {
        addContent: addContent,
        delContentByPath: delContentByPath,
        changeLive: changeLive,
        editContent: editContent,
        getContentId: getContentId,
        getContentPath: getContentPath,
        getContentsAdv: getContentsAdv,
        getContents: getContents,
        getContent: getContent,
        getFullContentsType: getFullContentsType,
        getContentsByPath: getContentsByPath,
        getAll: getAll,
        getAllF: getAllF,
        getAllFull: getAllFull,
        getAllFullPe2: getAllFullPe2,
        getParams: getParams,
        getContentsOpts: getContentsOpts,
        getContentsFullOpts: getContentsFullOpts,
        editContentId: editContentId
    };
};