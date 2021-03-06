/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'LPB',

    extend: 'LPB.Application',

    requires: [
        'LPB.util.sha256',
        'Ext.plugin.Viewport',
        'Ext.list.Tree',
        'LPB.view.login.Login',
        'LPB.view.admin.Main',
        'LPB.view.user.User',
        'Ext.container.Container',
        'Ext.layout.container.Anchor',
        'Ext.sunfield.imageUploader.ImageUploader',
        'Ext.sunfield.locationSelect.LocationSelect',
        'Ext.sunfield.imageField.ImageField',
        'Ext.sunfield.imageField.DatesField',
        'Ext.sunfield.DateSlider',
        'Ext.sunfield.sunEditor.SunEditor',
        'Ext.sunfield.mruImages.MruImages',
        'Ext.sunfield.groupEditor.GroupEditor',
        'Ext.ux.form.ItemSelector'
    ]

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'LPB.view.main.Main'
    //-------------------------------------------------------------------------
    // Most customizations should be made to LPB.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
