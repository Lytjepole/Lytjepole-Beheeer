Ext.define('LPB.view.admin.maintenance.templates.EditTemplate', {
    extend: 'Ext.window.Window',

    alias: 'widget.edittemplatewindow',
    xtype: 'edittemplatewindow',
    reference: 'edittemplatewindow',

    width: 850,
    height: 650,
    modal: true,
    title: 'template wijzigen',
    iconCls: 'fa fa-file-text-o',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth: 200
            },
            trackResetOnLoad: true,
            reference: 'edittplform',
            defaultType: 'textfield',
            listeners: {
                scope: this,
                afterrender: this.editTplFormAfterRender
            },
            items: [{
                xtype: 'tabpanel',
                plain: true,
                items: [{
                    title: 'Tekst',
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'Titel',
                        name: 'title',
                        allowBlank: false
                    }, {
                        fieldLabel: 'Ondertitel',
                        name: 'subtitle'
                    }, {
                        xtype: 'suneditor',
                        fieldLabel: 'Tekst',
                        allowBlank: false,
                        name: 'text',
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
                    bodyPadding: 20,
                    layout: 'anchor',
                    defaults: {
                        anchor: '50%',
                        labelWidth: 225
                    },
                    items: [{
                        name: 'beginTime',
                        xtype: 'timefield',
                        fieldLabel: 'Begintijd',
                        vtype: 'templateTime',
                        format: 'H:i'
                    }, {
                        name: 'endTime',
                        xtype: 'timefield',
                        fieldLabel: 'Eindtijd',
                        vtype: 'templateTime'
                    }]

                }, {
                    title: 'Waar',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',
                        items: [{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                xtype: 'radiofield',
                                boxLabel: 'Kies een locatie',
                                boxWidth: 200,
                                flex: 1,
                                checked: true,
                                inputValue: 1,
                                reference: 'choiceone',
                                id: 'choiceone',
                                name: 'location',
                                listeners: {
                                    change: function (field) {
                                        var form = field.up('form').getForm(),
                                            combo = form.findField('locationId'),
                                            text = form.findField('shortLocation');
                                        combo.setDisabled(!field.checked);
                                        text.setDisabled(field.checked);
                                    }
                                }
                            }, {
                                xtype: 'combobox',
                                allowBlank: false,
                                flex: 2,
                                name: 'locationId',
                                store: 'ItemLocations',
                                valueField: 'id',
                                queryMode: 'remote',
                                forceSelection: true,
                                emptyText: 'kies een locatie',
                                listeners: {
                                    beforerender: function (field) {
                                        Ext.getStore(field.store).load();
                                    }
                                },
                                tpl: Ext.create('Ext.XTemplate',
                                    '<ul class="x-list-plain"><tpl for=".">',
                                    '<tpl if="number!=0">',
                                    '<li role="option" class="x-boundlist-item">{name} - {street} {number}</li>',
                                    '<tpl else >',
                                    '<li role="option" class="x-boundlist-item">{name} - {street}</li>',
                                    '</tpl>',
                                    '</tpl></ul>'
                                ),
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<tpl if="number!=0">',
                                    '{name} - {street} {number}',
                                    '<tpl else>',
                                    '{name} - {street}',
                                    '</tpl>',
                                    '</tpl>'
                                )
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                xtype: 'radiofield',
                                boxLabel: 'of geef omschrijving',
                                flex: 1,
                                inputValue: 2,
                                reference: 'choicetwo',
                                id: 'choicetwo',
                                name: 'location'
                            }, {
                                xtype: 'textfield',
                                name: 'shortLocation',
                                allowBlank: false,
                                flex: 2,
                                disabled: true,
                                emptyText: 'omschrijving'
                            }]
                        }]
                    }]
                }, {
                    title: 'Contact',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',
                        items: [{
                            xtype: 'textfield',
                            labelWidth: 200,
                            fieldLabel: 'Telefoon',
                            name: 'phone',
                            anchor: '100%',
                            emptyText: '0519531234'
                        }]
                    }, {
                        xtype: 'fieldset',
                        border: 'none',
                        title: 'Internet',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 200
                        },
                        items: [{
                            fieldLabel: 'Website',
                            name: 'url',
                            vtype: 'url',
                            emptyText: 'http://www.website.nl'
                        }, {
                            fieldLabel: 'Email',
                            name: 'email',
                            vtype: 'email',
                            emptyText: 'info@website.nl'
                        }]
                    }, {
                        xtype: 'fieldset',
                        defaultType: 'textfield',
                        border: 'none',
                        title: 'Bronvermelding',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 200
                        },
                        items: [{
                            fieldLabel: 'Bron',
                            name: 'source',
                            emptyText: 'bron'
                        }, {
                            fieldLabel: 'Bron website',
                            name: 'sourceURL',
                            vtype: 'url',
                            emptyText: 'http://www.website.nl'
                        }]
                    }]
                }, {
                    title: 'Categorie',
                    layout: 'fit',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'itemselector',
                        store: 'Categories',
                        id: 'categorySelector',
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
                        id: 'groupSelector',
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
                        maxSelectionsText: 'Selecteer maximaal {0} groep'
                    }]
                }, {
                    title: 'Opties',
                    bodyPadding: 20,
                    defaults: {
                        labelWidth: 200,
                        anchor: '100%'
                    },
                    defaultType: 'checkboxfield',
                    items: [{
                        fieldLabel: 'Publiceer',
                        checked: true,
                        name: 'published',
                        inputValue: 1,
                        uncheckedValue: 0
                    }, {
                        fieldLabel: 'Permanent',
                        name: 'permanent',
                        inputValue: 1,
                        uncheckedValue: 0
                    }, {
                        fieldLabel: 'Voor bewoners',
                        name: 'general',
                        inputValue: 1,
                        uncheckedValue: 0
                    }, {
                        fieldLabel: 'Gebruiker',
                        xtype: 'combo',
                        name: 'userId',
                        anchor: '100%',
                        store: 'UsersStore',
                        displayField: 'fullName',
                        valueField: 'id',
                        forceSelection: true,
                        listeners: {
                            beforerender: function (field) {
                                Ext.getStore(field.store).load();
                            }
                        }
                    }]
                }]
            }],

            buttons: [{
                text: 'Annuleren',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Opslaan',
                formBind: true,
                listeners: {
                    click: 'onEditTplFormSubmitBtnClick'
                }
            }]
        }];
        this.callParent();
    },

    editTplFormAfterRender: function (form) {
        var me = this,
            record = this.record,
            form = form.getForm(),
            locationCombo = form.findField('locationId');
        me.setCategories(record.get('id'));
        me.setGroup(record.get('id'));
        form.loadRecord(record);
    },

    setCategories: function (id) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/category/category.php?what=tpl&action=getCategories&id=' + id,
            success: function (response, eOpts) {
                Ext.getCmp('categorySelector').setValue(response.responseText);
            }
        });
    },

    setGroup: function (id) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/group/group.php?what=tpl&action=getGroup&id=' + id,
            success: function (response, eOpts) {
                Ext.getCmp('groupSelector').setValue(response.responseText);
            }
        });
    }
});