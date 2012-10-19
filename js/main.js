require.config({
    paths: {
        "modernizr": "libs/modernizr/modernizr",
        'jquery': 'libs/jquery/jquery',
        "bootstrap": "plugins/bootstrap",
        'underscore': 'libs/underscore/lodash',
        'backbone': 'libs/backbone/backbone',
        'backbone-relational': 'libs/backbone/backbone-relational',
        'backbone.validateAll': 'plugins/Backbone.validateAll',
        'text': 'plugins/text',
    	'jqueryui': 'libs/jquery/jquery-ui-1.8.23.custom.min',
	    'jqueryui.button': 'libs/jquery/ui/ui/jquery.ui.button',
        'today': 'plugins/today'
    },
    shim: {
        // Twitter Bootstrap jQuery plugins
        "bootstrap": ["jquery"],
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"  //attaches "Backbone" to the window object
        },
        'backbone-relational': ['backbone'],
        "underscore": ["jquery"],
        "jquerui": ["jquery"],
        "jqueryui.button": ["jquery"],
        "backbone.validateAll": ["backbone"]
    }
});


require(['modernizr', 'jquery', 'backbone', 'routers/desktopRouter', 'today', 'bootstrap', 'backbone.validateAll', 'jqueryui', 'jqueryui.button'], function(Modernizr, $, Backbone, Desktop, today) {

    this.router = new Desktop();

    //Wait for dom ready before setting up widgets.
    $(function () {

        $('.time .value').html(today);
        
        $('.legend_page').dialog({
            autoOpen: false,
            height: 505,
            width: 670,
            model: true,
            title: "Legend",
            close: function() {
                $('.legend_page').html('');
            }   
        });
        
        $('.materials_page').dialog({
            autoOpen: false,
            height: 505, 
            width: 670,
            model: true,
            title: "Materials",
            close: function() {
                $('.materials_page').html('');
            }
        });

        $('.legend_link').live('click', function(){
            $('.legend_page').append($("<iframe scrolling='no' width='640' height='450' frameBorder='0'>Broswer not compatible</iframe>").attr("src", "legend.html")).dialog('open');
        });

        $('input[name="start_date"], input[name="delivered_date"]').live('click', function() {
            $(this).datepicker({showOn: 'focus'}).focus();
        });
        
        $('.bom-picks .value').live('click', function(){
            $('.materials_page').dialog('open');
        });

        $('.edit-bom-form').dialog({
            autoOpen: false,
            height: 400,
            width: 550,
            model: true,
            title: "Edit BOM",
            buttons: {
                'Save': function () {
                    var cid = $('input[name="cid"]').val(),
                        values = {
                            'name': $('input[name="name"]').val(),
                            'description': $('input[name="description"]').val(),
                            'status': $('select[name="status"]').val(),
                            'in_stock': $('input[name="in_stock"]:checked').val(),
                            'overdue': $('input[name="overdue"]:checked').val(),
                            'start_date': $('input[name="start_date"]').val(),
                            'delivered_date': $('input[name="delivered_date"]').val()
                        } 
                    bom = bomcollection.getByCid(cid);
                    bom.set(values, {silent: false});
                    $(this).dialog("close");
                },
                'Cancel': function() {
                    $(this).dialog( "close" );
                }
            },
            close: function() {
            }
        });

        $('.edit-bom').live('click', function() {
            $('.edit-bom-form').dialog('open');
        });

    });

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(needle) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
}
    
});
