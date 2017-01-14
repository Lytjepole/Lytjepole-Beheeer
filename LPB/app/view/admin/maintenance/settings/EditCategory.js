Ext.define('LPB.view.admin.maintenance.settings.EditCategory', {
    extend: 'Ext.window.Window',
    alias: 'widget.editcategorywindow',
    reference: 'editcategorywindow',

    width: 500,

    listeners: {
        beforeclose: 'onEditCategoryWindowBeforeClose'
    },

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            reference: 'editcategoryform',
            trackResetOnLoad: true,
            bodyPadding: 10,
            listeners: {
                scope: this,
                afterrender: this.editCategoryFormAfterRender
            },
            defaults: {
                anchor: '100%',
                labelWidth: 150
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Titel',
                name: 'title'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ondertitel',
                name: 'subtitle'
            }, {
                xtype: 'checkboxfield',
                fieldLabel: 'Alleen voor eilanders',
                checkedValue: true,
                uncheckedValue: false,
                name: 'general'
            }],

            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    var form = btn.up('form');
                    if (form.isDirty()) {
                        Ext.Msg.show({
                            icon: Ext.Msg.confirm,
                            title: 'Venster sluiten?',
                            msg: 'weet je het zeker?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    form.up('window').destroy();
                                }
                            }
                        });
                    } else {
                        form.up('window').destroy();
                    }
                }
            }, {
                text: 'Ok',
                handler: 'onEditCategoryBtnOk'
            }]
        }];
        this.callParent();
    },

    editCategoryFormAfterRender: function (form) {
        form.getForm().loadRecord(this.record);
    }
});