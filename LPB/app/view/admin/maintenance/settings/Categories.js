Ext.define('LPB.view.admin.maintenance.settings.Categories', {
    extend: 'Ext.grid.Panel',

    xtype: 'categories',

    title: 'Categorieën',
    store: 'Categories',
    hideHeaders: true,

    reference: 'categoriesgrid',

    listeners: {
        itemdblclick: 'onItemCategoryDblClick'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: 'fa fa-plus',
            handler: 'onAddCategoryBtnClick'
        }, {
            iconCls: 'fa fa-edit',
            handler: 'onEditCategoryBtnClick',
            bind: {
                disabled: '{!categoriesgrid.selection}'
            }
        }, {
            iconCls: 'fa fa-trash',
            bind: {
                disabled: '{!categoriesgrid.selection}'
            }
        }]
    }, {
        xtype: 'statusbar',
        dock: 'bottom'
    }],

    columns: [{
        xtype: 'rownumberer',
        width: 35
    }, {
        dataIndex: 'title',
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 125,
        items: [{
            getClass: function (value, metadata, record, row, col, store) {
                return record.get('published') ? 'x-fa fa-check' : 'x-fa fa-ban';
            },
            getTip: function (value, metadata, record, row, col, store) {
                return record.get('published') ? 'categorie is gepubliceerd' : 'categorie is niet gepubliceerd';
            },
            handler: 'onToggleCatPublished'
        }, {
            iconCls: 'x-fa fa-edit',
            tooltip: 'Categorie wijzigen...',
            handler: 'onActionEditCategoryClick'
        }, {
            iconCls: 'x-fa fa-remove',
            tooltip: 'Categorie verwijderen...',
            handler: 'onActionDeleteCategoryClick'
        }, {
            iconCls: 'x-fa fa-arrow-up',
            tooltip: 'move up',
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                return (rowIndex === 0);
            },
            handler: 'onActionMoveCatUp'
        }, {
            iconCls: 'x-fa fa-arrow-down',
            tooltip: 'move down',
            isDisabled: function (view, rowIndex, colIndex, item, record) {
                count = view.getStore().getCount();
                return (count === (rowIndex + 1));
            },
            handler: 'onActionMoveCatDown'
        }]
    }]
});