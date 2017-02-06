Ext.define('LPB.view.admin.maintenance.settings.AddCategory', {
    extend: 'Ext.window.Window',
    alias: 'widget.addcategorywindow',
    reference: 'addcategorywindow',

    width: 500,

    listeners: {
        beforeclose: 'onAddCategoryWindowBeforeClose'
    },

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            reference: 'addcategoryform',
            trackResetOnLoad: true,
            bodyPadding: 10,
            // listeners: {
            //     scope: this,
            //     //afterrender: this.editCategoryFormAfterRender
            // },
            defaults: {
                anchor: '100%',
                labelWidth: 100
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Titel',
                name: 'title'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Ondertitel',
                name: 'subtitle'
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
                handler: 'onAddCategoryBtnOk'
            }]
        }];
        this.callParent();
    },

    editCategoryFormAfterRender: function (form) {
        form.getForm().loadRecord(this.record);
    }
});