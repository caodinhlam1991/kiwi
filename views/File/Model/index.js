exports.model = function($){
    var addFile = function(f, fn){
        $.model.db.files.insertOne(f, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delFileMediaid = function (id, fn) {
        $.model.db.files.deleteOne({ mediaid: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFilesAdv = function (match, sort, skip, limit, fn) {
        $.model.db.files.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    localField: 'wid',
                    from: 'peoples',
                    foreignField: '_id',
                    as: 'people'
                }
            },
            { $unwind: '$people' },
            {
                $project: {
                    name: 1,
                    type: 1,
                    position: 1,
                    mediaid: 1,
                    params: 1,
                    path: 1,
                    live: 1,
                    site: 1,
                    userid: 1,
                    people: 1,
                    dateVN: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$date' } },
                    date: 1
                }
            }
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        $.model.db.files.find(match, project).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var changeSite = function (id, live, fn) {
        $.model.db.files.update({ _id: id }, { site: live }, { multi: true }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editFile = function (c, fn) {
        $.model.db.files.update({ _id: c._id }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFileId = function (id, fn) {
        $.model.db.files.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFileMId = function (id, fn) {
        $.model.db.files.findOne({ mediaid: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContentsOpts = function (match, sort, project, fn) {
        return $.model.db.files.find(match, project).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFilePages = function (match, sort, skip, limit, fn) {
        return $.model.db.files.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllAdv = function(match, sort, project, fn){
        return $.model.db.files.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'userid',
                from: 'users',
                foreignField: '_id',
                as: 'user'
            }},
            {$unwind: '$user'},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getFiles64Adv = function (match, sort, fn) {
        return $.model.db.files.aggregate([
            {$match: match},
            {$sort: sort},
            {$lookup: {
                localField: 'mediaid',
                from: 'multimedias',
                foreignField: '_id',
                as: 'media'
            }},
            {$unwind: '$media'},
            {$project: {
                name: 1,
                date: 1,
                media: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.files = $.dbclient.db($.config.database.name).collection("files");
    return {
        addFile: addFile,
        getFilePages: getFilePages,
        getFileId: getFileId,
        getFileMId: getFileMId,
        delFileMediaid: delFileMediaid,
        changeSite: changeSite,
        editFile: editFile,
        getAll: getAll,
        getAllAdv: getAllAdv,
        getFilesAdv: getFilesAdv,
        getFiles64Adv: getFiles64Adv
    };
};