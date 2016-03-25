/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.admin.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        name: 'Lytjepole',
        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Home',
                    leaf: true,
                    iconCls: 'x-fa right-icon fa-home',
                    view: 'home.Home',
                    routeId: 'home'
                }, {
                    text: 'Users',
                    iconCls: 'x-fa fa-user',
                    view: 'users.Users',
                    routeId: 'users',
                    children: [{
                        text: 'Tagged',
                        iconCls: 'x-fa fa-tag',
                        leaf: true
                    }, {
                        text: 'Inactive',
                        iconCls: 'x-fa fa-trash',
                        leaf: true
                    }]
                }, {
                    text: 'Groups',
                    iconCls: 'x-fa fa-group',
                    leaf: true
                }, {
                    text: 'Settings',
                    iconCls: 'x-fa fa-wrench',
                    children: [{
                        text: 'Sharing',
                        iconCls: 'x-fa fa-share-alt',
                        leaf: true
                    }, {
                        text: 'Notifications',
                        iconCls: 'x-fa fa-flag',
                        leaf: true
                    }, {
                        text: 'Network',
                        iconCls: 'x-fa fa-signal',
                        leaf: true
                    }]
                }]
            }
        }
    }
});