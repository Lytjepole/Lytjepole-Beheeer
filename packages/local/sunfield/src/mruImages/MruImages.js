Ext.define('Ext.sunfield.mruImages.MruImages', {

    extend: 'Ext.form.FieldContainer',
    alias: 'widget.mruimages',
    mixins: {
        field: 'Ext.form.field.Field'
    },

    // configs
    store: null,
    imagesDir: null,
    userId: null,
    itemsToShow: 18,  // show 18 items by default

    layout: 'anchor',

    constructor: function (config) {
        this.callParent([config]);
    },

    initComponent: function () {
        var me = this,
            store = Ext.getStore(this.store);

        console.log(Ext.getStore(this.store));
        store.filter({
            property: 'ownerId',
            operator: '=',
            value: this.userId
        });
        store.sort({
            property: 'recentlyUsed',
            direction: 'DESC'
        });
        if (store.isLoaded() === false) {
            store.load();
        }

        me.items = me.setupItems();

        me.callParent();
        me.initField();
    },

    setupItems: function () {
        var me = this,
            store = Ext.getStore(me.store);


        me.dataview = Ext.create('Ext.view.View', {
            cls: 'mruimageviewer',
            overItemCls: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            store: store,
            height: 340,
            listeners: {
                scope: this,
                itemclick: this.itemSelected
            },
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap" id="{id}">',
                '<div class="thumb"><img src="resources/images/items/75x75/{imagePath:htmlEncode}" title="{imageName:htmlEncode}" /></div>',
                '<span class="x-editable">{shortName:htmlEncode}</span>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            prepareData: function (data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.imageName, 10),
                    image: data.imagePath
                });
                return data;
            }
        });

        return {
            items: [me.dataview]
        };
    },

    itemSelected: function (view, record, item, index, e, eOpts) {
        Ext.getCmp(this.imageFieldname).setValue(record.get('id'));
    }
});