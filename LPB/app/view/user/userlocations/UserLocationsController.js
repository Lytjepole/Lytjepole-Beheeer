/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userlocations.UserLocationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userlocations',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onAddLocationBtnClick: function () {
        var me = this,
            win;

        win = Ext.create({
            xtype: 'addlocationuser',
            userId: this.getViewModel().data.currentUser.id
        });
        win.show();
        this.getView().add(win);
    },

    onSubmitLocationBnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.addlocationwindow,
            form = refs.addlocationform,
            values = form.getValues(),
            store = Ext.getStore('ownLocations');

        values.userId = this.getViewModel().data.currentUser.id;

        console.log(refs);
        store.add(values);
        store.sync({
            success: function () {
                win.destroy();
            }
        });
    },

    onDeleteLocationBtnClick: function (btn) {
        var userId = this.getViewModel().data.currentUser.id,
            record = this.getView().getSelectionModel().getSelection()[0];

        if (record.get('userId') === userId) {
            this.deleteLocation(record);
        } else {
            Ext.Msg.alert({
                title: 'Fout',
                msg: 'Alleen eigen locaties kunnen worden gewijzigd',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        };
    },

    onEditLocationBtnClick: function () {
        var userId = this.getViewModel().data.currentUser.id,
            record = this.getView().getSelectionModel().getSelection()[0];

        if (record.get('userId') === userId) {
            this.showEditLocationWindow(record);
        } else {
            Ext.Msg.alert({
                title: 'Fout',
                msg: 'Alleen eigen locaties kunnen worden gewijzigd',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },

    onActionEditLocationClick: function (view, rowIndex, colIndex, item, e, record, row) {
        this.showEditLocationWindow(record);
    },

    onLocationDblClick: function (view, record) {
        var userId = this.getViewModel().data.currentUser.id;
        if (record.get('userId') === userId) {
            this.showEditLocationWindow(record);
        } else {
            Ext.Msg.alert({
                title: 'Fout',
                msg: 'Alleen eigen locaties kunnen worden gewijzigd',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },

    onActionDeleteLocationClick: function (view, rowIndex, colIndex, item, e, record, row) {
        this.deleteLocation(record);
    },

    showEditLocationWindow: function (record) {
        var win;


        win = Ext.create({
            xtype: 'editlocationuser',
            title: 'Locatie "' + record.get('name') + '" wijzigen',
            record: record,
            autoShow: true,
            userId: this.getViewModel().data.currentUser.id
        });
        this.getView().add(win);
        this.getReferences().editlocationform.getForm().loadRecord(record);
    },

    onSaveLocationBnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.editlocationwindow,
            form = refs.editlocationform,
            values = form.getValues(),
            record = form.getRecord();

        if (form.isValid() && form.isDirty()) {
            record.set(values);
            record.save({
                success: function () {
                    me.getView().remove(win);
                }
            });
        } else {
            // just close window
            me.getView().remove(win);
        }
    },

    deleteLocation: function (record) {
        var me = this,
            view = me.getView(),
            store = view.getStore();

        Ext.Msg.confirm({
            title: 'Locatie verwijderen?',
            msg: 'Locatie "' + record.get('name') + '" verwijderen?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);
                    store.sync();
                }
            }
        });
    },

    actionColumnDisabled: function () {
        console.log(arguments);
    }
});