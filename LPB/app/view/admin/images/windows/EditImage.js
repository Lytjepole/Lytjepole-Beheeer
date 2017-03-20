Ext.define('LPB.view.admin.images.windows.EditImage', {
    extend: 'Ext.window.Window',

    alias: 'editimagewindow',
    reference: 'editimagewindow',

    modal: true,
    width: 600,

    listeners: {
        beforeclose: 'onEditImageWindowBeforeClose'
    },

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            reference: 'editimageform',
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
                    fieldLabel: 'Titel',
                    name: 'imageName'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Fotograaf',
                    name: 'artist'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Gebruiker',
                    store: 'allUsers',
                    name: 'ownerId',
                    valueField: 'id',
                    displayField: 'fullName'
                }]
            }],

            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'opslaan',
                listeners: {
                    click: 'onSaveImageBtnClick'
                }
            }]
        }]

        this.callParent();
    }
});