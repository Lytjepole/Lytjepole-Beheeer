/**
 * Created by Peter on 6-2-2016.
 */
Ext.define('Ext.sunfield.imageUploader.ImagePrepare', {
    extend: 'Ext.window.Window',

    alias: 'widget.imageprepare',
    reference: 'imageprepare',

    id: 'imageprepare',

    maximized: true,
    modal: true,
    closable: true,

    autoShow: true,

    title: 'Afbeelding voorbereiden',
    iconCls: 'fa fa-edit',
    titleAlign: 'center',

    layout: {
        type: 'hbox'
    },

    listeners: {
        beforeclose: function (win) {
            Ext.Msg.confirm({
                title: 'Sluit editor?',
                msg: 'Editor afsluiten?',
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        win.destroy();
                        win.deleteTmpImage(win);
                    }
                }
            });
            return false;
        }
    },

    initComponent: function () {
        this.items = [{
            xtype: 'panel',
            flex: 1
        }, {
            xtype: 'imagecropper',
            width: 800,
            tmpDir: this.tmpDir,
            tmpName: this.tmpName,
            uploadDir: this.uploadDir,
            imageFilename: this.originalFilename,
            originalFilename: this.originalFilename,
            imageSize: this.imageSize,
            previewSize: this.previewSize,
            minImageWidth: this.minImageWidth,
            minImageHeight: this.minImageHeight,
            imageProcessor: this.imageProcessor,
            thumbnailSize: this.thumbnailSize,
            thumbnailDir: this.thumbnailDir,
            imagesStore: this.imagesStore,
            userId: this.userId
        }, {
            xtype: 'panel',
            flex: 1
        }];

        this.callParent(arguments);
    },

    deleteTmpImage: function (win) {
        Ext.Ajax.request({
            url: this.imageProcessor + '?action=cleantmpimage&tmpimage=' + this.tmpName
        });
    }
});