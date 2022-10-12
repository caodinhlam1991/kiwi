exports.config=function(t){
    t.app.get("/lien-he",function(n,o){
        t.setController("Contact/Controller/index.js",n,o, 'index')
    }),
    t.app.get("/goc-trao-doi",function(n,o){
        t.setController("Contact/Controller/index.js",n,o, 'exchange')
    });
    t.app.post("/contact/addContact",function(n,o){
        t.setController("Contact/Controller/index.js",n,o, 'addContact');
    })
    t.app.post("/contact/addExchange",function(n,o){
        t.setController("Contact/Controller/index.js",n,o, 'addExchange');
    });
};