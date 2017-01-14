/**
 * Created by Peter on 1-1-2016.
 */
Ext.define('LPB.view.user.usertemplates.UserTemplates', {
    extend: 'Ext.grid.Panel',

    requires: [
        'LPB.view.user.usertemplates.UserTemplatesModel',
        'LPB.view.user.usertemplates.UserTemplatesController',
        'LPB.view.user.usertemplates.windows.AddTemplateUser',
        'LPB.view.user.usertemplates.windows.EditTemplateUser'

    ],

    reference: 'usertemplatesgrid',

    viewModel: {
        type: 'usertemplates'
    },

    controller: 'usertemplates',

    bind: {
        store: '{userTemplates}'
    },

    listeners: {
        itemdblclick: 'onItemDblClick'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddTemplateBtnClick'
            }
        }, {
            text: 'Wijzig',
            listeners: {
                click: 'onEditTemplateBtnClick'
            },
            bind: {
                disabled: '{!usertemplatesgrid.selection}'
            }
        }, {
            text: 'Verwijder',
            listeners: {
                click: 'onDeleteTemplateBtnClick'
            },
            bind: {
                disabled: '{!usertemplatesgrid.selection}'
            }
        }]
    }],

    hideHeaders: true,

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
    }]
});