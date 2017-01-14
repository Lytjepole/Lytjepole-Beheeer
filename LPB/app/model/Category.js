Ext.define('LPB.model.Category', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'category'
        },
        writer: {
            rootProperty: 'category'
        }
    },

    fields: [{
        name: 'title',
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
    }, {
        name: 'published',
        type: 'boolean'
    }, {
        name: 'general',
        type: 'boolean'
    }]
});