Ext.define('LPB.view.user.userimages.windows.EditImageUser', {
    extend: 'Ext.window.Window',

    alias: 'editimagewindowuser',
    reference: 'editimageuser',

    modal: true,
    width: 600,

    listeners: {
        beforeclose: 'onEditImageWindowBeforeClose'
    },

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            reference: 'editimageuserform',
            trackResetOnLoad: true,
            layout: 'hbox',
            bodyPadding: 10,

            items: [{
                xtype: 'image',
                width: 150,
                height: 150,
                src: 'resources/images/items/' + this.record.get('imagePath'),
                alt: this.record.get('imageName')
            }, {
                flex: 1,
                layout: 'anchor',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 125
                },
                items: [{
                    xtype: 'textfield',
                    name: 'imageName',
                    fieldLabel: 'Titel'
                }, {
                    xtype: 'textfield',
                    name: 'artist',
                    fieldLabel: 'Fotograaf'
                }]
            }],

            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Opslaan',
                listeners: {
                    click: 'onSaveImageBtnClick'
                }
            }]
        }];

        this.callParent();
    }
});