define([
    'underscore', 
    'backbone', 
    'models/bom'
], function(_, Backbone, Bom){
	  
	var BomsCollection = Backbone.Collection.extend({

        model: Bom,
        initialize: function() {
            this.on('add', this.reorderBoms, this);
        },

        refreshPermissions: function() {
            this.each(function(bom){
                // Completed check mark
                if ( usercollection.user.canRead('completed') ) {
                    $(bom.view.el).find('.completed-check').removeClass('hide');
                } else {
                   $(bom.view.el).find('.completed-check').addClass('hide');
                } 

                // Edit button
                if ( usercollection.user.canRead('edit-button') ) {
                    $(bom.view.el).find('.edit-bom').removeClass('hide');
                } else {
                   $(bom.view.el).find('.edit-bom').addClass('hide');
                } 
                
                // Edit status change button
                if ( usercollection.user.canRead('status') ) {
                    $(bom.view.el).find('.bom-prev').removeClass('hide');
                    $(bom.view.el).find('.bom-next').removeClass('hide');
                } else {
                   $(bom.view.el).find('.bom-prev').addClass('hide');
                   $(bom.view.el).find('.bom-next').addClass('hide');
                }
            });
        },

        reorderBoms: function() {

            var this_collection = this;
            this.sort();
            // Assign order attribute to all boms
            $("#bom-list li").each(function(index){
                var el = $("#bom-list li").eq(index);
                el.attr('order', this_collection.indexOf(this_collection.getByCid(el.attr('movement'))));

                // If it is the last bom in the list then time to reorder boms within the column
                if ( index == this_collection.length - 1) {
                    var mylist = $('#bom-list');
                    var listitems = mylist.children('li').get();
                    listitems.sort(function(a, b) {
                       var compA = $(a).attr('order');
                       var compB = $(b).attr('order');
                       return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                    });

                    $.each(listitems, function(idx, itm) { mylist.append(itm); });
                    
                    // Resize the columns to the first column height
                    this_collection.reSizeColumns();
                }
            });

        },

        reSizeColumns: function() {
            $('.column:gt(0)').css('height', $('#column1').height()+'px');
        }

    });

    return BomsCollection;

});
