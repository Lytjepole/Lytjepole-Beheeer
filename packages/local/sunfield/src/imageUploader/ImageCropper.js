Ext.define('Ext.sunfield.imageUploader.ImageCropper', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.Img'
    ],

    //defaults
    minImageWidth: 1200,
    minImageHeight: 1200,
    thumbnailSize: [200, 200],
    imageSize: [600, 600],
    previewSize: [400, 300],
    preserveRatio: true,
    // end defaults

    alias: 'widget.imagecropper',
    id: 'imagecropper',

    defaultListenerScope: true,

    scope: this,

    initComponent: function () {
        var me = this,
            imageToCrop;

        me.preserveRatio = me.quadratic || me.preserveRatio;

        me.cropImage = document.createElement('img');

        me.cropImage.onload = (function () {
            // set image to this.items
            imageToCrop = Ext.getCmp('imageToCrop');
            me.up('window').unmask();
            imageToCrop.setSrc(me.cropImage.src);


            // add jQuery cropper
            jQuery(function () {
                $("#imageToCrop").Jcrop({
                    aspectRatio: 1,
                    bgColor: 'white',
                    minSize: [me.imageSize[0], me.imageSize[1]],
                    onSelect: me.getCoords,
                    onChange: me.getCoords,
                    setSelect: [100, 0, 700, 600]
                }, function () {
                    jcrop_api = this;
                    // Use the API to get the real image size
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];
                });

                $('#resetbutton').click(function (e) {
                    jcrop_api.animateTo([100, 0, 700, 600]);
                    return false;
                });
            });
        });

        this.items = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                iconCls: 'fa fa-crop',
                tooltip: 'reset crop',
                id: 'resetbutton'
            }, {
                text: 'another btn'
            }]
        }, {
            xtype: 'image',
            id: 'imageToCrop',
            alt: 'imagetocrop',
            width: me.previewSize[0],
            height: me.previewSize[1]
        }];

        this.buttons = [{
            text: 'Annuleer',
            handler: function (btn) {
                btn.up('window').close();
            }
        }, {
            text: 'Ok',
            handler: function (btn) {
                me.submitImage();
            }
        }];

        me.cropImage.src = me.imageProcessor + '?action=tmpimage&image=' + me.tmpName;

        me.callParent(arguments);
    },

    getCoords: function (c) {
        if (parseInt(c.w) > 0) {
            var cropData = {y: c.y, x: c.x, cropWidth: c.w, cropHeight: c.h};
            //console.log(this);
            Ext.getCmp('imagecropper').cropData = cropData;
        }
    },

    submitImage: function () {
        var me = this,
            win = Ext.getCmp('imageprepare'),
            store = Ext.getStore(me.imagesStore);

        win.mask('Gegevens verwerken...');

        me.cropData.tmpName = me.tmpName;
        me.cropData.uploadDir = me.uploadDir;
        me.cropData.tmpDir = me.tmpDir;
        me.cropData.imageFilename = me.imageFilename;
        me.cropData.thumbnailWidth = me.thumbnailSize[0];
        me.cropData.thumbnailHeight = me.thumbnailSize[1];
        me.cropData.imageWidth = me.imageSize[0];
        me.cropData.imageHeight = me.imageSize[1];
        me.cropData.thumbnailDir = me.thumbnailDir;
        me.cropData.originalFilename = me.originalFilename;

        store.suspendEvents(true);
        store.add({
            imagePath: me.cropData.originalFilename,
            params: me.cropData
        });
        store.sync({
            success: function (batch, options) {
                console.log('image sync success', batch, options);
                win.fireEvent('imageComplete', 'hallo');
                win.destroy();
                store.resumeEvents();
            },
            failure: function (response) {
                store.resumeEvents();
            }
        });
    }
});