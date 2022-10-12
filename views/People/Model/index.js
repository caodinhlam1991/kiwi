exports.model = function ($) {
    var addPeople = function (u, fn) {
        $.model.db.peoples.insertOne(u, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt.ops[0]);
        });
    };
    var editPeople = function (people, fn) {
        $.model.db.peoples.updateOne({ _id: people._id }, { $set: people }, function (err) {
            if (err) throw err;
            $.fill(fn, people);
        });
    };
    var editPeopleId = function (_id, people, fn) {
        $.model.db.peoples.updateOne({ _id: _id }, { $set: people }, function (err) {
            if (err) throw err;
            $.fill(fn, people);
        });
    };
    var changeActiveById = function (_id, active, fn) {
        $.model.db.peoples.updateOne({ _id: _id }, { $set: { active: active } }, function (err) {
            if (err) throw err;
            $.fill(fn, _id);
        });
    };
    var getPeoplesAdv = function (match, sort, skip, limit, fn) {
        $.model.db.peoples.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    email: 1,
                    pead: 1,
                    image: 1,
                    class: 1,
                    schoolname: 1,
                    displayname: 1,
                    phone: 1,
                    friends: 1,
                    classes: 1,
                    active: 1,
                    parameters: 1,
                    dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                    date: 1
                }
            }
        ]).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPeopleLogin = function (email, pw, fn) {
        $.model.db.peoples.findOne({ email: email, pw: pw }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var changeActive = function (people, fn) {
        $.model.db.peoples.updateOne({ email: people.email }, { $set: { active: people.active } }, function (err) {
            if (err) throw err;
            $.fill(fn, people);
        });
    };
    var getPeopleId = function(_id, fn){
        $.model.db.peoples.findOne({ _id: _id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPeoplePead = function(pead, fn){
        $.model.db.peoples.findOne({ pead: pead }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPeopleByEmail = function (email, fn) {
        $.model.db.peoples.findOne({ email: email }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var active = function (u, fn) {
        $.model.db.peoples.update({ email: u.email, active: u.active }, { $set: { active: u.active == u.active, pw: $.md5(u.active) } }, function (err) {
            if (err) throw err;
            $.fill(fn, u);
        });
    };
    var changeLanguage = function (people, fn) {
        $.model.db.peoples.updateOne({ email: people.email }, { $set: { language: people.language } }, function (err) {
            if (err) throw err;
            $.fill(fn, people);
        });
    };
    //old
    var getSubs = function (match, sort, skip, limit, fn) {
        $.model.db.peoples.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPeopleOpts = function (opts, fn) {
        $.model.db.peoples.findOne(opts, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var editContact = function (people, fn) {
        $.model.db.peoples.update({ email: people.email }, { contact: people.contact }, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var changeGroups = function (email, groups, fn) {
        $.model.db.peoples.update({ email: email }, { groups: groups }, { new: false }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getPeoples = function (match, sort, skip, limit, fn) {
        $.model.db.peoples.find(match).sort(sort).skip(skip).limit(limit).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getAll = function (match, project, fn) {
        $.model.db.peoples.find(match, project).sort({ position: 1 }).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getLastPeople = function (match, fn) {
        $.model.db.peoples.find(match).sort({ date: -1 }).skip(0).limit(1).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var getGroups = function (match, fn) {
        $.model.db.peoples.find(match).toArray(function (err, dt) {
            if (err) throw err;
            $.fill(fn, dt);
        });
    };
    var delPeople = function (id, fn) {
        $.model.db.peoples.deleteOne({ _id: id }, function (err, dt) {
            if (err) throw err;
            $.fill(fn, id);
        });
    };
    $.model.db.peoples = $.dbclient.db($.config.database.name).collection("peoples");
    return {
        getPeopleLogin: getPeopleLogin,
        addPeople: addPeople,
        getPeopleByEmail: getPeopleByEmail,
        getPeopleId: getPeopleId,
        editPeople: editPeople,
        editPeopleId: editPeopleId,
        getGroups: getGroups,
        changeActive: changeActive,
        changeActiveById: changeActiveById,
        changeLanguage: changeLanguage,
        editContact: editContact,
        getSubs: getSubs,
        active: active,
        changeGroups: changeGroups,
        getPeoples: getPeoples,
        delPeople: delPeople,
        getPeoplesAdv: getPeoplesAdv,
        getAll: getAll,
        getPeopleOpts: getPeopleOpts,
        getLastPeople: getLastPeople,
        getPeoplePead: getPeoplePead
    }
};