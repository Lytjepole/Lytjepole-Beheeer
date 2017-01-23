Ext.define('LPB.model.Group', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'group'
        },
        writer: {
            rootProperty: 'group'
        }
    },

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'subtitle',
        type: 'string'
    }, {
        name: 'order',
        type: 'int'
    }, {
        name: 'icon',
        type: 'string'
    }]
});