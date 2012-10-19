define([
    'jquery',
    'underscore', 
    'backbone',
    'collections/bom',
    'collections/aircraft',
    'collections/workcenter',
    'collections/user',
    'collections/group',
    'collections/material',
    'models/bom',
    'models/user',
    'models/material'
], function($, _, Backbone, BomCollection, AircraftCollection, WorkcenterCollection, UserCollection, GroupCollection, MaterialCollection, BomModel, UserModel, MaterialModel ){

    var AppView = Backbone.View.extend({

        el: $("#main"),

        events: {
        },

        initialize: function() {
            // Needed to make Bacbone-relational work in models/aircraft.js
            window.BomModel = BomModel;
            window.UserModel = UserModel;
            window.MaterialModel = MaterialModel;

            bomcollection = new BomCollection;
            aircraftcollection = new AircraftCollection;
            workcentercollection = new WorkcenterCollection;
            usercollection = new UserCollection;
            groupcollection = new GroupCollection;
            materialcollection = new MaterialCollection;
                
            bomcollection.comparator = function(bom) {
                return bom.startDate();
            }
            
            app = this;

            function fetch() {
                $.get("js/data/user.json", function (data) {
                    usercollection.add($.parseJSON(data));
                    $.get("js/data/group.json", function (data) {
                        groupcollection.add($.parseJSON(data));
                        $.get("js/data/aircraft.json", function (data) {
                            aircraftcollection.add($.parseJSON(data));
                        });
                        $.get("js/data/workcenter.json", function (data) {
                            workcentercollection.add($.parseJSON(data));
                            $.get("js/data/material.json", function (data) {
                                materialcollection.add($.parseJSON(data));
                                $.get("js/data/bom.json", function (data) {
                                    bomcollection.add($.parseJSON(data));
                                });
                            });
                        });
                    });
                });

            }

            fetch();
            console.log("fetching data in app.js");
        }

    });

    return AppView;

});
