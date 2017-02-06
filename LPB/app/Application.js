/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define("LPB.Application", {
    extend: "Ext.app.Application",

    name: 'LPB',

    models: [
        'Base',
        'User',
        'Image',
        'UserImage',
        'LocationImage',
        'AccessLevel',
        'Location',
        'CalendarItem',
        'MoreItem',
        'Category',
        'Group',
        'Template'
    ],

    stores: [
        // TODO: add global / shared stores here
        'LPB.store.AdminTreeList',
        'LPB.store.UserTreeList',
        'LPB.store.Images',
        'LPB.store.Users',
        'LPB.store.Locations',
        'LPB.store.Items',
        'MoreItems',
        'Categories',
        'Groups',
        'Templates'
    ],

    //defaultToken: 'home',

    launch: function () {
        // check logins and show login screen or main app
        var loggedIn,
            sessionHash,
            jsonResponse,
            userId;

        'use strict';

        // declare global vtypes
        Ext.apply(Ext.form.field.VTypes, {
            singleDayEventText: 'Eindtijd moet na begintijd liggen',
            singleDayEvent: function () { // event on single day: 1) endtime > begintime 2) begindate >= today
                var form = Ext.getCmp('additemform').getForm(),
                    beginDateField = form.findField('beginDate'),
                    beginTimeField = form.findField('beginTime'),
                    endDateField = form.findField('endDate'),
                    endTimeField = form.findField('endTime'),
                    result;

                beginDateField.clearInvalid();
                result = (endTimeField.getValue() > beginTimeField.getValue());

                if (result) {
                    beginDateField.clearInvalid();
                    beginTimeField.clearInvalid();
                    endDateField.clearInvalid();
                    endTimeField.clearInvalid();
                } else {
                    beginDateField.clearInvalid();
                    endDateField.clearInvalid();
                    beginTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                    endTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                }
                Ext.getCmp('adddatebtn').setDisabled(!result);

                return result;
            },

            multiDayEventText: 'Einddatum moet na begindatum liggen',
            multiDayEvent: function () { // event on multiple days: 1) enddate > begindate
                var form = Ext.getCmp('additemform').getForm(),
                    beginDateField = form.findField('beginDate'),
                    beginTimeField = form.findField('beginTime'),
                    endDateField = form.findField('endDate'),
                    endTimeField = form.findField('endTime'),
                    result;

                result = (endDateField.getValue() > beginDateField.getValue());

                if (result) {
                    beginDateField.clearInvalid();
                    beginTimeField.clearInvalid();
                    endDateField.clearInvalid();
                    endTimeField.clearInvalid();
                } else {
                    beginTimeField.clearInvalid();
                    endTimeField.clearInvalid();
                    beginDateField.markInvalid('Einddatum moet na begindatum liggen');
                    endDateField.markInvalid('Einddatum moet na begindatum liggen');
                }

                Ext.getCmp('adddatebtn').setDisabled(!result);

                return result;
            },

            templateTimeText: 'Eindtijd moet na begintijd liggen',
            templateTime: function (value, field) {
                var form = field.up('form'),
                    beginTimeField = form.getForm().findField('beginTime'),
                    endTimeField = form.getForm().findField('endTime');

                if (beginTimeField.getValue() >= endTimeField.getValue()) {
                    endTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                    beginTimeField.markInvalid('Eindtijd moet na begintijd liggen');
                    return false;
                } else {
                    beginTimeField.clearInvalid();
                    endTimeField.clearInvalid();
                    return true;
                }
            }
        });


        // step 1: check if localStorage values are present
        loggedIn = localStorage.getItem('lpbLoggedIn');
        sessionHash = localStorage.getItem('lpbSessionHash');
        userId = localStorage.getItem('uid');

        if (loggedIn && (sessionHash !== null) && (userId !== null)) {
            // step 2: localstorage set, check with database for valid session
            Ext.Ajax.request({
                scope: this,
                url: 'resources/data/user/session.php?action=checkSession&sessionHash=' + sessionHash,

                success: function (response) {
                    console.info('valid response from server'); // valid response not perse a valid session
                    jsonResponse = Ext.JSON.decode(response.responseText);
                    if (jsonResponse.success) {
                        // valid session try to restore ui
                        this.showMainUI(jsonResponse);
                    } else {
                        // session not valid, lets show login window
                        this.destroyLocalValues();
                        this.showLoginWindow();
                    }
                },
                failure: function (response) {
                    console.info('invalid response from server');
                }
            });
        } else {
            console.info('no valid session found');
            this.destroyLocalValues();
            this.showLoginWindow();
        }

    },

    showMainUI: function (data) {
        // show app main ui for given user
        var currentUser,
            page;
        currentUser = Ext.create('LPB.model.User', {
            id: data.id
        });

        currentUser.load({
            success: function (user) {
                // choose main layout by accesslevel
                switch (user.get('accessLevel')) {
                    case 1: // admin
                        page = 'LPB.view.admin.Main';
                        break;
                    case 2: // superuser
                        page = 'LPB.view.admin.Main';
                        break;
                    case 3: // user
                        page = 'LPB.view.user.User';
                        break;
                    case 4: // spare
                        page = 'LPB.view.user.User';
                        break;
                }
                Ext.create(page, {
                    viewModel: {
                        data: {
                            currentUser: user.data
                        }
                    }
                });
                //update session in database
                Ext.Ajax.request({
                    url: 'resources/data/user/session.php?action=updateSession',
                    method: 'POST',
                    params: data
                });
                // todo: also set new cookie expire date
            },
            failure: function (response) {
                console.log('invalid response');
            }
        });
    },

    showLoginWindow: function () {
        // show initial login window
        console.info('showing login');
        Ext.create({
            xtype: 'login',
            autoShow: true
        });
    },

    destroyLocalValues: function () {
        localStorage.removeItem('lpbLoggedIn');
        localStorage.removeItem('lpbSessionHash');
        localStorage.removeItem('uid');

    },

    destroySession: function () {

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
