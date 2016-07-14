Ext.define('LPB.view.admin.items.windows.AddItem', {
    extend: 'Ext.window.Window',

    alias: 'widget.additemwindow',
    xtype: 'additemwindow',
    reference: 'additemwindow',

    width: 850,
    height: 650,
    modal: true,
    title: 'Item toevoegen',
    iconCls: 'fa fa-calendar',

    layout: 'fit',

    initComponent: function () {


        this.items = [{
            xtype: 'form',
            reference: 'additemform',
            layout: 'fit',

            items: [{
                xtype: 'tabpanel',
                plain: true,
                items: [{
                    title: 'Tekst',
                    //iconCls: 'fa fa-file-text-o',
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'Titel',
                        name: 'title'
                    }, {
                        fieldLabel: 'Ondertitel',
                        name: 'subtitle'
                    }, {
                        xtype: 'htmleditor',
                        fieldLabel: 'Tekst',
                        name: 'text',
                        enableColors: false,
                        enableAlignments: false,
                        enableFont: false,
                        enableFontSize: false,
                        height: 350
                    }]
                }, {
                    title: 'Afbeelding',
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    items: [{
                        name: 'imageId',
                        xtype: 'imagefield',
                        fieldLabel: 'Afbeelding',
                        store: 'ItemImages',
                        imagesDir: 'resources/images/items/'
                    }]
                }, {
                    title: 'Wanneer',
                    layout: 'hbox',
                    bodyPadding: 10,
                    items: [{
                        xtype: 'panel',
                        flex: 1,
                        title: 'Datum',
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [{
                                text: 'Datum toevoegen...',
                                reference: 'adddatebtn',
                                disabled: 'true'
                            }]
                        }],
                        items: [{
                            xtype: 'checkboxfield',
                            fieldLabel: 'Meerdaags',
                            name: 'multipleDays',
                            reference: 'multipledays'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Begindatum',
                            format: 'D d F Y',
                            minValue: new Date(),
                            value: new Date()
                        }, {
                            xtype: 'timefield',
                            fieldLabel: 'Begintijd',
                            value: '9:00'
                        }, {
                            xtype: 'timefield',
                            fieldLabel: 'Eindtijd',
                            value: '10:00'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Einddatum',
                            format: 'D d F Y',
                            disabled: true,
                            bind: {
                                disabled: '{!multipledays.checked}'
                            }
                        }]
                    }, {
                        xtype: 'datesgrid',
                        flex: 1,
                        title: 'Data'
                    }]
                }, {
                    title: 'Waar'
                }, {
                    title: 'Contact'
                }, {
                    title: 'Categorie',
                    layout: 'fit',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'itemselector',
                        store: 'Categories',
                        name: 'categorySelector',
                        displayField: 'title',
                        valueField: 'id',
                        fromTitle: 'Categoriëen',
                        toTitle: 'Geselecteerd',
                        buttons: ['add', 'remove'],
                        buttonsText: {add: 'Toevoegen aan selectie', remove: 'Verwijder uit selectie'},
                        maxSelections: 3,
                        minSelections: 1,
                        msgTarget: 'under',
                        minSelectionsText: 'Selecteer minimaal {0} categorie!',
                        maxSelectionsText: 'Selecteer maximaal {0} categorieën'
                    }]
                }, {
                    title: 'Groep',
                    layout: 'fit',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'itemselector',
                        store: 'Groups',
                        name: 'groupSelector',
                        displayField: 'name',
                        valueField: 'id',
                        fromTitle: 'Groepen',
                        toTitle: 'Geselecteerd',
                        buttons: ['add', 'remove'],
                        buttonsText: {add: 'Toevoegen aan selectie', remove: 'Verwijder uit selectie'},
                        maxSelections: 1,
                        minSelections: 0,
                        msgTarget: 'under',
                        minSelectionsText: 'Selecteer minimaal {0} groep!',
                        maxSelectionsText: 'Selecteer maximaal {0} groep',
                        listeners: {
                            afterrender: this.onGroupSelectorRendered
                        }
                    }]
                }, {
                    title: 'Opties'
                }]
            }],

            buttons: [{
                text: 'Templates',
                xtype: 'splitbutton'
            }, {
                xtype: 'tbfill'
            }, {
                text: 'Reset'
            }, {
                text: 'Annuleer'
            }, {
                text: 'Opslaan...'
            }]
        }];

        this.callParent();
    },

    onGroupSelectorRendered: function (selector) {
        var tool;
        tool = Ext.create('Ext.panel.Tool', {
            scope: this,
            tooltip: 'groepen bewerken...',
            type: 'gear',
            callback: function (tool) {
                var groupEditor;
                groupEditor = Ext.create('groupeditor', {
                    store: this.store,
                    modal: true
                });
                groupEditor.show();
            }
        });
        selector.fromField.items.items[0].addTool(tool);
    }
});