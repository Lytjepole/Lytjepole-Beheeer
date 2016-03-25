/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.news.News', {
    extend: 'Ext.Container',

    requires: [
        'LPB.view.admin.news.NewsModel',
		'LPB.view.admin.news.NewsController'
    ],

    /*
    Uncomment to give this component an xtype
    xtype: 'news',
    */

    viewModel: {
        type: 'news'
    },

    controller: 'news',

    items: [
        /* include child components here */
    ]
});