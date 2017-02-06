Ext.define('Ext.sunfield.imageField.ImagePicker', {
    extend: 'Ext.window.Window',

    iconCls: 'fa fa-image',
    title: 'Selecteer afbeelding',

    modal: true,
    width: 700,
    height: 500,
    layout: 'border',

    initComponent: function () {
        this.items = [{
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Zoek',
                    labelWidth: null,
                    listeners: {
                        scope: this,
                        change: this.searchImage
                    },
                    triggers: {
                        clear: {
                            scope: this,
                            cls: 'x-form-clear-trigger',
                            tooltip: 'reset zoekopdracht',
                            handler: function (field) {
                                this.clearSearchFilter(field);
                            }
                        }
                    }
                }, {
                    xtype: 'tbfill'
                }, {
                    iconCls: 'fa fa-plus-square',
                    tooltip: 'Afbeelding toevoegen',
                    handler: function (field) {
                        var pwin = field.up('window');
                        win = Ext.create({
                            xtype: 'imageuploader',
                            tmpDir: '../../images/temp/',
                            //uploadDir: 'resources/images/users/',
                            uploadDir: pwin.imagesDir,
                            thumbnailDir: pwin + '75x75',
                            thumbnailSize: [75, 75],
                            imageSize: [100, 100],
                            previewSize: [800, 600],
                            minImageWidth: 600,
                            minImageHeight: 600,
                            imageProcessor: 'resources/data/image/image.php',
                            imagesStore: pwin.store,
                            userId: pwin.userId
                        });
                        win.show();
                        store = Ext.getStore(pwin.store);
                        store.addListener({
                            add: function (store, records, index, eOpts) {
                                Ext.getCmp('imagedataviewer').setSelection(records[0]);
                            }
                        });
                    }
                }]
            }],
            xtype: 'panel',
            region: 'center',
            flex: 3,
            minWidth: 200,
            layout: 'fit',
            items: [{
                xtype: 'dataview',
                cls: 'imagedataviewer',
                id: 'imagedataviewer',
                store: Ext.getStore(this.store),
                overItemCls: 'x-view-over',
                itemSelector: 'div.thumb-wrap',
                emptyText: 'geen afbeeldingen gevonden...',
                scrollable: true,
                trackOver: true,
                listeners: {
                    selectionchange: this.onSelectionChange,
                    itemdblclick: this.onItemDblClick
                },
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap">',
                    '<div class="thumb">',
                    '<img width="75" height="75" title="{imageName}" src="' + this.imagesDir + '{imagePath}" />',
                    '</div>', '<span>{shortName}</span>', '</div>',
                    '</tpl>'],

                prepareData: function (data) {
                    Ext.apply(data, {
                        shortName: Ext.util.Format.ellipsis(data.imageName, 10),
                        mru: Ext.Date.format(data.recentlyUsed, 'Y-m-d H:i:s')
                    });
                    return data;
                }
            }]
        }, {
            xtype: 'panel',
            region: 'east',
            split: true,
            flex: 1,
            minWidth: 200,
            id: 'infopanel',
            itemId: 'infopanel',
            cls: 'infopanel',

            listeners: {
                render: this.loadCurrentImage
            },

            tpl: ['<div class="details">', '<tpl for=".">',
                '<div><img src="' + this.imagesDir + '{imagePath}" /></div>',
                '<div class="details-info">', '<b>Afbeelding</b>',
                '<span>{imageName}</span>', '<b>Bestandsnaam</b>',
                '<span>{imagePath}</span>', '<b>Laatst gebruikt</b>',
                '<span>{mru}</span>', '</div>', '</tpl>', '</div>'],

            prepareData: function (data) {
                Ext.apply(data, {
                    mru: Ext.Date.format(data.recentlyUsed, 'Y-m-d H:i:s')
                });
            },

            loadRecord: function (record) {
                this.body.hide();
                this.tpl.overwrite(this.body, record.data);
                this.body.slideIn('l', {
                    duration: 250
                });
            },

            clear: function () {
                this.body.update('');
            }
        }];

        this.buttons = [{
            text: 'Annuleer',
            handler: function (btn) {
                btn.up('window').close();
            }
        }, {
            text: 'Selecteer',
            scope: this,
            handler: function (btn) {
                this.onSelectBtnClick(btn);
            }
        }]

        this.callParent(arguments);
    },
    //
    // onImageAdded: function (image) {
    //     console.log('kiekeboe');
    // },

    loadCurrentImage: function () {
        if (this.up('window').currentImageId > 1) {
            var win = this.up('window'),
                dataview = win.down('dataview'),
                store = Ext.getStore(win.store),
                currentImageId = win.currentImageId,
                index,
                record;
            console.info('load preselected image');
            index = store.findExact('id', currentImageId);
            record = store.getAt(index);
            dataview.setSelection(record);
        }
    },

    onSelectionChange: function (view, selections) {
        var selected = selections[0];
        if (selected) {
            // load image in infopanel
            this.up('window').down('#infopanel').loadRecord(selected);
        }
    },

    onSelectBtnClick: function (btn) {
        var view = btn.up('window').down('dataview'),
            image = view.getSelectionModel().getSelection()[0];

        if (image) {
            this.pickImage(image);
        } else {
            console.log('no image selected');
            Ext.Msg.alert('Selectie fout...', 'Selecteer eerst een afbeelding!');
        }

    },

    onItemDblClick: function (view) {
        this.up('window').pickImage(view.getSelectionModel().getSelection()[0]);
    },

    pickImage: function (image) {
        this.fireEvent('imageselected', image);
        this.destroy();
    },

    searchImage: function (field) {
        //console.log('searching for image');
        var view = this.down('dataview'),
            value = field.getValue(),
            searchString = '%' + value.trim() + '%',
            store = view.getStore();

        if (value.trim().length) {
            store.filter([{
                property: 'imageName',
                operator: 'like',
                value: searchString
            }, {
                property: 'imagePath',
                operator: 'like',
                value: searchString
            }]);
        } else {
            store.clearFilter();
        }

    },

    clearSearchFilter: function (field) {
        field.setValue('');
    }
});