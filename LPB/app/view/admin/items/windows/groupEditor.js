Ext.define('LPB.view.admin.items.windows.groupEditor', {
    extend: 'Ext.window.Window',

    alias: 'groupeditor',

    width: 400,
    height: 450,
    title: 'Groepen bewerken',
    layout: 'fit',
    iconCls: 'fa fa-object-group',

    initComponent: function () {
        console.log(this.store);
        this.items = [{
            xtype: 'grid',
            hideHeaders: true,
            store: this.store,
            columns: [{
                dataIndex: 'name',
                flex: 1
            }, {
                xtype: 'actioncolumn',
                width: 57,
                items: [{
                    tooltip: 'Wijzig groep...',
                    iconCls: 'x-fa fa-edit'
                }, {
                    tooltip: 'Verwijder groep...',
                    iconCls: 'x-fa fa-remove'
                }]
            }],
            buttons: [{
                text: 'Toevoegen',
                iconCls: 'fa fa-plus'
            }, {
                xtype: 'tbfill'
            }, {
                text: 'Ok'
            }]
        }];

        this.callParent();
    }
});