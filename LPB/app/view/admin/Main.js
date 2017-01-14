/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.admin.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'LPB.view.admin.MainController',
        'LPB.view.admin.MainModel',
        'LPB.view.admin.MainWrap',
        'LPB.view.admin.users.Users',
        'LPB.view.admin.items.Items',
        'LPB.view.admin.locations.Locations',
        'LPB.view.admin.stats.Stats',
        'LPB.view.admin.service.Service',
        'LPB.view.admin.maintenance.UserImages',
        'LPB.view.admin.maintenance.LocationImages',
        'LPB.view.admin.maintenance.Templates',
        'LPB.view.admin.maintenance.templates.AddTemplate',
        'LPB.view.admin.maintenance.Settings',
        'LPB.view.admin.news.News',
        'LPB.view.admin.more.More',
        'LPB.view.admin.images.Images',
        'LPB.view.admin.home.Home',
        'LPB.view.admin.pages.Error404Window'
    ],

    xtype: 'adminmain',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    cls: 'sencha-dash-viewport',

    items: [{
        xtype: 'toolbar',
        cls: 'lytjepole-dash-dash-headerbar  toolbar-btn-shadow',
        height: 64,
        items: [{
            xtype: 'component',
            reference: 'lytjepoleHeaderLogo',
            cls: 'lytjepole-logo',
            width: 250,
            html: '<div class="main-logo"><img src="resources/images/logo/lytjepole_17x26.png">Lytjepole.nl</div>'
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
            expanderOnly: false,
            width: 250,
            singleExpand: true,
            store: 'adminTreeList',
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