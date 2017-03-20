Ext.define('LPB.view.user.useritems.windows.EditUserItemWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.edituseritemwindow',

    modal: true,
    width: 850,
    height: 650,
    title: 'Item wijzigen',
    iconCls: 'fa fa-calendar',
    reference: 'edititemwindow',

    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            reference: 'edititemform',
            id: 'additemform',
            trackResetOnLoad: true,
            listeners: {
                scope: this,
                afterrender: 'onEditItemFormRendered'
            },

            items: [{
                xtype: 'tabpanel',
                plain: true,
                defaults: {
                    bodyPadding: 20,
                    layout: 'anchor'
                },
                items: [{
                    title: 'Tekst',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 225
                    },
                    items: [{
                        xtype: 'textfield',
                        emptyText: 'Titel',
                        fieldLabel: 'Titel',
                        name: 'title'
                    }, {
                        xtype: 'textfield',
                        emptyText: 'Ondertitel',
                        name: 'subtitle',
                        fieldLabel: 'Ondertitel'
                    }, {
                        xtype: 'suneditor',
                        name: 'text',
                        emptyText: 'tekst',
                        fieldLabel: 'Tekst',
                        height: 350
                    }]                }, {
                    title: 'Afbeelding',
                    defaults: {
                        labelWidth: 225
                    },
                    items: [{
                        xtype: 'imagefield',
                        id: 'imagefield',
                        fieldLabel: 'Afbeelding',
                        store: 'Images',
                        imagesDir: 'resources/images/items/',
                        name: 'imageId'
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
                        layout: 'anchor',
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
                            anchor: '70%',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            anchor: '70%',
                            fieldLabel: 'Begintijd',
                            name: 'beginTime',
                            value: '9:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'timefield',
                            anchor: '70%',
                            name: 'endTime',
                            fieldLabel: 'Eindtijd',
                            value: '10:00',
                            vtype: 'singleDayEvent',
                            listeners: {
                                change: this.dateChanged
                            }
                        }, {
                            xtype: 'datefield',
                            anchor: '70%',
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
                        msgTarget: 'under',
                        maxDates: 1
                    }]
                }, {
                    title: 'Waar',
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
                            name: 'location',
                            id: 'choiceone',
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
                            flex: 2,
                            store: 'itemLocations',
                            queryMode: 'remote',
                            forceSelection: true,
                            valueField: 'id',
                            name: 'locationId',
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
                            ),
                            emptyText: 'kies een locatie...'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'radiofield',
                            flex: 1,
                            boxWidth: 200,
                            boxLabel: 'of geef omschrijving',
                            name: 'location',
                            inputValue: 0,
                            id: 'choicetwo'
                        }, {
                            flex: 2,
                            xtype: 'textfield',
                            emptyText: 'omschrijving',
                            allowBlank: false,
                            disabled: true,
                            name: 'shortLocation'
                        }]
                    }]                }, {
                    title: 'Contact',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Bellen',
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
                    }]                }, {
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
                        maxSelectionsText: 'Selecteer maximaal {0} groep',
                        listeners: {
                            scope: this,
                            afterrender: this.onGroupSelectorRendered
                        }
                    }]                }, {
                    title: 'Extra',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Opties',
                        defaults: {
                            labelWidth: 200,
                            anchor: '100%'
                        },
                        defaultType: 'checkboxfield',
                        items: [{
                            fieldLabel: 'Publiceer',
                            name: 'published',
                            checked: true,
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
                        collapsible: true,
                        collapsed: true,
                        defaults: {
                            labelWidth: 200,
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'checkboxfield',
                            fieldLabel: 'Onder embargo',
                            name: 'embargo',
                            inputValue: 1,
                            uncheckedValue: 0,
                            listeners: {
                                scope: this,
                                change: function (field) {
                                    this.down('form').getForm().findField('embargoEndDate').setDisabled(!field.checked);
                                    this.down('form').getForm().findField('embargoEndTime').setDisabled(!field.checked);
                                }
                            }
                        }, {
                            xtype: 'datefield',
                            anchor: '55%',
                            disabled: true,
                            name: 'embargoEndDate',
                            fieldLabel: 'Datum',
                            format: 'D d F Y',

                            submitFormat: 'Y-m-d',
                            value: new Date(),
                            minValue: new Date(),
                            allowBlank: false
                        }, {
                            xtype: 'timefield',
                            disabled: true,
                            name: 'embargoEndTime',
                            fieldLabel: 'Tijd',
                            anchor: '55%',
                            value: '10:00',
                            allowBlank: false,
                            increment: 30
                        }]
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
                handler: 'onSubmitEditItemForm'
            }]
        }]

        this.callParent();
    },

    onGroupSelectorRendered: function (selector) {
        var me = this;
        var tool;

        tool = Ext.create('widget.groupeditor', {
            userId: localStorage.getItem('uid'),
            store: selector.store,
            selector: selector
        });
        selector.fromField.items.items[0].addTool(tool);
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

    onEditItemFormRendered: function (form, what) {
        var me = this,
            record = this.record,
            additemform = form.getForm(),
            locationCombo = additemform.findField('locationId'),
            multipleDays = additemform.findField('multipleDays'),
            beginTimeField = additemform.findField('beginTime'),
            endTimeField = additemform.findField('endTime'),
            beginDateField = additemform.findField('beginDate'),
            endDateField = additemform.findField('endDate'),
            datesField = additemform.findField('dates'),
            embargo = additemform.findField('embargo'),
            embargoEndDate = additemform.findField('embargoEndDate'),
            embargoEndTime = additemform.findField('embargoEndTime');

        if (record) {
            form.loadRecord(record);
            this.setCategories(record.get('id'), what);
            this.setGroup(record.get('id'), what);

            beginTimeField.setValue(record.get('beginDate'));
            endTimeField.setValue(record.get('endDate'));

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

            if (Ext.Date.diff(record.get('beginDate'), new Date(), Ext.Date.DAY) > 0) {
                //console.log('records date before today'); // set to today
                beginDateField.setValue(new Date());
            }

            if (Ext.Date.diff(record.get('beginDate'), record.get('endDate'), Ext.Date.DAY)) {
                //console.log('multi');
                multipleDays.setValue(true);
            }

            datesField.store.add({
                beginDate: record.get('beginDate'),
                endDate: record.get('endDate')
            });
            datesField.setValue(1);

            if (record.get('embargo')) {
                embargoEndDate.setValue(record.get('embargoEnd'));
                embargoEndTime.setValue(record.get('embargoEnd'));
            }
        }
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

    endDateFieldRendered: function () {
        var form = Ext.getCmp('additemform').getForm(),
            beginDate = form.findField('beginDate').getValue(),
            beginDatePlusDay = Ext.Date.add(beginDate, Ext.Date.DAY, 1),
            endDateField = form.findField('endDate');

        endDateField.setMinValue(beginDatePlusDay);
        endDateField.setValue(beginDatePlusDay);
    }
});