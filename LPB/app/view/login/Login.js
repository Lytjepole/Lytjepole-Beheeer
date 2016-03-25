/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.login.Login', {
    extend: 'Ext.window.Window',

    requires: [
        'LPB.view.login.LoginModel',
        'LPB.view.login.LoginController'
    ],

    xtype: 'login',

    viewModel: {
        type: 'login'
    },

    controller: 'login',

    title: 'Lytjepole Beheer inloggen',
    closable: false,
    movable: false,
    resizable: false,
    draggable: false,

    listeners: {
        show: 'onFormPanelLoad'
    },

    items: [{
        xtype: 'form',
        reference: 'form',
        bodyPadding: 10,
        layout: 'hbox',

        items: [{
            xtype: 'image',
            width: 100,
            height: 100,
            title: 'Logo lytjepole.nl',
            src: 'resources/images/logo/lytjepole.png',
            alt: 'logo lytjepole.nl'
        }, {


            items: [{
                xtype: 'textfield',
                name: 'userName',
                fieldLabel: 'Gebruiker',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Wachtwoord',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'challenge',
                allowBlank: false,
                hidden: true
            }, {
                xtype: 'textfield',
                name: 'response',
                hidden: true
            }]
        }],

        buttons: [{
            text: 'Reset',
            listeners: {
                click: 'onLoginFormReset'
            }
        },{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginFormSubmit'
            }
        }]
    }]
});