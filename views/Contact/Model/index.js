exports.model = function($){
    var addContact = function(c, fn){
        $.model.db.contacts.insertOne(c, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var delContactId = function (id, fn) {
        $.model.db.contacts.remove({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var changeLive = function (id, live, fn) {
        $.model.db.contacts.updateOne({ _id: id }, { $set: { live: live } }, function (err, res) {
            if (err) throw err;
            $.fill(fn, id);
        });
    };
    var getContactsAdv = function (match, sort, skip, limit, fn) {
        return $.model.db.contacts.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$project: {
                email: 1,
                fullname: 1,
                phone: 1,
                title: 1,
                detail: 1,
                contentid: 1,
                live: 1,
                params: 1,
                type: 1,
                date: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContactPages = function (match, sort, skip, limit, fn) {
        return $.model.db.contacts.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    //old
    var editMedia = function (c, fn) {
        return files.update({ _id: c._id }, c, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getContactId = function (id, fn) {
        return $.model.db.contacts.findOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, sort, project, fn) {
        return $.model.db.contacts.find(match, project).sort(sort).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAllAdv = function(match, sort, project, fn){
        return $.model.db.contacts.aggregate([
            {$match: match},
            {$sort: sort},
            {$project: project}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getSubscriptionsAdv = function (match, sort, skip, limit, fn) {
        return contacts.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$lookup: {
                localField: 'contentid',
                from: 'contents',
                foreignField: '_id',
                as: 'content'
            }},
            {$unwind: '$content'},
            {$project: {
                email: 1,
                fullname: 1,
                phone: 1,
                address: 1,
                detail: 1,
                contentid: 1,
                live: 1,
                params: 1,
                type: 1,
                date: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                content: 1
            }}
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    $.model.db.contacts = $.dbclient.db($.config.database.name).collection("contacts");
    return {
        addContact: addContact,
        getContactPages: getContactPages,
        getContactId: getContactId,
        delContactId: delContactId,
        getAll: getAll,
        getAllAdv: getAllAdv,
        getContactsAdv: getContactsAdv,
        changeLive: changeLive,
        getSubscriptionsAdv: getSubscriptionsAdv
    };
};