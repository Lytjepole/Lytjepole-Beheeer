/**
 * Created by Peter on 24-1-2016.
 */
Ext.define('LPB.view.admin.more.MoreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.more',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    onMoreGridAfterRender: function (grid) {
        grid.getStore().load();
    }
});