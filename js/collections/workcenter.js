define([
    'underscore', 
    'backbone', 
    'models/workcenter'
], function(_, Backbone, Workcenter){
	var WorkcentersCollection = Backbone.Collection.extend({
        model: Workcenter
    });

    return WorkcentersCollection;

});
