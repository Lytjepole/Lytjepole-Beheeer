Ext.define('Ext.sunfield.locationSelect.LocationSelect', {
    extend : 'Ext.form.FieldContainer',
    alias: 'widget.locationselect',
    mixins : {
        field : 'Ext.form.field.Field'
    },

    //cls: '.x-locationselect',

    requires: [
        'Ext.button.Split',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.GMapPanel',
        'Ext.sunfield.locationSelect.LocationPicker'
    ],

    constructor : function(config) {

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
        console.log('btn clickjed', btn);

        this.picker = Ext.create('Ext.sunfield.locationSelect.LocationPicker', {
            autoShow: true
        });
    }
});