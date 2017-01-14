Ext.define('LPB.view.admin.maintenance.settings.Groups', {
    extend: 'Ext.grid.Panel',

    xtype: 'groups',
    title: 'Groepen',

    store: 'Groups',
    hideHeaders: true,
    reference: 'groupsgrid',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: 'fa fa-plus'
        }, {
            iconCls: 'fa fa-edit',
            bind: {
                disabled: '{!groupsgrid.selection}'
            }
        }, {
            iconCls: 'fa fa-trash',
            bind: {
                disabled: '{!groupsgrid.selection}'
            }
        }]
    }],

    columns: [{
        xtype: 'rownumberer'
    }, {
        dataIndex: 'name',
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 60,
        items: [{
            iconCls: 'x-fa fa-edit',
            tooltip: 'Groep wijzigen'
        }, {
            iconCls: 'x-fa fa-remove',
            tooltip: 'Groep verwijderen'
        }]
    }]
});