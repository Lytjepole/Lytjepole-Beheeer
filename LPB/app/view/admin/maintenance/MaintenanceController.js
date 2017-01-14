/**
 * Created by Peter on 20-9-2016.
 */
Ext.define('LPB.view.admin.maintenance.MaintenanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.maintenance',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onAddTplWindowBeforeClose: function (win) {
        var me = this,
            refs = me.getReferences();

        console.log(refs);
        if (refs.addtplform.isDirty()) {
            Ext.Msg.confirm(
                'Venster sluiten?',
                'weet je het zeker?',
                function (btn) {
                    if (btn === 'yes') {
                        win.destroy();
                    }
                }
            );
        } else {
            win.destroy();
        }
        return false;
    },

    onAddTplBtnClick: function (btn) {
        var me = this,
            win;
        win = Ext.create({
            xtype: 'addtemplatewindow',
            iconCls: 'fa fa-file-text-o',
            title: 'Template toevoegen',
            currentUser: me.getViewModel().data.currentUser
        });
        win.show();
        me.getView().add(win);

    },

    onAddTplFormSubmitBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.addtplform,
            values = form.getValues(),
            store = Ext.getStore('TemplatesStore');
        console.log(form, values);
        values.id = '';

        store.add(values);
        store.sync({
            success: function () {
                form.up('window').destroy();
            }
        });
    },

    onActionEditTplClick: function (grid, rowIndex, colIndex, item, e, record) {
        this.showEditTplWindow(record);
    },

    onEditTplBtnClick: function (btn) {
        record = this.getView().getSelectionModel().getSelection()[0];
        this.showEditTplWindow(record);
    },

    onTplItemDblClick: function (grid, record) {
        this.showEditTplWindow(record);
    },

    showEditTplWindow: function (record) {
        var me = this,
            win;
        win = Ext.create({
            xtype: 'edittemplatewindow',
            iconCls: 'fa fa-file-text-o',
            title: 'kiekeboe edit'
        });
        win.record = record;
        win.show();
        me.getView().add(win);
    },

    onEditTplFormSubmitBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.edittplform,
            values = form.getValues(),
            record = form.getRecord();
        console.log(refs);

        if (form.isDirty() && form.isValid()) {
            record.set(values);
            record.save({
                callback: function () {
                    me.getView().remove(refs.edittemplatewindow);
                }
            });
        }
    },

    onActionDeleteTplClick: function (grid, rowIndex, colIndex, item, e, record) {
        console.log(arguments);
        Ext.Msg.confirm(
            'Template verwijderen?',
            'Template "' + record.get('title') + '" verwijderen?',
            function (btn) {
                if (btn === 'yes') {
                    grid.getStore().remove(record);
                    grid.getStore().sync();
                }
            }
        );
    },

    onDeleteTplBtnClick: function (btn) {
        console.log(arguments);
    },

    //######################### methods for category editor #########################
    onActionMoveCatUp: function (view, rowIndex, colIndex, item, e, record) {
        console.log('clicked cat up');
        recordToMoveUp = view.getStore().getAt(rowIndex);
        recordToMoveUp.set('order', (record.get('order') - 1));

        recordToMoveDown = view.getStore().getAt(rowIndex - 1);
        recordToMoveDown.set('order', rowIndex);

        view.getStore().sync({
            success: function () {
                view.getStore().reload({
                    callback: function () {
                        console.log('store is reloaded');
                        //Ext.get(view.getStore().getAt(rowIndex)).highlight();
                     }
                });
            }
        });
    },

    onActionMoveCatDown: function (view, rowIndex, colIndex, item, e, record) {
        console.log('clicked cat down');
        var recordToMoveDown = view.getStore().getAt(rowIndex);
        var recordToMoveUp = view.getStore().getAt(rowIndex + 1);

        recordToMoveDown.set('order', rowIndex + 1);
        recordToMoveUp.set('order', rowIndex);
        view.getStore().sync({
            success: function () {
                console.log('store syncing');
                view.getStore().reload();
            }
        });
    },

    onToggleCatPublished: function (view, rowIndex, colIndex, item, e, record) {
        record.set('published', !record.get('published'));
        record.save();
    },

    onItemCategoryDblClick: function (grid , record , item , index , e , eOpts) {
        this.showEditCategoryWindow(record);
    },

    onActionEditCategoryClick: function (view, rowIndex, colIndex, item, e, record) {
        this.showEditCategoryWindow(record);
    },

    onEditCategoryBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences();
        me.showEditCategoryWindow(refs.categoriesgrid.getSelectionModel().getSelection()[0]);
    },

    showEditCategoryWindow: function (record) {
        var win = Ext.create('widget.editcategorywindow', {
            title: 'Wijzig categorie: ' + record.get('title'),
            modal: true,
            record: record
        });
        win.show();
        this.getView().add(win);
    },

    onEditCategoryWindowBeforeClose: function (win) {
        console.log(win);
    },

    onEditCategoryBtnOk: function () {
        var refs = this.getReferences(),
            form = refs.editcategoryform;

        if (form.isDirty() && form.isValid()) {
            // go save item
            record = form.getRecord();
            record.set(form.getValues());
            record.save({
                success: function () {
                    refs.editcategorywindow.destroy();
                }
            });
        }
    },

    onActionDeleteCategoryClick: function () {

    },

    onAddCategoryBtnClick: function (btn) {
        var win = Ext.create('widget.addcategorywindow', {
            title: 'Categorie toevoegen...'
        });
        win.show();
        this.getView().add(win);
    }

    //######################### end methods for category editor #########################
});