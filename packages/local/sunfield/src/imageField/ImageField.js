Ext.define('Ext.sunfield.imageField.ImageField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.imagefield',
    mixins: {
        field: 'Ext.form.field.Field'
    },

    requires: [
        'Ext.sunfield.imageField.ImagePicker'
    ],
    // configs expected:
    store: null,
    imagesDir: 'resources/images/items/', // default
    tmpDir: 'resources/images/temp/', // default
    setThumbnail: true,  // set false if no thumbnail required
    thumbnailSize: [75, 75], // default thumbnailsize 75 x 75 px
    imageSize: [150, 150], // default imageSize 150 x 150 px
    minRes: [600, 600], // default minumum resolution for source file
    maxFileSize: 10000, //default max file size: 10kB
    userId: null,

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
                    me.image.setSrc(me.imagesDir + me.imageData.get('imagePath'));
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
        var me = this,
            store = Ext.getStore(this.store);

        if (store.isLoaded() === false) {
            store.load();
        }

        me.items = me.setupItems();

        me.callParent();
        me.initField();
    },

    imageClick: function () {
        Ext.create('Ext.sunfield.imageField.ImagePicker', {
            autoShow: true,
            store: this.store,
            currentImageId: this.value,
            imagesDir: this.imagesDir,
            userId: this.userId,
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
            alt: 'default logo',
            width: 100,
            height: 100,
            userId: me.userId,
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