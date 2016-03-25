/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.service.Service', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.service.ServiceModel',
		'LPB.view.admin.service.ServiceController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'service',
    */

    viewModel: {
        type: 'service'
    },

    controller: 'service',

    items: [
        /* include child components here */
    ]
});