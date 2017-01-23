Ext.define('Ext.sunfield.groupEditor.GroupEditor', {
    extend: 'Ext.panel.Tool',

    alias: 'widget.groupeditor',
    type: 'gear',
    tooltip: 'groepen bewerken...',

    imageId: 0,
    userId: 0,
    store: null,

    id: 'groupeditortool',

    requires: [
        'Ext.sunfield.groupEditor.EditorWindow',
        'Ext.sunfield.groupEditor.EditGroup'
    ],

    handler: function (tool, e, owner, eOpts) {
        var win;

        win = Ext.create({
            xtype: 'editorwindow',
            store: this.store,
            selector: this.selector,
            userId: this.userId,
            imageId: this.imageId
        });
        win.show();
    }
});