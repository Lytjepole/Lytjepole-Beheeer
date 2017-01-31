/**
 * Created by Peter on 10-1-2016.
 */
Ext.define('LPB.view.user.usertemplates.UserTemplatesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usertemplates',

    /**
     * Called when the view is created
     */
    init: function () {
        console.log('tpl controller init');
        // load all locations store
        //Ext.getStore('allLocations').load();
    },

    onAddTemplateBtnClick: function () {
        this.showAddTemplateWindow();
    },

    onEditTemplateBtnClick: function () {
        var me = this,
            refs = me.getReferences(),
            record;

        record = this.getView().getSelectionModel().getSelection()[0];
        this.showEditTemplateWindow(record);
    },

    onDeleteTemplateBtnClick: function () {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            record = view.getSelectionModel().getSelection()[0];

        Ext.Msg.confirm({
            title: 'Template verwijderen?',
            msg: 'Template "' + record.get('title') + '" verwijderen?',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);
                    store.sync();
                }
            }
        });
    },

    onItemDblClick: function (view, item) {
        this.showEditTemplateWindow(item);
    },

    onActionEditTplClick: function (view, rowIndex, colIndex, item, e, record) {
        this.showEditTemplateWindow(record);
    },

    onActionDeleteTplClick: function (view, rowIndex, colIndex, item, e, record) {
        Ext.Msg.confirm({
            title: 'Template verwijderen?',
            msg: 'Template "' + record.get('title') + '" verwijderen?',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    view.getStore().remove(record);
                    view.getStore().sync();
                }
            }
        });
    },

    showAddTemplateWindow: function () {
        var win;

        win = Ext.create({
            xtype: 'addtemplateuser',
            userId: this.getViewModel().data.currentUser.id
        });
        win.show();
        this.getView().add(win);
    },

    showEditTemplateWindow: function (record) {
        var win;

        win = Ext.create({
            xtype: 'edittemplateuser',
            title: 'Template "' + record.get('title') + '" wijzigen',
            userId: this.getViewModel().data.currentUser.id,
            record: record
        });
        win.show();
        this.getView().add(win);
    },

    onEditTemplateWindowBeforeClose: function (win) {
        console.log('before close');
    },

    onSaveEditTemplateBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.edittemplatewindow,
            form = refs.edittplform,
            record,
            values;

        if (form.isValid() && form.isDirty()) {
            // go save
            values = form.getValues();
            record = form.getRecord();
            record.set(values);
            record.save({
                success: function () {
                    me.getView().remove(win);
                }
            });
        } else {
            // just close
            me.getView().remove(win);
        }
    },

    onAddTemplateWindowBeforeClose: function (win) {
        var me = this,
            refs = me.getReferences();
        console.log('beforeclose');
        if (refs.addtplform.isDirty()) {
            console.log('form is dirty');
            Ext.Msg.confirm({
                title: 'Venster sluiten?',
                msg: 'Weet je het zeker?',
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        refs.addtemplatewindow.destroy();
                    }
                }
            });
            return false;
        }
    },

    onSaveTemplateBtnClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.addtplform,
            values = form.getValues(),
            record,
            store = Ext.getStore('userTemplates'),
            win = refs.addtemplatewindow;

        console.log(refs);

        if (form.isValid()) {
            // go save
            values.userId = this.getViewModel().data.currentUser.id;
            store.add(values);
            store.sync({
                success: function () {
                    win.destroy();
                },
                failure: function () {

                }
            });
        }
    }
});