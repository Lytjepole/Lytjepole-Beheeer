Ext.define('LPB.view.admin.users.windows.EditUser', {
    extend: 'Ext.window.Window',

    alias: 'adminedituserwindow',
    reference: 'edituserwindow',

    modal: true,
    iconCls: 'fa fa-user',
    width: 700,

    listeners: {
        beforeclose: 'onEditUserWindowBeforeClose'
    },

    items: [{
        xtype: 'form',
        trackResetOnLoad: true,
        reference: 'edituserform',
        id: 'edituserform',
        bodyPadding: 10,
        layout: 'anchor',
        defaults: {
            anchor: '100%',
            labelWidth: 200
        },
        defaultType: 'textfield',

        items: [{
            xtype: 'displayfield',
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
            xtype: 'combobox',
            name: 'accessLevel',
            fieldLabel: 'Toegang',
            queryMode : 'local',
            displayField: 'description',
            valueField: 'accessLevel',
            store: 'AccessLevels'
            // bind: {
            //     store: '{accessLevels}'
            // }
        }, {
            fieldLabel: 'Afbeelding',
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
                click: 'onEditUserFormSubmit'
            }
        }]
    }]
});