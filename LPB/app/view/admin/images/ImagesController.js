/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.images.ImagesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.images',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onAddImageButtonClick: function (btn, opts) {
        var win;
        win = Ext.create({
            xtype: 'imageuploader',
            autoShow: true,
            tmpDir: '../../images/temp/',
            uploadDir: 'resources/images/items/',
            thumbnailDir: 'resources/images/items/75x75',
            thumbnailSize: [75, 75],
            imageSize: [150, 150],
            previewSize: [800, 600],
            minImageWidth: 600,
            minImageHeight: 600,
            imageProcessor: 'resources/data/image/image.php',
            imagesStore: 'ImagesStore'
        });

        this.getView().add(win);
    },

    onEditImageButtonClick: function (btn, opts) {
        var me = this,
            refs = me.getReferences();

        record = refs.imageViewer.getSelectionModel().getSelection()[0];
        this.showImageEditWindow(record);
    },

    itemDblClick: function (grid, item) {
        this.showImageEditWindow(item);
    },

    showImageEditWindow: function (record) {
        win = Ext.create('editimagewindow', {
            title: record.get('imageName'),
            iconCls: 'fa fa-image',
            autoShow: true,
            width: 500,
            height: 300
        });
    },

    onImagesCardRender: function (card) {
        var me = this,
            refs = me.getReferences();

        if (!refs.imageViewer.getStore().isLoaded()) {
            refs.imageViewer.getStore().load();
        }
    },

    onDeleteImageButtonClick: function (btn, opts) {
        var refs = this.getReferences(),
            records = refs.imageViewer.getSelectionModel().getSelection();

        Ext.Msg.confirm({
            scope: this,
            title: 'Afbeelding verwijderen?',
            msg: 'Afbeelding "' + records[0].get('imageName') + '" verwijderen?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.deleteImages(records);
                }
            }
        });
    },

    deleteImages: function (records) {
        var me = this,
            refs = me.getReferences(),
            store = refs.imageViewer.getStore();
        store.remove(records);
        store.sync();
    }
});