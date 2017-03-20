/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userimages.UserImagesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userimages',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onImagesCardRender: function (card) {
        var refs = this.getReferences();
        // console.log(refs.imageViewer.getStore().isLoaded());
        // if (refs.imageViewer.getStore().isLoaded()) {
        //     refs.imageViewer.getStore().load();
        // }
    },

    onAddImageBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences();

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
            imagesStore: 'userImages',
            userId: this.getViewModel().data.currentUser.id
        });

        this.getView().add(win);
    },

    onItemDblClick: function (view, item) {
        this.showEditImageWindow(item);
    },

    onEditImageBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            record;
        record = refs.imageViewer.getSelectionModel().getSelection()[0];

        this.showEditImageWindow(record);
    },

    showEditImageWindow: function (record) {
        var me = this,
            win;

        win = Ext.create('editimagewindowuser', {
            title: 'Afbeelding "' + record.get('imageName') + '" wijzigen',
            iconCls: 'fa fa-image',
            record: record
        });
        win.show();
        me.getView().add(win);
        me.getReferences().editimageuserform.loadRecord(record);
    },

    onEditImageWindowBeforeClose: function (win) {
        var me = this,
            refs = me.getReferences(),
            win = refs.editimageuser,
            form = refs.editimageuserform;
        if (form.isDirty()) {
            Ext.Msg.confirm({
                title: 'Wijzigingen opslaan?',
                msg: 'Wijzigen opslaan?',
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        // save changes
                        record = form.getRecord();
                        values = form.getValues();
                        record.set(values);
                        record.save();
                        me.getView().remove(win);
                    } else {
                        me.getView().remove(win);
                    }
                }
            });
            return false;
        }
    },

    onSaveImageBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.editimageuser,
            form = refs.editimageuserform,
            record,
            values;

        if (form.isValid() && form.isDirty()) {
            record = form.getRecord();
            values = form.getValues();
            record.set(values);
            record.save({
                success: function (record, operation) {
                    me.getView().remove(win);
                },
                failure: function (record, operation) {
                    
                }
            });
        } else {
            me.getView().remove(win);
        }
    },

    onDeleteImageBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
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