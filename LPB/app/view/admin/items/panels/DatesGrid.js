Ext.define('LPB.view.admin.items.panels.DatesGrid', {
    extend: 'Ext.form.FieldContainer',

    mixins: {
        field: 'Ext.form.field.Field'
    },

    alias: 'widget.datesgrid',

    initComponent: function () {
        var me = this;

        me.store = Ext.create('Ext.data.Store', {
            storeId: 'dateStore',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'beginDate',
                type: 'date'
            }, {
                name: 'endDate',
                type: 'date'
            }],

            autoLoad: true,
            // scope: this,
            // listeners: {
            // //     scope: this,
            //     datachanged: this.selectionChanged
            // }
        });

        // me.store.on({
        //     datachanged: me.storeChanged
        // });

        this.items = [{
            xtype: 'grid',
            title: 'Kiekeboe',
            store: me.store
        }]

        this.callParent();
    }
});