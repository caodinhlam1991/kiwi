/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ){
    config.uiColor = UICOLOR;
//    config.language = 'fr';
    config.toolbarGroups = [
        {name: 'editing', groups: ['undo', 'doctools', 'find', 'selection']},
        {name: 'paragraph', groups: ['list', 'align']},
        {name: 'colors'},
        {name: 'styles', groups: ['styles']},
        {name: 'links'},
        { name: 'insert' },
        { name: 'basicstyles'}//, groups: [ 'basicstyles', 'mode']}
    ];
    config.removeButtons = 'Image';
    config.enterMode = CKEDITOR.ENTER_BR;
    config.filebrowserBrowseUrl = true;
    config.filebrowserImageBrowseUrl = true;
    config.filebrowserFlashBrowseUrl = true;
//    config.filebrowserUploadUrl = true;
    config.filebrowserImageUploadUrl = BASEURLs+'/public/media';
    config.filebrowserFlashUploadUrl = true;
};