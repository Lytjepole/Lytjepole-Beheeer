/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userlocations.UserLocations', {
    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.user.userlocations.UserLocationsModel',
        'LPB.view.user.userlocations.UserLocationsController',
        'LPB.view.user.userlocations.windows.EditUserLocation',
        'LPB.view.user.userlocations.windows.AddUserLocation'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'userlocations',
     */

    viewModel: {
        type: 'userlocations'
    },

    controller: 'userlocations',

    bind: {
        store: '{ownLocations}'
    },

    reference: 'userlocations',
    hideHeaders: true,

    listeners: {
        itemdblclick: 'onLocationDblClick'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddLocationBtnClick'
            }
        }, {
            text: 'Wijzig',
            listeners: {
                click: 'onEditLocationBtnClick'
            },
            bind: {
                disabled: '{!userlocations.selection}'
            }
        }, {
            text: 'Verwijder',
            listeners: {
                click: 'onDeleteLocationBtnClick'
            },
            bind: {
                disabled: '{!userlocations.selection}'
            }
        }]
    }],

    columns: [{
        xtype: 'rownumberer',
        width: 35
    }, {
        dataIndex: 'name',
        flex: 1
    }, {
        dataIndex: 'locationId',
        flex: 1,
        renderer: function (value, metaData, record) {
            var text;
            text = record.get('street') + (record.get('number') > 0 ? ' ' + record.get('number') : '');
            return text;
        }
    }, {
        xtype: 'actioncolumn',
        width: 75,
        items: [{
            iconCls: 'x-fa fa-edit',
            tooltip: 'Locatie wijzigen...',
            handler: 'onActionEditLocationClick'
        }, {
            iconCls: 'x-fa fa-remove',
            tooltip: 'Locatie verwijderen...',
            handler: 'onActionDeleteLocationClick'
        }]
    }]
});