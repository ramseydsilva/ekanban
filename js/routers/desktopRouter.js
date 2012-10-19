define([
    "jquery", 
    "backbone", 
    "views/app",
    "views/materials"
], function($, Backbone, AppView, MaterialsView){

    var Router = Backbone.Router.extend({

        initialize: function(){
            Backbone.history.start();
        },

        routes: {
            "": "home"
        },

        home: function() {
            if (typeof console == "undefined") {
                console = {log: function() {}};
            }
            
            console.log("Initiating app in desktopRouter.js");
            var app_view = new AppView;
            window.app_view = app_view;
        }

    });

    return Router;

});
