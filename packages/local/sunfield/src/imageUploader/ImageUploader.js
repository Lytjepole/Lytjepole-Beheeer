/**
 * Created by Peter on 6-2-2016.
 */
Ext.define('Ext.sunfield.imageUploader.ImageUploader', {
    extend: 'Ext.window.Window',

    alias: 'widget.imageuploader',

    requires: [
        'Ext.sunfield.imageUploader.ImagePrepare',
        'Ext.sunfield.imageUploader.ImageCropper'
    ],

    title: 'Afbeelding selecteren',
    iconCls: 'fa fa-image',

    width: 600,

    modal: true,

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            reference: 'uploadImageForm',
            method: 'POST',
            url: this.imageProcessor + '?action=createtmpimage',
            bodyPadding: 20,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth: 200
            },
            items: [{
                xtype: 'container',
                margin: '2 0 5 5',
                html: 'Afbeeldingen in formaat: *.jpg, *.gif of *.png, met een minimale resolutie van 600x600 pixels.<br>De maximale bestandsgrootte is 10MB.'
            }, {
                xtype: 'fileuploadfield',
                fieldLabel: 'Kies afbeelding',
                allowBlank: false,
                name: 'image',
                msgTarget: 'under'
            }],
            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').destroy();
                }
            }, {
                text: 'Afbeelding uploaden...',
                formBind: true,
                listeners: {
                    scope: this,
                    click: this.submitForm
                }
            }]
        }];

        this.loadJQuery();

        this.callParent(arguments);
    },

    loadJQuery: function () {
        //load scripts for jQuery & Jcrop
        console.info('loading scripts...');
        if (typeof jQuery === 'undefined') {
            // jQuery is not loaded
            var jQueryScript = document.createElement('script'),
                jCropScript = document.createElement('script'),
                head = document.getElementsByTagName('head')[0],
                body = document.getElementsByTagName('body')[0];

            jQueryScript.type = 'text/javascript';
            jQueryScript.onload = function (me) {
                // after jQuery load init jCrop
                console.info('jQuery loaded!');
                jCropScript.type = 'text/javascript';
                jCropScript.onload = function (me) {
                    console.info('jCrop loaded!');
                };
                jCropScript.async = true;
                //jCropScript.src = 'http://deepliquid.com/Jcrop/js/jquery.Jcrop.min.js';
                jCropScript.src = 'http://jcrop-cdn.tapmodo.com/v0.9.12/js/jquery.Jcrop.min.js';
                (body || head).appendChild(jCropScript);


            };
            jQueryScript.async = true;
            jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            (head || body).appendChild(jQueryScript);
        }
    },

    submitForm: function (btn) {
        var me = this,
            form = me.down('form'),
            jsonData,
            editor;

        if (form.isValid()) {
            form.submit({
                scope: me,
                params: {
                    tmpDir: me.tmpDir,
                    minImageWidth: me.minImageWidth,
                    minImageHeight: me.minImageHeight
                },
                waitMsg: 'Afbeelding uploaden...',
                success: function (fp, response) {
                    jsonData = Ext.JSON.decode(response.response.responseText);
                    this.hide();
                    editor = Ext.create({
                        xtype: 'imageprepare',
                        tmpName: jsonData.data.tmpName,
                        tmpDir: me.tmpDir,
                        extension: jsonData.data.extension,
                        originalFilename: jsonData.data.originalFilename,
                        uploadDir: me.uploadDir,
                        minImageWidth: me.minImageWidth,
                        minImageHeight: me.minImageHeight,
                        imageSize: me.imageSize,
                        previewSize: me.previewSize,
                        thumbnailSize: me.thumbnailSize,
                        thumbnailDir: me.thumbnailDir,
                        imageProcessor: me.imageProcessor,
                        imagesStore: me.imagesStore,
                        userId: me.userId
                    });
                    editor.mask('Afbeelding voorbereiden...');
                },
                failure: function (fp, response) {
                    console.log('upload failed');
                }
            });
        }
    }
});