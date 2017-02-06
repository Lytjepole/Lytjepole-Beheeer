Ext.define('LPB.model.Template', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'template'
        },
        writer: {
            rootProperty: 'template'
        }
    },

    fields: [{
        name: 'title',
        type: 'string'
    }, {
        name: 'subtitle',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'beginTime'
        // type: 'date',
        // dateFormat: 'H:i'
    }, {
        name: 'endTime'
        // type: 'date',
        // dateFormat: 'H:i'
    }, {
        name: 'source',
        type: 'string'
    }, {
        name: 'sourceURL',
        type: 'string'
    }, {
        name: 'userId',
        type: 'int',
        reference: 'User'
    }, {
        name: 'imageId',
        type: 'int',
        reference: 'Image'
    }, {
        name: 'locationId',
        type: 'int',
        reference: 'Location'
    }, {
        name: 'shortLocation',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'highlight',
        type: 'boolean'
    }, {
        name: 'created',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'lastEdited',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'published',
        type: 'boolean'
    }, {
        name: 'imagePath',
        type: 'string'
    }, {
        name: 'imageName',
        type: 'string'
    }, {
        name: 'artist',
        type: 'string'
    }, {
        name: 'recentlyUsed',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'street',
        type: 'string'
    }, {
        name: 'number',
        type: 'string'
    }, {
        name: 'zip',
        type: 'string'
    }, {
        name: 'city',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'lat',
        type: 'string'
    }, {
        name: 'lng',
        type: 'string'
    }, {
        name: 'markerType',
        type: 'int'
    }, {
        name: 'general',
        type: 'bool'
    }, {
        name: 'embargo',
        type: 'bool'
    }, {
        name: 'embargoEnd',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'permanent',
        type: 'bool'
    }, {
        name: 'category',
        type: 'int'
    }, {
        name: 'group',
        type: 'int'
    }]
});