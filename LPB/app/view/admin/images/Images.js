/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.images.Images', {
    extend: 'Ext.Panel',

    requires: [
        'LPB.view.admin.images.ImagesModel',
        'LPB.view.admin.images.ImagesController',
        'LPB.view.admin.images.windows.EditImage'
    ],

    viewModel: {
        type: 'images'
    },

    controller: 'images',

    listeners: {
        render: 'onImagesCardRender'
    },

    layout: 'responsivecolumn',

    bodyPadding: 18,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddImageButtonClick'
            }
        }, {
            text: 'Wijzig',
            disabled: true,
            bind: {
                disabled: '{!imageViewer.selection}'
            },
            listeners: {
                click: 'onEditImageButtonClick'
            }
        }, {
            text: 'Verwijder',
            disabled: true,
            bind: {
                disabled: '{!imageViewer.selection}'
            },
            listeners: {
                click: 'onDeleteImageButtonClick'
            }
        }, {
            xtype: 'tbseparator'
        }, {
            text: 'Zoek'
        }]
    }, {
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        store: 'LPB.store.Images',
        displayInfo: true
    }],

    items: [{
        responsiveCls: 'big-100, small-100',
        xtype: 'dataview',
        reference: 'imageViewer',
        store: 'LPB.store.Images',
        autoScroll: false,
        trackOver: true,
        overItemCls: 'x-item-over',

        minWidth: 400,
        minHeight: 200,

        cls: 'imageviewer',

        listeners: {
           itemdblclick: 'itemDblClick'
        },

        itemSelector: 'div.thumb-wrap',
        tpl: [
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{id}">',
            '<div class="thumb"><img src="resources/images/items/{imagePath:htmlEncode}" title="{imageName:htmlEncode}" /></div>',
            '<span class="x-editable">{shortName:htmlEncode}</span>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],

        prepareData: function (data) {
            Ext.apply(data, {
                shortName: Ext.util.Format.ellipsis(data.imageName, 20),
                image: data.imagePath
            });
            return data;
        }
    }]
});