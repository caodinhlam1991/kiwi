exports.model = function($){
    $.model.db.chats = $.dbclient.db($.config.database.name).collection("games");
    return {
        
    };
};