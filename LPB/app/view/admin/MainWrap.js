/**
 * Created by Peter on 17-1-2016.
 */
Ext.define('LPB.view.admin.MainWrap', {
    extend: 'Ext.container.Container',

    xtype: 'mainwrap',
    reference: 'mainWrap',
    itemId: 'mainWrap',

    layout: {
        type: 'hbox',
        align: 'stretchmax',
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },

    scrollable: 'y',

    beforeLayout: function () {
        var me = this,
            height = Ext.Element.getViewportHeight() - 64,
            navTree;

        navTree = me.getComponent('treelist');
        me.minHeight = height;
        navTree.setStyle({
            'min-height': height + 'px'
        });

        me.callParent(arguments);
    }
});