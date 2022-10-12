exports.model = function($){
    var getUserChat = function (match, sort, skip, limit, fn) {
        return $.model.db.chats.aggregate([
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
                detail: 1,
                date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                'people.displayname': 1,
                params: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, project, fn) {
        return $.model.db.chats.aggregate([
            {$match: match},
            {$sort: {position: 1}},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getChats = function (match, sort, skip, limit, fn) {
        return $.model.db.chats.aggregate([
            {$match: match},
            {$skip: skip},
            {$sort: sort},
            {$limit: limit},
            {$lookup: {
                localField: 'wid',
                from: 'peoples',
                foreignField: '_id',
                as: 'people'
            }},
            {$unwind: '$people'},
            {$project: {
                detail: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                date: 1,
                'people.image': 1,
                'people.displayname': 1,
                'people.email': 1,
                'people.pead': 1,
                'people.class': 1,
                params: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll1Chats = function (match, sort, fn) {
        return $.model.db.chats.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: {
                detail: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                date: 1,
                wid: 1,
                params: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
                $.fill(fn, dt);
        });
    };
    var getAllChats = function (match, sort, fn) {
        return $.model.db.chats.aggregate([
            { $match: match },
            { $sort: sort },
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
                    detail: 1,
                    dateVN: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$date' } },
                    date: 1,
                    'people.image': 1,
                    'people.displayname': 1,
                    'people.email': 1,
                    'people.pead': 1,
                    'people.class': 1,
                    params: 1
                }
            }
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getChatsGroup = function (match, sort, fn) {
        $.model.db.chats.aggregate(
            [
                { $match: match },
                {
                    $group:
                    {
                        _id: "$wid"
                    }
                },
                { $sort: sort },
            ]
        ).toArray(function (err, dt) {
            if (err) throw err;
                $.fill(fn, dt);
        });
    };
    var addChat = function (c, fn) {
        $.model.db.chats.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delChat = function (id, fn) {
        $.model.db.chats.remove({ _id: id }, function (err, dt) {
            $.fill(fn, dt);
        });
    };
    var editChat = function (id, c, fn) {
        $.model.db.chats.updateOne({ _id: id }, { $set: c }, function (err, res) {
            if (err) throw err;
            $.fill(fn, c);
        });
    };
    var editChats = function (query, c, fn) {
        $.model.db.contents.updateMany(query, { $set: c }, function (err, res) {
            if (err) throw err;
            //console.log(res.result.nModified + " document(s) updated");
            $.fill(fn, dt);
        });
    };
    $.model.db.chats = $.dbclient.db($.config.database.name).collection("chats");
    return {
        getUserChat: getUserChat,
        getChatsGroup: getChatsGroup,
        editChat: editChat,
        editChats: editChats,
        getChats: getChats,
        addChat: addChat,
        delChat: delChat,
        getAll: getAll,
        getAllChats: getAllChats,
        getAll1Chats: getAll1Chats
    };
};