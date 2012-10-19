define([
    'underscore',
    'backbone',
    'views/bom',
    'backbone-relational'
], function(_, Backbone, BomView) {

    var BomModel = Backbone.RelationalModel.extend({

        initialize: function() {
            this.collection = bomcollection;
            this.on('add', this.render, this);
            this.on('change', this.render, this);
            this.on('change:status', this.statusChanged, this);
            this.on('change:completed', this.completedChanged, this);
            this.on('change:start_date', this.start_dateChanged, this);
            this.on('change:delivered_date', this.delivered_dateChanged, this);
            this.on('change:name', this.nameChanged, this);
            this.on('change:in_stock', this.in_stockChanged, this);
            this.on('change:materials', this.materialsChanged, this);
        },

        defaults: {
            name: '',
            description: '',
            number_of_materials: '1',
            // 0 => unrequested, 1 = requested, 2 = delivered
            status: 0,
            in_stock: 1,
            delivered_date: '',
            completed: 0
        },

        relations: [{
            type: Backbone.HasMany,
            key: 'materials',
            relatedModel: 'MaterialModel',
            reverseRelation: {
                key: 'bom',
                includeInJSON: true
            }
        }],

        toJSON: function() {
            to_return = {
                'cid': this.cid,
                'name': this.attributes.name,
                'description': this.attributes.description,
                'aircraft': this.attributes.aircraft,
                'workcenter': this.attributes.workcenter,
                'start_date': this.attributes.start_date,
                'materials': this.attributes.materials,
                'status': this.attributes.status,
                'is_overdue': this.is_overdue(),
                'is_current': this.is_current(),
                'delivered_date': this.attributes.delivered_date,
                'is_aging': this.is_aging(),
                'in_stock': this.is_in_stock(),
                'completed': this.attributes.completed,
                'user': usercollection.user
            }
            return to_return;
        },

        render: function() {
            if (typeof this.view === 'undefined') { 
                console.log('Bom was added');
                this.view = new BomView({model: this}); 
                this.view.render(this);

                $('#bom-list').append(this.view.el);
                this.collection.reorderBoms();
            }

        },

        start_dateChanged: function() {
            this.view.renderStartDate();
            this.collection.reorderBoms();
        },

        materialsChanged: function() {
            this.view.renderMaterials();
        },

        nameChanged: function() {
            this.view.renderName();
        },

        delivered_dateChanged: function() {
            this.view.renderDeliveredDate();
        },
        
        statusChanged: function() {
            if (usercollection.user.canEdit('status')) {
                this.view.renderDeliveredDate();
                this.view.renderStatus();
            } else {
                this.set("status", this.previous("status"));
            }
        },

        in_stockChanged: function() {
            if (usercollection.user.canEdit('in_stock')) {
                this.view.renderInStock();
            } else {
                this.set("in_stock", this.previous("in_stock"))
            }
        },

        completedChanged: function() {
            if (usercollection.user.canEdit('completed')) {
                this.view.renderCompleted();
            } else {
                this.set("completed", this.previous("completed"));
            }
        },

        startDate: function() {
            return new Date(this.get('start_date'));
        },

        deliveredDate: function() {
            return new Date(this.get('delivered_date'));
        },

        is_completed: function() {
            // This function also sets completed if completed is set and delivered

            status = parseInt(this.get('status'));

            if (status == 2) {
                if (this.get('completed') == 1) {
                    return true;
                }
            } else {
                this.set('completed', 0);
            }

            return false;

        },

        is_aging: function() {
            // This function also sets delivery date if empty and delivered

            status = parseInt(this.get('status'));

            if (status == 2) {
                var now = new Date();

                if ( this.get('delivered_date') == '' ) {
                    date = (now.getMonth()+1)+'/'+now.getUTCDate()+'/'+now.getFullYear()
                    this.set('delivered_date', date)
                }

                timedelta = this.deliveredDate() - now;
                if (timedelta < -86400000*3) {
                    return true;
                } else {
                    return false;
                }

            } else {
                this.set('delivered_date', '');
            }

            return false;
        },

        is_overdue: function() {
            status = parseInt(this.get('status'));
            var now = new Date(); 
            timedelta = now - this.startDate();
            if ( timedelta > 86400000 ) {
                return true;
            } else {
                return false;
            }
        },

        is_current: function() {
            status = parseInt(this.get('status'));
            var now = new Date(); 
            timedelta = this.startDate() - now;
            if ( timedelta > -86400000 && timedelta < 86400000*2 ) {
               return true;
            } else {
                return false;
            }    
        },

        is_in_stock: function() {
            status = parseInt(this.get('status'));
            if ( parseInt(this.get('in_stock')) == 1 ) {
               return true;
            } else {
                return false;
            }    
        },

        moveNext: function() {
            if (this.get('status') < 2) {
                this.set('status', (parseInt(this.get('status')) + 1), {silent: false});
            }
        },

        movePrev: function() {
            if (this.get('status') > 0) {
                this.set('status', (parseInt(this.get('status')) - 1), {silent: false});
            }
        }

    });

    return BomModel;

});
