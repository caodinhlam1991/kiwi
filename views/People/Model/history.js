exports.model = function($){
    //$.model.db.histories = $.mongoose.model('histories', new $.mongoose.Schema({
    //    name: String,
    //    histories: Object,
    //    parameters: Array,
    //    date: Date
    //}));
    $.model.db.histories = $.dbclient.db($.config.database.name).collection("histories");
    var addHistory = function(u){
        u = new $.model.db.histories(u);
        u.save(function(err){
            if(err)
                return err;
        });
        return u;
    };
    var getHistories = function(match, sort, skip, limit){
        return $.model.db.histories.find(match).sort(sort).skip(skip).limit(limit);
    };
    var getHistoriesAdv = function(match, sort, skip, limit){
        return $.model.db.histories.aggregate([
            {$match: match},
            {$sort: sort},
            {$skip: skip},
            {$limit: limit},
            {$project: {
                email: 1,
                image: 1,
                group: 1,
                fullname: 1,
                displayname: 1,
                phone: 1,
                groups: 1,
                active: 1,
                parameters: 1,
                dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
                date: 1
            }}
        ]).cursor({
            batchSize: 10000,
            async: true
        });
    };
    var getAll = function(match, project){
        return $.model.db.histories.find(match, project).sort({position: 1});
    };
    var delHistory = function(id){
        $.model.db.histories.remove({_id: id}, function(err){});
    };
    return {
        addHistory: addHistory,
        getHistories: getHistories,
        getHistoriesAdv: getHistoriesAdv,
        getAll: getAll,
        delHistory: delHistory
    }
};