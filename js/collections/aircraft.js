define([
    'underscore', 
    'backbone', 
    'models/aircraft'
], function(_, Backbone, Aircraft){
	var AircraftsCollection = Backbone.Collection.extend({
        model: Aircraft
    });

    return AircraftsCollection;

});
