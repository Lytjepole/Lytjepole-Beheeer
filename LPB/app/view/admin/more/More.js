/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.more.More', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.more.MoreModel',
		'LPB.view.admin.more.MoreController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'more',
    */

    viewModel: {
        type: 'more'
    },

    controller: 'more',

    items: [
        /* include child components here */
    ]
});