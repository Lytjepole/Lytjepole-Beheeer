/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userlocations.UserLocations', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.user.userlocations.UserLocationsModel',
		'LPB.view.user.userlocations.UserLocationsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'userlocations',
    */

    viewModel: {
        type: 'userlocations'
    },

    controller: 'userlocations',

    items: [
        /* include child components here */
    ]
});