define([
    'jquery',
    'underscore', 
    'backbone',
], function($, _, Backbone){

    var MaterialsView = Backbone.View.extend({

        events: {
        },

        initialize: function() {
            console.log("new material view in views/materials.js");
        }

    });

    return MaterialsView;

});
