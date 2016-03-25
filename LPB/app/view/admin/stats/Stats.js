/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.stats.Stats', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.stats.StatsModel',
		'LPB.view.admin.stats.StatsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'stats',
    */

    viewModel: {
        type: 'stats'
    },

    controller: 'stats',

    items: [
        /* include child components here */
    ]
});