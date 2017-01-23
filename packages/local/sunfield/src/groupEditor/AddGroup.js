Ext.define('Ext.sunfield.groupEditor.AddGroup', {
    extend: 'Ext.window.Window',

    alias: 'widget.addgroup',
    iconCls: 'fa fa-object-group',
    title: 'Groep toevoegen',

    width: 600,
    modal: true,
    layout: 'fit',

    initComponent: function () {
        this.listeners = {
            beforeclose: this.beforeEditorClose
        };

        this.items = [{
            xtype: 'form',
            trackResetOnLoad: true,
            id: 'groupaddform',
            layout: 'anchor',
            bodyPadding: 10,

            defaults: {
                anchor: '90%',
                labelWidth: 120
            },
            defaultType: 'textfield',

            items: [{
                fieldLabel: 'Naam',
                allowBlank: false,
                name: 'name'
            }, {
                fieldLabel: 'Omschrijving',
                name: 'description'
            }],

            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Ok',
                formBind: true,
                handler: function (btn) {
                    var form = btn.up('form'),
                        win = form.up('window'),
                        values = form.getValues(),
                        store = Ext.getCmp('groupeditortool').selector.getStore();

                    values.userId = win.userId;
                    values.imageId = win.imageId;
                    store.add(values);
                    store.sync({
                        success: function () {
                            win.destroy();
                            Ext.getCmp('groupeditortool').selector.fromField.bindStore(store);
                        }
                    });
                }
            }]
        }];

        this.callParent();
    },

    beforeEditorClose: function (win) {
        var form = win.down('form');
        if (form.isDirty()) {
            Ext.Msg.confirm({
                title: 'Venster sluiten?',
                msg: 'Venster sluiten? De wijzigingen gaan verloren.',
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        win.destroy();
                    }
                }
            });
            return false;
        }
    }
});