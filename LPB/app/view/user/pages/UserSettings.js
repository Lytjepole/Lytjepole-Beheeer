Ext.define('LPB.view.user.pages.UserSettings', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersettings',

    modal: true,
    maximized: true,
    autoShow: true,
    titleAlign: 'center',

    cls: 'auth-locked-window',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    bind: {
        title: '{currentUser.fullName}'
    },

    controller: 'user',

    listeners: {
        close: 'onSettingsWindowClose'
    },
    
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            title: 'kiekeboe',
            width: 455,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Volledige naam'
            }, {
                xtype: 'textfield',
                name: 'fullName',
                bind: '{currentUser.fullName}'
            }]
        }]

        this.callParent();
    }
});