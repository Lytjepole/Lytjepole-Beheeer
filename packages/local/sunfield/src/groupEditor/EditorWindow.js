Ext.define('Ext.sunfield.groupEditor.EditorWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.editorwindow',

    modal: true,
    width: 400,
    height: 600,
    layout: 'fit',

    title: 'Groepen',
    iconCls: 'fa fa-object-group',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'grid',
            store: this.store,
            hideHeaders: true,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    iconCls: 'fa fa-plus',
                    tooltip: 'Groep Toevoegen...',
                    handler: function () {
                        Ext.create({
                            autoShow: true,
                            xtype: 'addgroup',
                            store: me.store,
                            userId: me.userId,
                            imageId: me.imageId
                        });
                    }
                }]
            }],

            columns: [{
                dataIndex: 'name',
                flex: 1
            }, {
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Groep wijzigen...',
                    handler: function (view, rowIndex, colIndex, item, e, record) {
                        Ext.create({
                            xtype: 'editgroup',
                            autoShow: true,
                            record: record,
                            title: 'Groep "' + record.get('name') + '" wijzigen'
                        });
                    }
                }, {
                    iconCls: 'x-fa fa-remove',
                    tooltip: 'Groep verwijderen...',
                    handler: function (view, rowIndex, colIndex, item, e, record) {
                        Ext.Msg.confirm({
                            title: 'Groep verwijderen?',
                            msg: 'Groep "' + record.get('name') + '" verwijderen?',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    record.erase();
                                }
                            }
                        });
                    }
                }]
            }],

            buttons: [{
                text: 'Ok',
                handler: function (btn) {
                    btn.up('window').destroy();
                }
            }]
        }];

        this.callParent();
    }
});