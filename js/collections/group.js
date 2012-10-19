define([
    'underscore', 
    'backbone', 
    'models/group'
], function(_, Backbone, Group){
	var GroupCollection = Backbone.Collection.extend({
        model: Group,
        initialize: function() {
        }
    });

    return GroupCollection;

});
