Ext.define('Ext.sunfield.groupEditor.EditGroup', {
    extend: 'Ext.window.Window',

    alias: 'widget.editgroup',
    iconCls: 'fa fa-object-group',
    title: 'Groep wijzigen',

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
            id: 'groupeditorform',
            layout: 'anchor',
            bodyPadding: 10,

            listeners: {
                scope: this,
                afterrender: this.afterEditorRender
            },

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
                        record = form.getRecord(),
                        values = form.getValues();
                    if (form.isValid() && form.isDirty()) {
                        // go save changes
                        record.set(values);
                        record.save({
                            success: function () {
                                win.destroy();
                            }
                        });
                    } else {
                        // just close
                        win.destroy();
                    }
                }
            }]
        }];

        this.callParent();
    },

    afterEditorRender: function () {
        this.down('form').loadRecord(this.record);
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