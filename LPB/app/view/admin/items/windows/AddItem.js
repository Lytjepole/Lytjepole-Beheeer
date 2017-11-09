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

    listeners: {
        beforeclose: 'onAdditemWindowBeforeClose'
    },

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            reference: 'additemform',
            id: 'additemform',
            layout: 'fit',
            trackResetOnLoad: true,
            listeners: {
                scope: this,
                afterrender: this.addItemFormAfterRender
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
                        allowBlank: false,
                        emptyText: 'titel'
                    }, {
                        fieldLabel: 'Ondertitel',
                        name: 'subtitle',
                        emptyText: 'ondertitel'
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
                        id: 'imagefield',
                        xtype: 'imagefield',
                        fieldLabel: 'Afbeelding',
                        store: 'ItemImages',
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
                    layout: {
                        type: 'hbox'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'panel',
                        flex: 1,
                        height: 400,
                        title: 'Datum',
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [{
                                text: 'Datum toevoegen...',
                                reference: 'adddatebtn',
                                id: 'adddatebtn',
                                scope: this,
                                handler: function (btn) {
                                    var me = this;
                                    this.addDate(me, btn);
                                }
                            }]
                        }],
                        items: [{
                            xtype: 'checkboxfield',
                            fieldLabel: 'Meerdaags',
                            name: 'multipleDays',
                            reference: 'multipledays',
                            listeners: {
                                change: this.toggleMultipleDays
                            }
                        }, {
                            xtype: 'datefield',
                            name: 'beginDate',
                            fieldLabel: 'Begindatum',
                            format: 'D d F Y',
                            minValue: new Date(),
                            value: new Date(),
                            anchor: '100%',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            fieldLabel: 'Begintijd',
                            name: 'beginTime',
                            value: '9:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            name: 'endTime',
                            fieldLabel: 'Eindtijd',
                            value: '10:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Einddatum',
                            format: 'D d F Y',
                            disabled: true,
                            name: 'endDate',
                            listeners: {
                                change: this.dateChanged,
                                afterrender: this.endDateFieldRendered
                            }
                        }]
                    }, {
                        flex: 1,
                        xtype: 'datesfield',
                        id: 'datesfield',
                        name: 'dates',
                        height: 400,
                        msgTarget: 'under'
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
                        maxSelectionsText: 'Selecteer maximaal {0} groep',
                        listeners: {
                            afterrender: this.onGroupSelectorRendered
                        }
                    }]
                }, {
                    title: 'Opties',
                    bodyPadding: 15,
                    items: [{
                        xtype: 'fieldset',
                        border: 'none',
                        title: 'Opties',
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
                    }, {
                        xtype: 'fieldset',
                        title: 'Embargo',
                        border: 'none',
                        defaults: {
                            labelWidth: 200,
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'checkboxfield',
                            name: 'embargo',
                            fieldLabel: 'Onder embargo',
                            reference: 'embargo',
                            listeners: {
                                change: function (field) {
                                    Ext.getCmp('embargoenddate').setDisabled(!field.checked);
                                    Ext.getCmp('embargoendtime').setDisabled(!field.checked);
                                }
                            }
                        }, {
                            xtype: 'datefield',
                            anchor: '50%',
                            name: 'embargoEndDate',
                            id: 'embargoenddate',
                            format: 'D d F Y',
                            submitFormat: 'Y-m-d',
                            value: new Date(),
                            minValue: new Date(),
                            allowBlank: false,
                            fieldLabel: 'Datum',
                            disabled: true
                        }, {
                            xtype: 'timefield',
                            anchor: '50%',
                            fieldLabel: 'Tijd',
                            name: 'embargoEndTime',
                            id: 'embargoendtime',
                            value: '10:00',
                            allowBlank: false,
                            disabled: true
                        }]
                    }]
                }]
            }],

            buttons: [{
                text: 'Templates',
                iconCls: 'fa fa-file-text-o',
                xtype: 'splitbutton',
                reference: 'templateBtn',
                listeners: {
                    //click: 'onTemplatesBtnClick',
                    //afterrender: 'onTemplatesBtnClick'
                }

            }, {
                xtype: 'tbfill'
            }, {
                text: 'Reset',
                handler: function (btn) {
                    btn.up('form').reset();
                }
            }, {
                text: 'Annuleer',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                text: 'Opslaan...',
                formBind: true,
                listeners: {
                    click: 'onSubmitAddItemForm'
                }
            }]
        }];

        this.callParent();
    },

    dateChanged: function () {
        var me = this,
            grid = Ext.getCmp('datesfield'),
            form = grid.up('form').getForm(),
            toggleMultiple = form.findField('multipleDays'),
            beginDateField = form.findField('beginDate'),
            beginTimeField = form.findField('beginTime'),
            endDateField = form.findField('endDate'),
            beginDate = beginDateField.getValue(),
            endDate = endDateField.getValue(),
            beginDatePlusDay = Ext.Date.add(beginDate, Ext.Date.DAY, 1);

        if (toggleMultiple.getValue()) {
            // multi days
            endDateField.setMinValue(beginDatePlusDay);
            if (beginDate > endDate) {
                endDateField.setValue(beginDatePlusDay);
            }
        }

    },

    addItemFormAfterRender: function (form, what) {
        var record = this.record,
            additemform = form.getForm(),
            locationCombo = additemform.findField('locationId'),
            multipleDays = additemform.findField('multipleDays'),
            beginTimeField = additemform.findField('beginTime'),
            endTimeField = additemform.findField('endTime'),
            beginDateField = additemform.findField('beginDate'),
            endDateField = additemform.findField('endDate');

        // if record isset load into form
        if (record) {
            form.loadRecord(record);
            this.setCategories(record.get('id'), what);
            this.setGroup(record.get('id'), what);
            if (record.get('locationId')) {
                if (!locationCombo.getStore().isLoaded()) {
                    locationCombo.getStore().load({
                        callback: function () {
                            locationCombo.setValue(record.get('locationId'));
                        }
                    });
                } else {
                    locationCombo.setValue(record.get('locationId'));
                }
                Ext.getCmp('choiceone').setValue(true);

            } else {
                Ext.getCmp('choicetwo').setValue(true);
            }

            beginTimeField.setValue(record.get('beginDate'));
            endTimeField.setValue(record.get('endDate'));

            //console.log(Ext.Date.diff(record.get('beginDate'), new Date(), Ext.Date.DAY));

            if (Ext.Date.diff(record.get('beginDate'), new Date(), Ext.Date.DAY) > 0) {
                //console.log('records date before today'); // set to today
                beginDateField.setValue(new Date());
            }

            if (Ext.Date.diff(record.get('beginDate'), record.get('endDate'), Ext.Date.DAY)) {
                //console.log('multi');
                multipleDays.setValue(true);
            }
        }
    },

    setCategories: function (id, what) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/category/category.php?action=getCategories&id=' + id + '&what=' + what,
            success: function (response, eOpts) {
                Ext.getCmp('categorySelector').setValue(response.responseText);
            }
        });
    },

    setGroup: function (id, what) {
        Ext.Ajax.request({
            scope: this,
            url: 'resources/data/group/group.php?action=getGroup&id=' + id + '&what=' + what,
            success: function (response, eOpts) {
                Ext.getCmp('groupSelector').setValue(response.responseText);
            }
        });
    },

    toggleAddDateBtn: function (value) {
        var btn = Ext.getCmp('adddatebtn');
        btn.setDisabled(value);
    },

    toggleMultipleDays: function (btn, value) {
        var form = btn.up('form').getForm(),
            beginDateField = form.findField('beginDate'),
            beginTimeField = form.findField('beginTime'),
            endDateField = form.findField('endDate');

        endDateField.setDisabled(!btn.checked);

        if (value) {
            Ext.apply(beginDateField, {vtype: 'multiDayEvent'});
            beginDateField.clearInvalid();
            Ext.apply(form.findField('beginTime'), {vtype: 'multiDayEvent'});
            Ext.apply(form.findField('endDate'), {vtype: 'multiDayEvent'});
            Ext.apply(form.findField('endTime'), {vtype: 'multiDayEvent'});
        } else {
            Ext.apply(beginDateField, {vtype: 'singleDayEvent'});
            beginDateField.clearInvalid();
            Ext.apply(form.findField('beginTime'), {vtype: 'singleDayEvent'});
            Ext.apply(form.findField('endDate'), {vtype: 'singleDayEvent'});
            Ext.apply(form.findField('endTime'), {vtype: 'singleDayEvent'});
        }
    },

    addDate: function (win, btn) {
        var me = this,
            grid = Ext.getCmp('datesfield'),
            store = grid.store,
            form = win.down('form').getForm(),
            beginDate,
            endDate;
        switch (form.findField('multipleDays').getValue()) { // multiple days selected or not
            case true:
                // beginDate
                beginDate = new Date(form.findField('beginDate').getValue());
                beginDate.setHours(form.findField('beginTime').getValue().getHours());
                beginDate.setMinutes(form.findField('beginTime').getValue().getMinutes());
                // endDate
                endDate = new Date(form.findField('endDate').getValue());
                endDate.setHours(form.findField('endTime').getValue().getHours());
                endDate.setMinutes(form.findField('endTime').getValue().getMinutes());
                break;
            case false:
                // beginDate
                beginDate = new Date(form.findField('beginDate').getValue());
                beginDate.setHours(form.findField('beginTime').getValue().getHours());
                beginDate.setMinutes(form.findField('beginTime').getValue().getMinutes());
                // endDate
                endDate = new Date(form.findField('beginDate').getValue());
                endDate.setHours(form.findField('endTime').getValue().getHours());
                endDate.setMinutes(form.findField('endTime').getValue().getMinutes());
                break;
        }

        store.add({
            beginDate: beginDate,
            endDate: endDate
        });
    },

    onGroupSelectorRendered: function (selector) {
        var tool;
        tool = Ext.create('Ext.panel.Tool', {
            scope: this,
            tooltip: 'groepen bewerken...',
            type: 'gear',
            callback: function () {
                var groupEditor;
                groupEditor = Ext.create('groupeditor', {
                    store: this.store,
                    modal: true
                });
                groupEditor.show();
            }
        });
        selector.fromField.items.items[0].addTool(tool);
    },

    endDateFieldRendered: function () {
        var form = Ext.getCmp('additemform').getForm(),
            beginDate = form.findField('beginDate').getValue(),
            beginDatePlusDay = Ext.Date.add(beginDate, Ext.Date.DAY, 1),
            endDateField = form.findField('endDate');

        endDateField.setMinValue(beginDatePlusDay);
        endDateField.setValue(beginDatePlusDay);
    }
});