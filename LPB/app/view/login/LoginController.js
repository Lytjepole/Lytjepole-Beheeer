/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    /**
     * Called when the view is created
     */
    init: function () {

    },

    onLoginFormReset: function (btn) {
        this.getReferences().form.reset();
        this.getChallenge();
    },

    onLoginFormSubmit: function () {
        var me = this,
            refs = me.getReferences(),
            form = refs.form,
            win = form.up('window'),
            serverResponse,
            str,
            currentUser,
            data;

        if (form.isValid()) {
            win.mask('Gegevens controleren');
            data = form.getValues();
            data.userName = data.userName.toLowerCase();
            str = data.userName + ':' + LPB.util.sha256.hash(data.password) + ':' + data.challenge;
            data.response = LPB.util.sha256.hash(str);
            data.challenge = '';
            data.password = '';

            Ext.Ajax.request({
                scope: this,
                url: 'resources/data/user/login.php',
                method: 'POST',
                params: data,

                success: function (response) {
                    serverResponse = Ext.JSON.decode(response.responseText);
                    if (serverResponse.success) {
                        // login credentials valid, load userdata and create session in database
                        currentUser = Ext.create('LPB.model.User', {
                            'id': serverResponse.userId
                        });
                        currentUser.load({
                            scope: this,
                            success: function(user) {
                                win.destroy();
                                me.showMainUI(user);
                                this.createUserSession(serverResponse.sessionHash, user);
                            }
                        });

                    } else {
                        // credentials not ok
                        win.unmask();
                        this.setErrorMsg(serverResponse.messages);
                        this.getChallenge();
                    }
                },
                failure: function (response) {
                    serverResponse = Ext.JSON.decode(response.responseText);
                    this.setErrorMsg(serverResponse.messages);
                    win.unmask();
                    this.getChallenge();
                }
            });
        }
    },

    showMainUI: function (user) {
        var page;
        localStorage.setItem('lpbLoggedIn', true);
        localStorage.setItem('uid', user.get('id'));

        switch (user.get('accessLevel')) {
            case 1: // admin
                page = 'adminmain';
                break; // superuser
            case 2:
                page = 'adminmain';
                break;
            case 3:
                page = 'usermain';
                break;
            case 4: // user
                page = 'usermain';
                break;
        }

        Ext.create({
            xtype: page,
            plugins: 'viewport',
            viewModel: {
                data: {
                    currentUser: user.data
                }
            }
        });
    },

    createUserSession: function (sessionHash, user) {
        var data;
        data = {id: user.get('id'), accessLevel: user.get('accessLevel'), sessionHash: sessionHash};
        localStorage.setItem('lpbSessionHash', sessionHash);
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/user/session.php?action=createSession',
            method: 'POST',
            params: data
        });
    },

    setErrorMsg: function (messages) {
        var form = this.lookupReference('form');
        form.getForm().markInvalid([{
            field: 'userName',
            message: messages
        }, {
            field: 'password',
            message: messages
        }]);
    },

    onFormPanelLoad: function () {
        this.getChallenge();

    },

    getChallenge: function () {
        // get challenge from server and put value to hidden challenge field
        console.info('get challenge');
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/user/challenge.php',

            success: function (response) {
                var field;
                field = this.lookupReference('form').getForm().findField('challenge');
                field.setValue(response.responseText);
            },

            failure: function (response) {
                console.log('no valid serverresponse');
            }
        });
    }
});