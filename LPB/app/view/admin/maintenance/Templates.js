Ext.define('LPB.view.admin.maintenance.Templates', {

    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.admin.maintenance.MaintenanceController',
        'LPB.view.admin.maintenance.templates.AddTemplate',
        'LPB.view.admin.maintenance.templates.EditTemplate'
    ],

    store: 'TemplatesStore',

    controller: 'maintenance',

    reference: 'templatesgrid',

    listeners: {
        itemdblclick: 'onTplItemDblClick'
    },

    columns: [{
        xtype: 'rownumberer',
        width: 35
    }, {
        dataIndex: 'title',
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 100,
        items: [{
            iconCls: 'x-fa fa-edit',
            tooltip: 'Item wijzigen...',
            handler: 'onActionEditTplClick'
        }, {
            iconCls: 'x-fa fa-remove',
            tooltip: 'Item verwijderen...',
            handler: 'onActionDeleteTplClick'
        }]
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            iconCls: 'fa fa-plus',
            listeners: {
                click: 'onAddTplBtnClick'
            }
        }, {
            text: 'Wijzig',
            iconCls: 'fa fa-edit',
            listeners: {
                click: 'onEditTplBtnClick'
            },
            bind: {
                disabled: '{!templatesgrid.selection}'
            }
        }, {
            text: 'Verwijder',
            iconCls: 'fa fa-trash',
            listeners: {
                click: 'onDeleteTplBtnClick'
            },
            bind: {
                disabled: '{!templatesgrid.selection}'
            }
        }]
    }]
});