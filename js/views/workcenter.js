define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/bom',
    'text!templates/select-workcenter.html'
], function($, _, Backbone, BomView, workcenterTemplate){
    var WorkcenterView = Backbone.View.extend({

        el:  $('.select-workcenter-div'),
        template: _.template(workcenterTemplate),

        events: {
            "change .select-workcenter": "selectedWorkcenter"
        },

        selectedWorkcenter: function() {
            BomView.prototype.selectedDropDown();
        },

        render: function() {
            console.log("Adding workcenter in app.js");
            var template = this.template(this.model.toJSON());
            $(".select-workcenter").append(template);
            return template;
        }

    });

    return WorkcenterView;

});
