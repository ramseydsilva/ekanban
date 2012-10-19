define([
    'underscore',
    'backbone',
    'views/aircraft',
    'backbone-relational'
], function(_, Backbone, AircraftView) {
    var AircraftModel = Backbone.RelationalModel.extend({

    initialize: function() {
        this.render();
    },

    defaults: {
        name: 'AC0001'
    },

    render: function() {
        if (typeof this.view === 'undefined') {
            this.view = new AircraftView({model: this});
        }
        this.view.render(this);
    },

    relations: [{
        type: Backbone.HasMany,
        key: 'boms',
        relatedModel: 'BomModel',
        reverseRelation: {
            key: 'aircraft',
            includeInJSON: true
        }
    }],

    toJSON: function() {
        return {
            'cid': this.cid,
            'name': this.attributes.name,
        }
    }

  });

  return AircraftModel;

});
