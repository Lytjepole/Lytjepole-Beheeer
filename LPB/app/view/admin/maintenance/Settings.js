Ext.define('LPB.view.admin.maintenance.Settings', {

    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.maintenance.settings.Categories',
        'LPB.view.admin.maintenance.settings.EditCategory',
        'LPB.view.admin.maintenance.settings.DeleteCategory',
        'LPB.view.admin.maintenance.settings.AddCategory',
        'LPB.view.admin.maintenance.settings.Groups'
    ],

    layout: 'responsivecolumn',

    controller: 'maintenance',

    items: [{
        xtype: 'categories',
        responsiveCls: 'big-50 small-100',
        height: 600
    }, {
        xtype: 'groups',
        responsiveCls: 'big-50 small-100',
        height: 600
    }]
});