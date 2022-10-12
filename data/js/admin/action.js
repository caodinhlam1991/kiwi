var action = function()//Action object
{
    var me = this, df_params = {};
    me.add = function(params){};
    me.delete = function(params)
    {
        extend(params);
        
    };
    me.edit = function(params){};
    me.list = function(params){};
    me.detail = function(params){};
    var extend = function(params)
    {
        params = $.extend({}, df_params, params);
    };
    return me;
}//End action object