Ext.define('LPB.model.MoreItem', {
    extend: 'LPB.model.Base',

    proxy: {
        reader: {
            rootProperty: 'moreitem'
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
        name: 'beginDate',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'endDate',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'source',
        type: 'string'
    }, {
        name: 'sourceLink',
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
        name: 'imageName',
        type: 'string'
    }, {
        name: 'imagePath',
        type: 'string'
    }, {
        name: 'locationId',
        type: 'int',
        reference: 'Location'
    }, {
        name: 'www',
        type: 'string'
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
        type: 'bool'
    }, {
        name: 'catPublished',
        type: 'bool'
    }, {
        name: 'catTitle',
        type: 'string'
    }, {
        name: 'catSubTitle',
        type: 'string'
    }, {
        name: 'categoryId',
        type: 'int',
        reference: 'Category'
    }]
});