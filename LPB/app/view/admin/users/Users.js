/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.users.Users', {
    extend: 'Ext.Panel',

    requires: [
        'LPB.view.admin.users.UsersModel',
        'LPB.view.admin.users.UsersController',
        'LPB.view.admin.users.windows.EditUser',
        'LPB.view.admin.users.windows.AddUser',
        'LPB.view.admin.users.windows.DeleteUserDialog',
        'Ext.form.FieldContainer'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'users',
     */

    viewModel: {
        type: 'users'
    },

    controller: 'users',

    listeners: {
        render: 'onUsersCardRender'
    },

    layout: 'fit',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddUserBtnClick'
            }

        }, {
            text: 'Wijzig',
            listeners: {
                click: 'onEditUserBtnClick'
            },
            bind: {
                disabled: '{!usersview.selection}'
            }
        }, {
            text: 'Verwijder',
            bind: {
                disabled: '{!usersview.selection}'
            },
            listeners: {
                click: 'onDeleteUserBtnClick'
            }
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: 'UsersStore',
        dock: 'bottom',
        displayInfo: true
    }],

    items: [{
        xtype: 'dataview',
        store: 'UsersStore',
        reference: 'usersview',
        trackOver: true,
        itemSelector: 'div.thumb-wrap',
        overItemCls: 'x-item-over',
        autoScroll: true,

        cls: 'usersviewer',

        listeners: {
            itemdblclick: 'itemdblclick'
        },

        tpl: [
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{id}">',
            '<div class="userthumbnail"><img src="resources/images/users/{imagePath:htmlEncode}"/></div>',
            '<div class="name">{name:htmlEncode}</div>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],

        prepareData: function (data) {
            Ext.apply(data, {
                name: Ext.util.Format.ellipsis(data.fullName, 40)
            });
            return data;
        }
    }]
});