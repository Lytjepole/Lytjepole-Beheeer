/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.locations.LocationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.locations',

    /**
     * Called when the view is created
     */
    init: function () {
        Ext.getStore('UsersStore').load();
    },

    onAddItemBtnClick: function () {
        this.showAddLocationWindow();
    },

    showAddLocationWindow: function () {
        var win = Ext.create({
            xtype: 'addlocationwindow',
            autoShow: true,
            width: 700
        });
        this.getView().add(win);
        win.down('form').getForm().findField('userId').setValue(this.getViewModel().data.currentUser.id);
    },

    onSaveNewLocationBnClick: function (btn) {
        var me = this,
            refs = this.getReferences(),
            form = refs.addlocationform,
            win = refs.addlocationwindow,
            view = refs.locationsview,
            store = view.getStore(),
            values = form.getValues(),
            newLocation;

        values.ownerId = me.getViewModel().getData().currentUser.id;

        if (form.isValid() && form.isDirty()) {
            // go save new location
            win.mask('Gegevens verwerken...');
            store.add(values);
            store.sync({
                success: function (batch, options) {
                    console.log(batch, options);
                    win.destroy();
                },
                failure: function (batch, options) {
                    store.reload();
                    win.unmask();
                }
            });
        }

        console.log(refs);
    },

    onLocationsCardRender:  function () {
        var refs = this.getReferences();
        refs.locationsview.getStore().load();
    },

    itemdblclick: function (view, selection) {
        this.showEditLocationWindow(selection);
    },

    onEditItemBtnClick: function (btn) {
        var refs = this.getReferences(),
            selection;

        selection = refs.locationsview.getSelectionModel().getSelection();
        this.showEditLocationWindow(selection[0]);
    },

    showEditLocationWindow: function (record) {
        var refs = this.getReferences(),
            win;

        win = Ext.create({
            xtype: 'editlocationwindow',
            autoShow: true,
            width: 700,
            title: 'Locatie "' + record.get('name') + '" wijzigen'
        });

        this.getView().add(win);
        this.getReferences().editlocationform.getForm().loadRecord(record);
    },

    beforecloseAddLocation: function (win) {
        // check if form dirty
    },

    beforecloseEditLocation: function (win) {
        var refs = this.getReferences(),
            form = refs.editlocationform
        console.log('before close event', win);
        if (form.isDirty()) {
            console.log('show msg');
            Ext.Msg.confirm({
                scope: this,
                title: 'Lytjepole Beheer',
                msg: 'Wijzigingen opslaan?',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        console.log('save changes');
                        this.onSaveLocationBnClick();
                    } else {
                        win.destroy();
                    }
                }
            });
            return false;
        } else {
            win.destroy();
        }
    },

    onSaveLocationBnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.editlocationform,
            win = refs.editlocationwindow,
            record = form.getRecord(),
            values = form.getValues();

        //values.ownerId = me.getViewModel().data.currentUser.id;
        console.log('save changes...', refs);
        if (form.isValid() && form.isDirty()) {
            console.log('go save');
            record.set(values);
            record.save({
                success: function () {
                    me.getView().remove(win);
                },
                failure: function () {
                    
                }
            });

        } else {
            console.log('just close');
            this.getView().remove(win);
        }
    },

    onDeleteItemBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            record = refs.locationsview.getSelectionModel().getSelection()[0],
            store = refs.locationsview.getStore();

        Ext.Msg.show({
            title: 'Locatie verwijderen',
            message: 'Locatie "' + record.get('name') + '" verwijderen?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);
                    store.sync();
                }
            }
        });
    }
});