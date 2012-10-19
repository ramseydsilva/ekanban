define([
    'underscore', 
    'backbone', 
    'models/material'
], function(_, Backbone, Material){
	var MaterialsCollection = Backbone.Collection.extend({
        model: Material 
    });

    return MaterialsCollection;

});
