define([
    'underscore',
    'backbone',
    'views/workcenter',
    'backbone-relational'
], function(_, Backbone, WorkcenterView) {
    var WorkcenterModel = Backbone.RelationalModel.extend({

    initialize: function() {
        this.render();
    },

    defaults: {
        name: 'AC0001'
    },

    render: function() {
        if (typeof this.view === 'undefined') {
            this.view = new WorkcenterView({model: this});
        }
        this.view.render(this);
    },

    relations: [{
        type: Backbone.HasMany,
        key: 'boms',
        relatedModel: 'BomModel',
        reverseRelation: {
            key: 'workcenter',
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

  return WorkcenterModel;

});
