/**
 * Created by Peter on 25-1-2016.
 */
Ext.define('LPB.store.UserTreeList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'userTreeList',

    root: {
        expanded: true,
        children: [{
            text: 'Home',
            view: 'userhome.UserHome',
            leaf: true,
            iconCls: 'right-icon new-icon x-fa fa-home',
            routeId: 'home'
        }, {
            text: 'Agenda',
            view: 'useritems.UserItems',
            leaf: true,
            iconCls: 'right-icon x-fa fa-calendar',
            routeId: 'items'
        }, {
            text: 'Locaties',
            view: 'userlocations.UserLocations',
            leaf: true,
            iconCls: 'right-icon hot-icon x-fa fa-map-marker',
            routeId: 'locations'
        }, {
            text: 'Afbeeldingen',
            view: 'userimages.UserImages',
            leaf: true,
            iconCls: 'right-icon x-fa fa-image',
            routeId: 'images'
        }, {
            text: 'Templates',
            view: 'usertemplates.UserTemplates',
            leaf: true,
            iconCls: 'right-icon x-fa fa-file-text-o',
            routeId: 'templates'
        }, {
            text: 'Statistieken',
            view: 'userstats.UserStats',
            leaf: true,
            iconCls: 'right-icon x-fa fa-bar-chart',
            routeId: 'stats'
        }]
    }

});