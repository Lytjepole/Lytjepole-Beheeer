/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.view.user.userimages.UserImages', {
    extend: 'Ext.Panel',

    requires: [
        'LPB.view.user.userimages.UserImagesModel',
        'LPB.view.user.userimages.UserImagesController',
        'LPB.view.user.userimages.windows.EditImageUser'
    ],

    /*
     Uncomment to give this component an xtype
     xtype: 'userimages',
     */

    viewModel: {
        type: 'userimages'
    },

    controller: 'userimages',

    listeners: {
        render: 'onImagesCardRender'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Toevoegen',
            listeners: {
                click: 'onAddImageBtnClick'
            }
        }, {
            text: 'Wijzig',
            bind: {
                disabled: '{!imageViewer.selection}'
            },
            listeners: {
                click: 'onEditImageBtnClick'
            }
        }, {
            text: 'Verwijder',
            bind: {
                disabled: '{!imageViewer.selection}'
            },
            listeners: {
                click: 'onDeleteImageBtnClick'
            }
        }]
    }],

    items: [{
        xtype: 'dataview',
        listeners: {
            itemdblclick: 'onItemDblClick'
        },
        bind: {
            store: '{userImages}'
        },
        reference: 'imageViewer',
        cls: 'imageviewer',
        overItemCls: 'x-item-over',
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