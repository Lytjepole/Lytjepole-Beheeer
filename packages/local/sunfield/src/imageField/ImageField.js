Ext.define('Ext.sunfield.imageField.ImageField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.imagefield',
    mixins: {
        field: 'Ext.form.field.Field'
    },

    requires: [
        'Ext.sunfield.imageField.ImagePicker'
    ],

    layout: 'anchor',

    constructor: function (config) {
        this.callParent([config]);
    },

    setValue: function (value) {
        var me = this,
            store = Ext.getStore(me.store),
            imageId;
        me.value = value;

        if (value > 0) {
            store.load({
                callback: function (records, operation, success) {
                    imageId = store.findExact('id', value);
                    me.imageData = records[imageId];
                    me.image.setSrc('resources/images/users/' + me.imageData.get('imagePath'));
                }
            });
        } else {
            Ext.getStore(me.store).load();
        }
    },

    getValue: function () {
        return this.value;
    },

    initComponent: function () {
        console.info('imagefield init', this.store);
        var me = this;

        me.items = me.setupItems();

        me.callParent();
        me.initField();
    },

    imageClick: function () {
        Ext.create('Ext.sunfield.imageField.ImagePicker', {
            autoShow: true,
            store: this.store,
            listeners: {
                scope: this,
                imageselected: this.selectImage
            }
        });
    },

    selectImage: function (image) {
        this.setValue(image.get('id'));
    },

    setupItems: function () {
        var me = this;

        me.image = Ext.create('Ext.Img', {
            src: Ext.getResourcePath('images/user.jpg', null, 'sunfield'),
            tooltip: 'klik om een afbeelding te selecteren...',
            alt: 'user logo',
            width: 100,
            height: 100,
            style: {
                clear: 'both',
                display: 'block',
                border: '4px solid #f5f5f5'
            },
            listeners: {
                el: {
                    click: function () {
                        me.imageClick();
                    }
                }
            }
        });

        return {
            items: [me.image]
        };
    }
});