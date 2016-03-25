/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userstats.UserStats', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.user.userstats.UserStatsModel',
		'LPB.view.user.userstats.UserStatsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'userstats',
    */

    viewModel: {
        type: 'userstats'
    },

    controller: 'userstats',

    items: [
        /* include child components here */
    ]
});