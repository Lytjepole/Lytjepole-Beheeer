/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.more.More', {
    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.admin.more.MoreModel',
        'LPB.view.admin.more.MoreController'
    ],

    viewModel: {
        type: 'more'
    },

    controller: 'more',

    store: 'MoreItems',
    
    listeners: {
        afterrender: 'onMoreGridAfterRender'
    },

    columns: [{
        xtype: 'rownumberer',
        width: 50
    }, {
        dataIndex: 'title',
        flex: 1
    }, {
        dataIndex: 'subtitle',
        flex: 1
    }]
});