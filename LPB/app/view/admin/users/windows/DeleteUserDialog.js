Ext.define('LPB.view.admin.users.windows.DeleteUserDialog', {
    extend: 'Ext.window.Window',

    alias: 'deleteuserdialog',
    reference: 'deleteuserdialog',

    width: 450,
    title: 'Gebruiker verwijderen',
    iconCls: 'fa fa-trash-o',

    config: {
        user: null,
        store: null
    },

    initComponent: function () {
        //this.store.remove(this.user);

        this.items = [{
            xtype: 'form',
            reference: 'deleteuserdialogform',
            anchor: '100%',
            layout: 'hbox',
            bodyPadding: 5,
            items: [{
                margin: '20 20 20 10',
                xtype: 'image',
                src: 'resources/images/icons/icon-warning.png',
                alt: 'icon warning',
                width: 32,
                height: 32
            }, {
                bodyPadding: 5,
                layout: 'vbox',
                flex: 1,
                items: [{
                    xtype: 'container',
                    html: 'Gebruiker "' + this.user.get('fullName') + '" verwijderen?<br>De items van deze gebruiker verplaatsen naar:'
                }, {
                    padding: '8 0 0 0',
                    xtype: 'combobox',
                    name: 'toUser',
                    store: this.store,
                    width: 300,
                    emptyText: 'Kies een gebruiker...',
                    displayField: 'fullName',
                    forceSelection: true,
                    allowBlank: false,
                    autoSelect: true,
                    queryMode: 'local',
                    valueField: 'id',
                    listeners: {
                        scope: this,
                        render: this.comboboxShow
                    }
                }]
            }],
            buttons: [{
                text: 'Verwijder',
                formBind: true,
                listeners: {
                    click: 'onDeleteUserConfirmClick'
                }
            }, {
                text: 'Annuleer',
                handler: function (btn) {
                    console.log(btn.up('window').store.reload());
                    btn.up('window').destroy();
                }
            }]
        }];

        this.callParent(arguments);
    },

    comboboxShow: function (combo, opts) {
        var store,
            user;
        //console.log('combo showing', this);
        store = combo.getStore();
        user = this.user;
        store.suspendEvents(false);
        store.remove(user);
        store.resumeEvents();
    }
});