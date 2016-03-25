/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.user.User', {
    extend: 'Ext.container.Viewport',

    requires: [
        'LPB.view.user.UserModel',
        'LPB.view.user.UserController',
        'LPB.view.user.userhome.UserHome',
        'LPB.view.user.userimages.UserImages',
        'LPB.view.user.userlocations.UserLocations',
        'LPB.view.user.userstats.UserStats',
        'LPB.view.user.useritems.UserItems',
        'LPB.view.user.pages.Error404Window'
    ],

    xtype: 'usermain',

    viewModel: {
        type: 'user'
    },

    controller: 'user',

    listeners: {
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'lytjepole-dash-dash-headerbar  toolbar-btn-shadow',
        height: 64,
        items: [{
            xtype: 'component',
            reference: 'lytjepoleHeaderLogo',
            cls: 'lytjepole-logo',
            width: 250,
            html: '<div class="main-logo"><img src="resources/images/sencha-icon.png">Lytjepole.nl</div>'
        }, {
            margin: '0 0 0 8',
            cls: 'delete-focus-bg',
            iconCls: 'x-fa fa-navicon',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
            cls: 'delete-focus-bg',
            iconCls: 'x-fa fa-search',
            href: '#search',
            hrefTarget: '_self',
            tooltip: 'See latest search'
        }, {
            bind: '{currentUser.fullName}'
        }]
    }, {
        xtype: 'mainwrap',
        reference: 'mainWrap',
        itemId: 'mainWrap',
        flex: 1,
        items: [{
            xtype: 'treelist',
            ui: 'navigation',
            reference: 'treelist',
            itemId: 'treelist',
            expanderFirst: false,
            expanderOnly: true,
            width: 250,
            singleExpand: true,
            store: 'userTreeList',
            //bind: '{navItems}',
            listeners: {
                selectionchange: 'onTreelistSelectionChange'
            }
        }, {
            xtype: 'container',
            flex: 1,
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }]
    }]
});