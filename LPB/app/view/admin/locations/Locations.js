/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.locations.Locations', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.locations.LocationsModel',
		'LPB.view.admin.locations.LocationsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'locations',
    */

    viewModel: {
        type: 'locations'
    },

    controller: 'locations',

    items: [
        /* include child components here */
    ]
});