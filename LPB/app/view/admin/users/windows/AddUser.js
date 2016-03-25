Ext.define('LPB.view.admin.users.windows.AddUser', {
    extend: 'Ext.window.Window',

    alias: 'adminadduserwindow',

    modal: true,

    listeners: {
        beforeclose: 'onAddUserWindowBeforeClose'
    },

    config: {
        store: null
    },

    reference: 'adduserwindow',

    items: [{
        xtype: 'form',
        reference: 'adduserform',
        id: 'adduserform',
        bodyPadding: 10,
        layout: 'anchor',
        defaults: {
            anchor: '100%',
            labelWidth: 200
        },
        defaultType: 'textfield',

        items: [{
            name: 'userName',
            fieldLabel: 'Gebruikersnaam',
            allowBlank: false,
            vtype: 'alphanum',
            minLength: 3,
            maxLength: 64,
            emptyText: 'gebruikersnaam'
        }, {
            name: 'fullName',
            fieldLabel: 'Naam',
            allowBlank: false,
            minLength: 3,
            maxLength: 128,
            emptyText: 'naam'
        }, {
            name: 'phone',
            fieldLabel: 'Telefoon',
            emptyText: '0519531234'
        }, {
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email',
            emptyText: 'info@domein.nl',
            allowBlank: false
        }, {
            xtype: 'locationselect',
            fieldLabel: 'Zoek op kaart...',
            form: 'adduserform'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Straat / huisnummer',
            items: [{
                xtype: 'textfield',
                name: 'street',
                flex: 4,
                maxLength: 64,
                emptyText: 'straat'
            }, {
                xtype: 'textfield',
                name: 'number',
                flex: 1,
                margin: '0 0 0 5',
                maxLength: 5,
                emptyText: 'nummer'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Postcode / plaats',
            items: [{
                xtype: 'textfield',
                name: 'zip',
                flex: 1,
                maxLength: 7,
                emptyText: '9166 AA'
            }, {
                xtype: 'textfield',
                name: 'city',
                flex: 4,
                margin: '0 0 0 5',
                maxLength: 64,
                emptyText: 'Schiermonnikoog'
            }]
        }, {
            name: 'lat',
            hidden: true
        }, {
            name: 'lng',
            hidden: true
        }, {
            name: 'enabled',
            xtype: 'checkboxfield',
            fieldLabel: 'Vrijgeven',
            checked: true
        }, {
            xtype: 'checkboxfield',
            reference: 'autoPassGen',
            listeners: {
                change: 'onAutoPassgenClick'
            },
            checked: true,
            boxLabel: 'Automatisch genereren',
            name: 'autoPassGen',
            fieldLabel: 'Wachtwoord'
        }, {
            fieldLabel: 'Wachtwoord',
            name: 'password',
            id: 'initpass',
            inputType: 'password',
            disabled: true,
            maxLength: 20,
            minLength: 5
        }, {
            fieldLabel: 'Herhaal wachtwoord',
            name: 'passwordrep',
            inputType: 'password',
            disabled: true,
            //vtype: 'password',
            initialPassField: 'initpass'
        }, {
            fieldLabel: 'Afbeelding',
            value: 1,
            name: 'imageId',
            xtype: 'imagefield',
            store: 'UserImages'
        }],

        buttons: [{
            text: 'Reset',
            handler: function (btn) {
                btn.up('form').reset();
            }
        },{
            text: 'Annuleer',
            handler: function (btn) {
                btn.up('window').close();
            }
        }, {
            text: 'Opslaan',
            formBind: true,
            listeners: {
                click: 'onAddUserFormSubmit'
            }
        }]
    }]
});