/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userimages.UserImages', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.user.userimages.UserImagesModel',
		'LPB.view.user.userimages.UserImagesController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'userimages',
    */

    viewModel: {
        type: 'userimages'
    },

    controller: 'userimages',

    items: [
        /* include child components here */
    ]
});