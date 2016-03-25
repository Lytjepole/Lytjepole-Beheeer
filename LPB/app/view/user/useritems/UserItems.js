/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.useritems.UserItems', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.user.useritems.UserItemsModel',
		'LPB.view.user.useritems.UserItemsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'useritems',
    */

    viewModel: {
        type: 'useritems'
    },

    controller: 'useritems',

    items: [
        /* include child components here */
    ]
});