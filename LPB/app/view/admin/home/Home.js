/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.home.Home', {
    extend: 'Ext.container.Container',

    requires: [
        'LPB.view.admin.home.HomeModel',
        'LPB.view.admin.home.HomeController',
        'Ext.ux.layout.ResponsiveColumn',
        'LPB.view.admin.home.Panel01',
        'LPB.view.admin.home.Panel02'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'home',
     */

    viewModel: {
        type: 'home'
    },

    controller: 'home',

    layout: 'responsivecolumn',

    items: [{
        xtype: 'panel01',
        responsiveCls: 'big-60 small-100',
        height: 400
    }, {
        xtype: 'panel02',
        responsiveCls: 'big-40 small-100',
        height: 400
    }]
});