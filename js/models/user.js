define([
    'underscore',
    'backbone',
    'views/user',
    'backbone-relational'
], function(_, Backbone, UserView) {
    var UserModel = Backbone.RelationalModel.extend({

    initialize: function() {
        this.collection = usercollection;
        this.on("change", this.userChanged, this);
    },

    defaults: {
        username: '',
        password: "",
        logged_in: false,
    },

    login: function() {
        this.collection.user = this;
        this.set("logged_in", true, {"silent" : false}); 
        bomcollection.refreshPermissions();
    },

    logout: function() {
        this.set("logged_in", false, {"silent": false});
        this.collection.login_anonymous_user();
    },

    isLoggedIn: function() {
        if (this.attributes['username'] != '') {
            return this.get("logged_in");
        }
        return false;
    },

    userChanged: function() {
        if (this.hasChanged("logged_in")) {
            this.render();
        }
    },

    render: function() {
        if (typeof this.collection.login_view === 'undefined') {
            this.collection.login_view = new UserView({model: this});
            this.view = this.collection.login_view;
            $(".user-login").html(this.view.render().el);
        } else {
            this.collection.login_view.model = this;
            this.view = this.collection.login_view;
            this.view.update();
        }
    },

    canEdit: function(attribute) {
        if (this.attributes.group) {
            //user belongs to a group
            if (this.attributes.group.attributes.edit.indexOf(attribute) != -1 ) {
                // user contains rights to this function
                return true;
            }
        }
        return false;
    },

    canRead: function(attribute) {
        if (this.attributes.group) {
            //user belongs to a group
            if (this.attributes.group.attributes.read.indexOf(attribute) != -1 ) {
                // user contains rights to this function
                return true;
            }
        }
        return false;
    },

    toJSON: function() {
        return {
            'cid': this.cid,
            'username': this.attributes.username,
            'logged_in': this.attributes.logged_in
        }
    }

  });

  return UserModel;

});
