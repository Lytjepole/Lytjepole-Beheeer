/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.items.Items', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.items.ItemsModel',
        'LPB.view.admin.items.ItemsController'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'items',
     */

    viewModel: {
        type: 'items'
    },

    controller: 'items',

    items: [
        /* include child components here */
        {html: 'items'}
    ]
});