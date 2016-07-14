Ext.define('LPB.view.admin.locations.windows.EditLocation', {
    extend: 'Ext.window.Window',

    alias: 'editlocationwindow',
    xtype: 'editlocationwindow',
    reference: 'editlocationwindow',

    modal: true,
    iconCls: 'fa fa-map-marker',
    title: 'Locatie wijzigen',

    listeners: {
        beforeclose: 'beforecloseEditLocation'
    },

    items: [{
        xtype: 'form',
        reference: 'editlocationform',
        id: 'editlocationform',
        trackResetOnLoad: true,
        layout: 'anchor',
        bodyPadding: 10,

        defaults: {
            anchor: '100%',
            labelWidth: 200
        },
        defaultType: 'textfield',

        items: [{
            name: 'name',
            fieldLabel: 'Naam'
        }, {
            xtype: 'locationselect',
            fieldLabel: 'Zoek op kaart...',
            form: 'editlocationform',
            latField: 'lat',
            lngField: 'lng'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Straat / huisnummer',
            items: [{
                xtype: 'textfield',
                name: 'street',
                flex: 4
            }, {
                xtype: 'textfield',
                name: 'number',
                flex: 1,
                margin: '0 0 0 5'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Postcode / plaats',
            items: [{
                xtype: 'textfield',
                name: 'zip',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'city',
                flex: 4,
                margin: '0 0 0 5'
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
            vtype: 'email'
        }, {
            name: 'phone',
            fieldLabel: 'Telefoon'
        }, {
            name: 'www',
            fieldLabel: 'Website',
            vtype: 'url'
        }, {
            name: 'imageId',
            xtype: 'imagefield',
            fieldLabel: 'Afbeelding',
            store: 'LocationImages',
            imagesDir: 'resources/images/locations/'
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
            listeners: {
                click: 'onSaveLocationBnClick'
            }
        }]
    }]
});