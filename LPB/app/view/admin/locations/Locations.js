/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.locations.Locations', {
    extend: 'Ext.Panel',

    requires: [
        'LPB.view.admin.locations.LocationsModel',
        'LPB.view.admin.locations.LocationsController',
        'LPB.view.admin.locations.windows.EditLocation',
        'LPB.view.admin.locations.windows.AddLocation'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'locations',
     */

    viewModel: {
        type: 'locations'
    },

    controller: 'locations',

    listeners: {
        render: 'onLocationsCardRender'
    },

    layout: 'fit',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddItemBtnClick'
            }
        }, {
            text: 'Wijzigen',
            listeners: {
                click: 'onEditItemBtnClick'
            },
            bind: {
                disabled: '{!locationsview.selection}'
            }
        }, {
            text: 'Verwijder',
            bind: {
                disabled: '{!locationsview.selection}'
            }
        }]
    }, {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        store: 'Locations'
    }],

    items: [{
        xtype: 'dataview',
        store: 'Locations',
        reference: 'locationsview',
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
            '<div class="userthumbnail"><img src="resources/images/locations/{imagePath:htmlEncode}"/></div>',
            '<div class="name">{name:htmlEncode}</div>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],

        prepareData: function (data) {
            Ext.apply(data, {
                name: Ext.util.Format.ellipsis(data.name, 40)
            });
            return data;
        }
    }]
});