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
            title: 'Gebruiker "' + user.get('fullName') + '" wijzigen'
        });
        this.getView().add(win);
        this.getReferences().edituserform.getForm().loadRecord(user);
    },

    onEditUserWindowBeforeClose: function (win) {
        //console.log('win closing...');

    },

    onEditUserFormSubmit: function (btn) {
        var me = this,
            refs = me.getReferences(),
            win = refs.edituserwindow,
            form = refs.edituserform.getForm(),
            values = form.getValues(),
            record = form.getRecord(),
            store = refs.usersview.getStore();

        if (form.isValid() && form.isDirty()) {
            //save changes
            record.set(values);
            record.save({
                scope: me,
                success: function () {
                    me.getView().remove(win);
                },
                failure: function (record, operation) {
                    var response;
                    response = Ext.decode(operation.getResponse().responseText);
                    store.reload();
                    Ext.toast({
                        title: 'Opslaan mislukt:',
                        closable: true,
                        html: response.messages[0].user,
                        align: 't',
                        autoClose: false
                    });
                }
            });
        } else {
            me.getView().remove(win);
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
            newUser,
            store = refs.usersview.getStore();
        refs.adduserwindow.mask('Gegevens verwerken...');

        //console.log(refs, user, record);
        newUser = Ext.create('LPB.model.User',
            values
        );

        newUser.save({
            scope: this,
            success: function (record, operation) {
                store.reload({
                    scope: this,
                    callback: function () {
                        refs.usersview.setSelection(record);
                    }
                });
                me.getView().remove(refs.adduserwindow);
            },
            failure: function (record, operation) {
                errors = Ext.decode(operation.getResponse().responseText).errors;
                Ext.iterate(errors, function (field, message) {
                    form.getForm().findField(field).markInvalid(message);
                });
                form.up('window').unmask();
            }
        });
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
        var me = this,
            refs = me.getReferences(),
            currentUser = me.getViewModel().getData().currentUser,
            store = refs.usersview.getStore(),
            selection = refs.usersview.getSelectionModel().getSelection(),
            response;

        this.getView().add(
            Ext.create('LPB.view.admin.users.windows.DeleteUserDialog', {
                autoShow: true,
                user: selection[0],
                store: Ext.clone(store),
                modal: true
            })
        );
    },

    onDeleteUserConfirmClick: function (btn) {
        var me = this,
            refs = me.getReferences(),
            user = refs.deleteuserdialog.user,
            store = refs.usersview.getStore(),
            toUserId = refs.deleteuserdialogform.getForm().findField('toUser').getValue();
        console.log('delete confirmed', user, toUserId);
        user.erase({
            params: {
                'toUserId': toUserId,
                'currentUserId': me.getViewModel().getData().currentUser.id
            },
            success: function (record, operation) {
                messages = Ext.decode(operation.getResponse().responseText).messages;
                refs.deleteuserdialog.destroy();
                Ext.iterate(messages, function (field, message) {
                    Ext.toast({
                        width: 400,
                        html: message,
                        align: 't'
                    });
                })
                store.reload();
            },
            failure: function (record, operation) {
                // erase failed
                var response;
                response = Ext.decode(operation.getResponse().responseText);
                refs.deleteuserdialog.destroy();
                store.reload();
                Ext.toast({
                    title: 'Gebruiker verwijderen mislukt:',
                    autoClose: false,
                    html: '- ' + response.messages[0].user,
                    align: 't',
                    width: 400,
                    closable: true,
                    iconCls: 'fa fa-trash-o'
                });
            }
        });
    },

    onAutoPassgenClick: function (btn) {
        var me = this,
            refs = me.getReferences();
        refs.adduserform.getForm().findField('password').setDisabled(btn.checked);
        refs.adduserform.getForm().findField('passwordrep').setDisabled(btn.checked);

    }
});