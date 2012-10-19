define([
    'underscore', 
    'backbone', 
    'models/bom'
], function(_, Backbone, Bom){
	  
	var BomsCollection = Backbone.Collection.extend({

        model: Bom,

        reorderBoms: function() {

            var this_collection = this;

            // Assign order attribute to all boms
            $("#bom-list li").each(function(index){
                var el = $("#bom-list li").eq(index);
                el.attr('order', bomcollection.indexOf(bomcollection.getByCid(el.attr('movement'))));

                // If it is the last bom in the list then time to reorder boms within the column
                if ( index == (bomcollection.length - 1)) {
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
