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
                        win = Ext.create({
                            xtype: 'imageuploader',
                            tmpDir: '../../images/temp/',
                            uploadDir: 'resources/images/users/',
                            thumbnailDir: 'resources/images/users/75x75',
                            thumbnailSize: [75, 75],
                            imageSize: [100, 100],
                            previewSize: [800, 600],
                            minImageWidth: 600,
                            minImageHeight: 600,
                            imageProcessor: 'resources/data/image/image.php',
                            imagesStore: 'UserImages'
                        });
                        win.show();
                        store = Ext.getStore(win.imagesStore);
                        console.log(store);
                        store.addListener({
                            add: function (store, records, index, eOpts) {
                                //Ext.getCmp('infopanel').loadRecord(records[0]);
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
                    '<img width="75" height="75" title="{imageName}" src="resources/images/users/{imagePath}" />',
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

            tpl: ['<div class="details">', '<tpl for=".">',
                '<div><img src="resources/images/users/{imagePath}" /></div>',
                '<div class="details-info">', '<b>Afbeelding</b>',
                '<span>{imageName}</span>', '<b>Bestandsnaam</b>',
                '<span>{imagePath}</span>', '<b>Laatst gebruikt</b>',
                '<span>{mru}</span>', '</div>', '</tpl>', '</div>'],

            prepareDate: function (data) {
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

    onImageAdded: function (image) {
        console.log('kiekeboe');
    },

    onSelectionChange: function (view, selections) {
        var selected = selections[0];
        if (selected) {
            // load image in infopanel
            this.up('window').down('#infopanel').loadRecord(selected);
        }
    },

    onSelectBtnClick: function (btn) {
        view = btn.up('window').down('dataview');
        image = view.getSelectionModel().getSelection()[0];
        if(image) {
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

    searchImage: function () {
        console.log('searching for image');
    },

    clearSearchFilter: function (field) {
        console.log('clear searchfilter!', field);
    }
});