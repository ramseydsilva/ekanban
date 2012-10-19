define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/user.html',
    'text!templates/user-login-logout-buttons.html',
], function($, _, Backbone, userTemplate, buttonTemplate){
    var UserView = Backbone.View.extend({

        className:  'user-login-div',
        tagName: "div",
        template: _.template(userTemplate),
        buttonTemplate: _.template(buttonTemplate),

        initialize: function() {
            this.collection = usercollection;
        },

        events: {
            'click button.login': 'clickedLogin',
            'click button.logout': 'clickedLogout'
        },
        
        clickedLogout: function() {
            this.collection.user.logout();
        },

        clickedLogin: function() {
            var username = $('.user-login-div input[name="username"]').val();
            var password = $('.user-login-div input[name="password"]').val();
            console.log('clicked log in ', username, password);
            if ( username != '' && password != '' ) {
                var logged_in_user = this.collection.where({"username": username, "password": password});
                if (logged_in_user.length != 0) {
                    this.collection.get_anonymous_user().logout();
                    logged_in_user[0].login();
                }
            }
            return this; 
        },

        update: function() {
            var template = this.template(this.collection.user.toJSON());
            var parent = $('div.user-info').parent();
            $('div.user-info').remove();
            parent.append(template);
            console.log('updating');
            if (this.collection.user.isLoggedIn()) {
                console.log('hiding login button');
                $(this.el).find('button.login').addClass('hide');
                $(this.el).find('button.logout').removeClass('hide');
            } else {
                console.log('hiding logout button');
                $(this.el).find('button.logout').addClass('hide');
                $(this.el).find('button.login').removeClass('hide');
            }
        },

        render: function() {
            var template = this.template(this.collection.user.toJSON());
            var buttons = this.userButtons();
            $(this.el).html(template+buttons);
            return this;
        },
        
        userButtons: function() {
            var template = this.buttonTemplate(this.collection.user.toJSON());
            this.buttons = template;
            return template;
        }
    });

    return UserView;

});
