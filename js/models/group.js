define([
    'underscore',
    'backbone',
    'views/group',
    'backbone-relational'
], function(_, Backbone, GroupView) {
    var GroupModel = Backbone.RelationalModel.extend({

        relations: [{
            type: Backbone.HasMany,
            key: 'users',
            relatedModel: 'UserModel',
            reverseRelation: {
                key: 'group',
                includeInJSON: true
            }
        }]

    });

    return GroupModel;
});
