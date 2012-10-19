define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/bom',
    'text!templates/select-aircraft.html'
], function($, _, Backbone, BomView, aircraftTemplate){
    var AircraftView = Backbone.View.extend({

        el:  $('.select-aircraft-div'),
        template: _.template(aircraftTemplate),

        events: {
            "change .select-aircraft": "selectedAircraft"
        },

        selectedAircraft: function() {
            BomView.prototype.selectedDropDown();
        },

        render: function() {
            console.log("Adding aircraft in app.js");
            var template = this.template(this.model.toJSON());
            $(".select-aircraft").append(template);
            return template;
        }

    });

    return AircraftView;

});
