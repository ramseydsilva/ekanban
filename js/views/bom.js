define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/bom.html',
    'text!templates/bom_form.html',
    'text!templates/materials.html',
], function($, _, Backbone, bomTemplate, bomFormTemplate, materialsTemplate){
    var BomView = Backbone.View.extend({

        tagName:  "li",
        formElement: ".edit-bom-form", 
        materialsElement: ".materials_page",

        template: _.template(bomTemplate),
        formTemplate: _.template(bomFormTemplate),
        materialsTemplate: _.template(materialsTemplate),

        events: {
            "click .bom-next": "moveNext",
            "click .bom-prev": "movePrev",
            "click .edit-bom": "renderForm",
            "click .completed-check": "clickedCompleted",
            "click .bom-picks .value": "renderMaterialsPage"
        },

        initialize: function() {
             _.bindAll(this, 'render');
        },

        render: function() {

            console.log('rendering bom in view/bom.js', this.model.attributes.name);
                    
            $(this.el).attr('movement', this.model.cid); 

            if (this.model.attributes.aircraft) { 
                this.renderAircraft();
            }
            if (this.model.attributes.workcenter) {
                this.renderWorkcenter();
            }

            $(this.el).html(this.template(this.model.toJSON()));

            return this;
        },

        renderMaterials: function() {
            var a = $(this.el).find('.bom-picks .value');
            var length = this.model.attributes.materials.length;
            a.html(length);
            if (length != 0) {
                a.attr('href', '#/bom/'+this.model.attributes.id+'/materials');
            }
        },

        renderName: function() {
            $(this.el).find('.bom-name .value').html(this.model.attributes.name);
        },

        renderStatus: function() {
            $(this.el).find('div.bom').removeClass('status0').removeClass('status1').removeClass('status2').addClass('status'+this.model.attributes.status);
        },

        renderStartDate: function() {
            var el = $(this.el).find('div.bom');
            el.removeClass('overdue').removeClass('current');
            if (this.model.is_overdue()) {
                el.addClass('overdue');
            } else if (this.model.is_current()) {
                el.addClass('current');
            }
        },

        renderDeliveredDate: function() {
            var el = $(this.el).find('div.bom');
            el.removeClass('aging');
            if (this.model.is_aging()) {
                el.addClass('aging');
            }
        },

        renderInStock: function() {
            var el = $(this.el).find('div.bom');
            el.removeClass('shortage');
            if (! this.model.is_in_stock()) {
                el.addClass('shortage');
            }
        },

        renderAircraft: function() {
            if (this.model.attributes.aircraft) {
                $(this.el).attr('aircraft', this.model.attributes.aircraft.cid); 
                $(this.el).find('.bom-aircraft .value').html(this.model.attributes.aircraft.attributes.name);
                // this.selectedDropDown();
            }
        },

        renderWorkcenter: function() {
            if (this.model.attributes.workcenter) {
                $(this.el).attr('workcenter', this.model.attributes.workcenter.cid);
                $(this.el).find('.bom-workcenter .value').html(this.model.attributes.workcenter.attributes.name);
                // this.selectedDropDown();
            }
        },

        renderForm: function() {
            $(this.formElement).html(this.formTemplate(this.model.toJSON()));
            $('body button').button();
            return this;
        },

        renderMaterialsPage: function() {
            $(this.materialsElement).html(this.materialsTemplate({"materials" : this.model.attributes.materials }));
        },

        renderCompleted: function() {
            if (this.model.is_completed()) {
                $(this.el).find('div.bom').addClass('completed');
                this.model.collection.reSizeColumns();
            } else {
                $(this.el).find('div.bom').removeClass('completed');
            }
        },

        clickedCompleted: function() {
            this.model.set('completed', 1);
        },

        selectedDropDown: function() {
            console.log('Filtering drop down selections');
            var selected_workcenter = $('.select-workcenter').val();
            var selected_aircraft = $('.select-aircraft').val();

            if ( selected_aircraft == '' && selected_workcenter == '' ) {
                $('#bom-list li').css('display', 'list-item');
            } else {
                if ( selected_aircraft != '' && selected_workcenter == '' ) {
                    $('#bom-list li[aircraft="'+selected_aircraft+'"]').css('display', 'list-item');
                    $('#bom-list li[aircraft!="'+selected_aircraft+'"]').css('display', 'none');
                } else if ( selected_aircraft == '' && selected_workcenter != '' ) {
                    $('#bom-list li[workcenter="'+selected_workcenter+'"]').css('display', 'list-item');
                    $('#bom-list li[workcenter!="'+selected_workcenter+'"]').css('display', 'none');
                } else {
                    $('#bom-list li').css('display', 'none');
                    $('#bom-list li[workcenter="'+selected_workcenter+'"][aircraft="'+selected_aircraft+'"]').css('display', 'list-item');
                }
            }                              

            bomcollection.reSizeColumns();
        },

        moveNext: function() {
            this.model.moveNext();
            return this;
        },

        movePrev: function() {
            this.model.movePrev();
            return this;
        }
    });

    return BomView;

});
