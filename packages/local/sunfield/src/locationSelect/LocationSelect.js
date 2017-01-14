Ext.define('Ext.sunfield.locationSelect.LocationSelect', {
    extend : 'Ext.form.FieldContainer',
    alias: 'widget.locationselect',
    mixins : {
        field : 'Ext.form.field.Field'
    },

    requires: [
        'Ext.button.Split',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.GMapPanel',
        'Ext.sunfield.locationSelect.LocationPicker'
    ],

    initLocation: [],
    defaultLocation: new google.maps.LatLng(53.478692755298205, 6.162159643620724),
    form: null,
    streetField: 'street',
    numberField: 'number',
    zipField: 'zip',
    cityField: 'city',
    latField: 'lat',
    lngField: 'lng',

    constructor : function (config) {

        this.callParent([config]);
    },

    initComponent: function () {
        var me = this;

        me.items = me.setupItems();

        me.callParent(arguments);
        me.initField();
    },

    setupItems: function () {
        var me = this;

        me.button = Ext.create('Ext.Button', {
            text: 'Kaart...',
            handler: function (btn) {
                me.onButtonClick(btn);
            }
        });
        return {
            items: [me.button]
        };
    },

    onButtonClick: function (btn) {
        var initLocation,
            form = Ext.getCmp(this.form).getForm();
        console.log('btn clickjed', form);

        this.initLocation.lat = form.findField(this.latField).getValue();
        this.initLocation.lng = form.findField(this.lngField).getValue();


        this.picker = Ext.create('Ext.sunfield.locationSelect.LocationPicker', {
            autoShow: true,
            initLocation: this.initLocation,
            defaultLocation: this.defaultLocation,
            listeners: {
                scope: this,
                submitLocation: this.submitLocation
            }
        });
    },

    submitLocation: function (data) {
        var me = this,
            form = Ext.getCmp(me.form).getForm();
        console.log(data);
        form.findField(me.streetField).setValue(data.street);
        form.findField(me.numberField).setValue(data.number);
        form.findField(me.zipField).setValue(data.zip);
        form.findField(me.cityField).setValue(data.city);
        form.findField(me.latField).setValue(data.lat);
        form.findField(me.lngField).setValue(data.lng);
        me.picker.destroy();
        me.initLocation = [];
    }
});