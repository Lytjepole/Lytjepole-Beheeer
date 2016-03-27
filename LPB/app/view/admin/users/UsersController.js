/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    /**
     * Called when the view is created
     */
    init: function () {
        console.info('user controller init');
    },

    onUsersCardRender: function () {
        var me = this,
            refs = me.getReferences();
        refs.usersview.getStore().load();
    },

    onEditUserBtnClick: function () {
        var refs = this.getReferences(),
            user;
        user = refs.usersview.getSelectionModel().getSelection()[0];
        this.showEditUSerWindow(user);
    },

    itemdblclick: function () {
        var refs = this.getReferences(),
            user;
        user = refs.usersview.getSelectionModel().getSelection()[0];
        this.showEditUSerWindow(user);
    },

    showEditUSerWindow: function (user) {
        var win = Ext.create('adminedituserwindow', {
            autoShow: true,
            title: user.get('fullName'),
            // width: 400,
            // height: 300
        });
        this.getView().add(win);
        this.getReferences().edituserform.getForm().loadRecord(user);
    },

    onEditUserWindowBeforeClose: function (win) {
        console.log('win closing...');

    },

    onEditUserFormSubmit: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.edituserwindow,
            form = refs.edituserform.getForm(),
            values = form.getValues(),
            record = form.getRecord();

        if (form.isValid() && form.isDirty()) {
            //save changes
            record.set(values);
            record.save({
                scope: me,
                success: function () {
                    me.getView().remove(win);
                }
            });
        }
    },

    onAddUserBtnClick: function () {
        var refs = this.getReferences();
        this.showAddUSerWindow();
    },

    showAddUSerWindow: function () {
        var win = Ext.create('adminadduserwindow', {
            title: 'Gebruiker toevoegen',
            iconCls: 'fa fa-user',
            width: 700
        });
        win.setStore(Ext.getStore('UserImages'));
        win.show();
        this.getView().add(win);

    },

    onAddUserFormSubmit: function (btn) {
        var me = this,
            refs = me.getReferences(),
            form = refs.adduserform,
            record = form.getForm().getRecord(),
            values = form.getValues(),
            user = Ext.create('LPB.model.User'),
            store = refs.usersview.getStore();

        console.log(refs, user, record);
        if (form.isValid()) {
            store.add(values);
            store.sync();
        }
    },

    onAddUserWindowBeforeClose: function (win) {
        var refs = this.getReferences();
        console.log(win.store);
        if (refs.adduserform.isDirty()) {
            Ext.Msg.confirm({
                scope: this,
                title: 'Gegevens opslaan?',
                msg: 'Wijzigingen opslaan?',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'no') {
                        this.getView().remove(win);
                    }
                }
            });
            return false;
        } else {
            this.getView().remove(win);
        }
    },

    onDeleteUserBtnClick: function () {
        var refs = this.getReferences();
        console.log(refs);
    },

    onAutoPassgenClick: function (btn) {
        var me = this,
            refs = me.getReferences();
        refs.adduserform.getForm().findField('password').setDisabled(btn.checked);
        refs.adduserform.getForm().findField('passwordrep').setDisabled(btn.checked);

    }
});