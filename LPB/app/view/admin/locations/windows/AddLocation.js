Ext.define('LPB.view.admin.locations.windows.AddLocation', {
    extend: 'Ext.window.Window',

    alias: 'addlocationwindow',
    xtype: 'addlocationwindow',
    reference: 'addlocationwindow',

    modal: true,
    iconCls: 'fa fa-map-marker',
    title: 'Locatie toevoegen',

    listeners: {
        beforeclose: 'beforecloseAddLocation'
    },

    items: [{
        xtype: 'form',
        userId: this.userId,
        reference: 'addlocationform',
        id: 'addlocationform',
        layout: 'anchor',
        bodyPadding: 10,

        defaults: {
            anchor: '100%',
            labelWidth: 200
        },
        defaultType: 'textfield',

        items: [{
            name: 'name',
            fieldLabel: 'Naam',
            emptyText: 'naam',
            allowBlank: false
        }, {
            xtype: 'locationselect',
            fieldLabel: 'Zoek op kaart...',
            form: 'addlocationform',
            latField: 'lat',
            lngField: 'lng'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Straat / huisnummer',
            items: [{
                xtype: 'textfield',
                name: 'street',
                flex: 4,
                emptyText: 'straatnaam'
            }, {
                xtype: 'textfield',
                name: 'number',
                flex: 1,
                margin: '0 0 0 5',
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
                emptyText: 'postcode'
            }, {
                xtype: 'textfield',
                name: 'city',
                flex: 4,
                margin: '0 0 0 5',
                emptyText: 'plaats'
            }]
        }, {
            name: 'lat',
            hidden: true
        }, {
            name: 'lng',
            hidden: true
        }, {
            name: 'email',
            fieldLabel: 'Email',
            emptyText: 'email (info@website.nl)',
            vtype: 'email'
        }, {
            name: 'phone',
            fieldLabel: 'Telefoon',
            emptyText: 'telefoon'
        }, {
            name: 'www',
            fieldLabel: 'Website',
            emptyText: 'website (http://www.website.nl)',
            vtype: 'url'
        }, {
            name: 'imageId',
            xtype: 'imagefield',
            fieldLabel: 'Afbeelding',
            store: 'LocationImages',
            imagesDir: 'resources/images/locations/'
        }, {
            name: 'userId',
            value: this.userId,
            fieldLabel: 'Gebruiker',
            xtype: 'combobox',
            store: 'UsersStore',
            valueField: 'id',
            displayField: 'fullName',
            forceSelection: true
        }],

        buttons: [{
            text: 'Reset',
            handler: function (btn) {
                btn.up('window').down('form').reset();
            }
        }, {
            text: 'Annuleer',
            handler: function (btn) {
                btn.up('window').close();
            }

        }, {
            text: 'Opslaan',
            formBind: true,
            listeners: {
                click: 'onSaveNewLocationBnClick'
            }
        }]
    }]
});