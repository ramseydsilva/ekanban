define([
    'jquery', 
    'underscore', 
    'backbone',
], function($, _, Backbone){
    var GroupView = Backbone.View.extend({

        initialize: function() {
            this.collection = groupcollection;
        },

        events: {
        }
    });

    return GroupView;

});
