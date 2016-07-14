/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.store.AdminTreeList', {
    extend: 'Ext.data.TreeStore',

    storeId: 'adminTreeList',

    root: {
        expanded: true,
        children: [{
            text: 'Home',
            view: 'home.Home',
            leaf: true,
            iconCls: 'right-icon new-icon x-fa fa-home',
            routeId: 'home'
        }, {
            text: 'Gebruikers',
            view: 'users.Users',
            leaf: true,
            iconCls: 'right-icon x-fa fa-users',
            routeId: 'users'
        }, {
            text: 'Locaties',
            view: 'locations.Locations',
            leaf: true,
            iconCls: 'right-icon x-fa fa-map-marker',
            routeId: 'locations'
        }, {
            text: 'Afbeeldingen',
            view: 'images.Images',
            leaf: true,
            iconCls: 'right-icon x-fa fa-image',
            routeId: 'images'
        }, {
            text: 'Agenda',
            view: 'items.Items',
            leaf: true,
            iconCls: 'right-icon x-fa fa-calendar',
            routeId: 'items'
        }, {
            text: 'Meer te doen',
            view: 'more.More',
            leaf: true,
            iconCls: 'right-icon x-fa fa-binoculars',
            routeId: 'more'
        }, {
            text: 'Service',
            view: 'service.Service',
            leaf: true,
            iconCls: 'right-icon x-fa fa-info',
            routeId: 'service'
        }, {
            text: 'Onderhoud',
            leaf: false,
            routeId: 'maintenance',
            iconCls: 'right-icon x-fa fa-cogs',
            expanded: false,
            selectable: false,
            children: [{
                text: 'Gebruikers',
                view: 'maintenance.UserImages',
                routeId: 'userimages',
                iconCls: 'right-icon x-fa fa-users',
                leaf: true
            }, {
                text: 'Locaties',
                view: 'maintenance.LocationImages',
                routeId: 'locationimages',
                iconCls: 'right-icon x-fa fa-map-marker',
                leaf: true
            }]
        }, {
            text: 'Statistieken',
            view: 'stats.Stats',
            leaf: true,
            iconCls: 'right-icon x-fa fa-bar-chart',
            routeId: 'stats'
        }]
    }
});