/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userhome.UserHome', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.user.userhome.UserHomeModel',
		'LPB.view.user.userhome.UserHomeController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'userhome',
    */

    viewModel: {
        type: 'userhome'
    },

    controller: 'userhome',

    items: [
        {html: 'userhome'}
    ]
});