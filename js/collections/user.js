define([
    'underscore', 
    'backbone', 
    'models/user'
], function(_, Backbone, User){
	var UserCollection = Backbone.Collection.extend({
        model: User,
        initialize: function() {
            console.log('initializing user collection');
            this.on('add', this.login_anonymous_user);
        },
        get_anonymous_user: function() {
            var user = this.where({"username":""})[0];
            return user;
        },

        login_anonymous_user: function() {
            if ( (!this.user) || this.user.attributes.username != '' ) {
                this.user = this.get_anonymous_user();
                this.user.login();
            }
            return this.user;
        }
    });

    return UserCollection;

});
