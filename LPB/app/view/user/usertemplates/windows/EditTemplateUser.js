/**
 * Created by Peter on 13-1-2017.
 */
Ext.define('LPB.view.user.usertemplates.windows.EditTemplateUser', {
    extend: 'Ext.window.Window',

    alias: 'widget.edittemplateuser',

    modal: true,
    width: 850,
    height: 650,

    title: 'Template wijzigen',
    iconCls: 'right-icon x-fa fa-file-text-o',
    layout: 'fit',
    reference: 'edittemplatewindow',

    listeners: {
        beforeclose: 'onEditTemplateWindowBeforeClose'
    },

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            trackResetOnLoad: true,
            defaults: {
                anchor: '100%',
                labelWidth: 200
            },
            reference: 'edittplform',
            defaultType: 'textfield',

            listeners: {
                scope: this,
                afterrender: this.initForm
            },

            items: [{
                xtype: 'tabpanel',
                plain: true,
                activeTab: 0,
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
                        id: 'imagefield',
                        fieldLabel: 'Afbeelding',
                        store: 'Images',
                        imagesDir: 'resources/images/items/'
                    }, {
                        xtype: 'mruimages',
                        fieldLabel: 'Recente afbeeldingen',
                        store: 'MruImages',
                        imagesDir: 'recources/images/items/',
                        userId: this.userId,
                        imageFieldname: 'imagefield'
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
                        value: '12:00',
                        vtype: 'templateTime'
                    }, {
                        name: 'endTime',
                        xtype: 'timefield',
                        fieldLabel: 'Eindtijd',
                        value: '13:00',
                        vtype: 'templateTime'
                    }]
                }, {
                    title: 'Waar',
                    bodyPadding: 20,
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
                                        var form = field.up('form').getForm();
                                        var combo = form.findField('locationId');
                                        var text = form.findField('shortLocation');
                                        combo.setDisabled(!field.checked);
                                        text.setDisabled(field.checked);
                                    }
                                }
                            }, {
                                xtype: 'combobox',
                                allowBlank: false,
                                flex: 2,
                                name: 'locationId',
                                store: 'allLocations',
                                valueField: 'id',
                                queryMode: 'remote',
                                forceSelection: true,
                                emptyText: 'kies een locatie',
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
                    bodyPadding: 20,
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
                    bodyPadding: 20,
                    items: [{
                        xtype: 'itemselector',
                        height: 450,
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
                    bodyPadding: 20,
                    items: [{
                        xtype: 'itemselector',
                        height: 450,
                        store: 'ownGroups',
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
                        // listeners: {
                        //     afterrender: this.onGroupSelectorRendered
                        // }
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
                    }]
                }]
            }],

            buttons: [{
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Opslaan',
                formBind: true,
                listeners: {
                    click: 'onSaveEditTemplateBtnClick'
                }
            }]
        }];

        this.callParent();
    },

    initForm: function (form) {
        var me = this;

        this.setCategories(this.record.get('id'));
        this.setGroup(this.record.get('id'));
        if (this.record.get('locationId')) {
            Ext.getCmp('choiceone').setValue(true);
        } else {
            Ext.getCmp('choicetwo').setValue(true);
        }
        form.loadRecord(me.record);
    },

    setCategories: function (id) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/category/category.php?what=tpl&action=getCategories&id=' + id,
            success: function (response) {
                Ext.getCmp('categorySelector').setValue(response.responseText);
            }
        });
    },

    setGroup: function (id) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/group/group.php?what=tpl&action=getGroup&id=' + id,
            success: function (response) {
                Ext.getCmp('groupSelector').setValue(response.responseText);
            }
        });
    }
});