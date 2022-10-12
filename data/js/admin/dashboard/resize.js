function resizes(){
    $.each(flags, function(key, value){
        $('#iProTitle'+key).css('width', $('#fAddProduct .dLine').width()-5-$('[for=iProTitle'+key+']').width()+'px');
        $('#iProExcept'+key).css('width', $('#fAddProduct .dLine').width()-5-$('[for=iProExcept'+key+']').width()+'px');
    });
    $('#fAddProduct #iPosition').css('width', $('#fAddProduct .dLine').width()-5-$('#fAddProduct [for=iPosition]').width()+'px');
    $('#iProKeyword').css('width', $('#fAddProduct .dLine').width()-5-$('[for=iProKeyword]').width()+'px');
    $('#iProDate').css('width', $('#fAddProduct .dLine').width()-5-$('[for=iProDate]').width()+'px');
    $('#iProPath').css('width', $('#fAddProduct .dLine').width()-5-$('[for=iProPath]').width()+'px');
    $.each(flags, function(key, value){
        $('#iCatTitle'+key).css('width', $('#fAddCategory .dLine').width()-5-$('[for=iCatTitle'+key+']').width()+'px');
        $('#iCatExcept'+key).css('width', $('#fAddCategory .dLine').width()-5-$('[for=iCatExcept'+key+']').width()+'px');
    });
    $('#fAddCategory #iPosition').css('width', $('#fAddCategory .dLine').width()-5-$('#fAddCategory [for=iPosition]').width()+'px');
    $('#iCatKeyword').css('width', $('#fAddCategory .dLine').width()-5-$('[for=iCatKeyword]').width()+'px');
    $('#iCatDate').css('width', $('#fAddCategory .dLine').width()-5-$('[for=iCatDate]').width()+'px');
    $('#iCatPath').css('width', $('#fAddCategory .dLine').width()-5-$('[for=iCatPath]').width()+'px');
    $.each(flags, function(key, value){
        $('#iPgTitle'+key).css('width', $('#fAddPage .dLine').width()-5-$('[for=iPgTitle'+key+']').width()+'px');
        $('#iPgExcept'+key).css('width', $('#fAddPage .dLine').width()-5-$('[for=iPgExcept'+key+']').width()+'px');
    });
    $('#fAddPage #iPosition').css('width', $('#fAddPage .dLine').width()-5-$('#fAddPage [for=iPosition]').width()+'px');
    $('#iPgKeyword').css('width', $('#fAddPage .dLine').width()-5-$('[for=iPgKeyword]').width()+'px');
    $('#iPgDate').css('width', $('#fAddPage .dLine').width()-5-$('[for=iPgDate]').width()+'px');
    $('#iPgPath').css('width', $('#fAddPage .dLine').width()-5-$('[for=iPgPath]').width()+'px');
    $.each(flags, function(key, value){
        $('#iName'+key).css('width', $('#fAddLanguage .dLine').width()-5-$('[for=iName'+key+']').width()+'px');
    });
    $('#iId').css('width', $('#fAddLanguage .dLine').width()-5-$('[for=iId]').width()+'px');
    $('#fAddLanguage #iPosition').css('width', $('#fAddLanguage .dLine').width()-5-$('#fAddLanguage [for=iPosition]').width()+'px');
    $('#iEmail').css('width', $('#fAddUser .dLine').width()-5-$('[for=iEmail]').width()+'px');
    $('#iPassword').css('width', $('#fAddUser .dLine').width()-5-$('[for=iPassword]').width()+'px');
    $('#iDisplayname').css('width', $('#fAddUser .dLine').width()-5-$('[for=iDisplayname]').width()+'px');
    $('#iFullname').css('width', $('#fAddUser .dLine').width()-5-$('[for=iFullname]').width()+'px');
    $('#iGender').css('width', $('#fAddUser .dLine').width() - 5 - $('[for=iGender]').width() + 'px');
    $('#iGender').css('width', $('#fAddCustomer .dLine').width() - 5 - $('[for=iGender]').width() + 'px');
    $('#iAddress').css('width', $('#fAddUser .dLine').width()-5-$('[for=iAddress]').width()+'px');
    $('#iPhone').css('width', $('#fAddUser .dLine').width()-5-$('[for=iPhone]').width()+'px');
    $('.iGroup').css('width', $('#fAddUser .dLine').width()-5-$('[for=iGroup]').width()+'px');
    $('#iPw').css('width', $('#fChange .dLine').width()-5-$('[for=iPw]').width()+'px');
    $('#iNewPw').css('width', $('#fChange .dLine').width()-5-$('[for=iNewPw]').width()+'px');
    $('#iReNewPw').css('width', $('#fChange .dLine').width()-5-$('[for=iReNewPw]').width()+'px');
    $('.'+backmap.see().page+' .iSex').css('width', $('#fAddUser .dLine').width()-5-$('.'+backmap.see().page+' [for=iSex]').width()+'px');
    for(temp2 = 1; temp2<=$('.'+backmap.see().page+' .aFeature').attr('num'); temp2++)
    {
        $('a.sFeatureName'+temp2+', a.sFeatureParent'+temp2+', a.sFeatureValue'+temp2+', .sFeatureOpts'+temp2).css('width', '0px');
        $('a.sFeatureName'+temp2).css('width', $('a.sFeatureName'+temp2).parent().width()-5-$('[for=sFeatureName'+temp2+']').width()+'px');
        $('a.sFeatureParent'+temp2).css('width', $('a.sFeatureParent'+temp2).parent().width()-5-$('[for=sFeatureParent'+temp2+']').width()+'px');
        $('a.sFeatureValue'+temp2).css('width', $('a.sFeatureValue'+temp2).parent().width()-5-$('[for=sFeatureValue'+temp2+']').width()+'px');
        $('input.iFeatureValue'+temp2).css('width', $('input.iFeatureValue'+temp2).parent().width()-5-$('[for=iFeatureValue'+temp2+']').width()+'px');
        $('.sFeatureOpts'+temp2).css('width', $('.sFeatureOpts'+temp2).parent().width()-5-$('[for=sFeatureOpts'+temp2+']').width()+'px');
    }
    $.each(flags, function(key, value){
        $('#iFeaName'+key).css('width', $('#fAddFeature .dLine').width()-5-$('[for=iFeaName'+key+']').width()+'px');
        $('#iFeaExcept'+key).css('width', $('#fAddFeature .dLine').width()-5-$('[for=iFeaExcept'+key+']').width()+'px');
    });
    $('#fAddFeature #iPosition').css('width', $('#fAddFeature .dLine').width()-5-$('#fAddFeature [for=iPosition]').width()+'px');
    $('#iFeaKey').css('width', $('#fAddFeature .dLine').width()-5-$('[for=iFeaKey]').width()+'px');
    $('.dProduct:not(#fAudios .dProduct)').trigger('click');
    if($(window).width()<470 && $(window).width()>490)
        $('.dProductMore:not(#fAudios .dProductMore)').trigger('click');
    if($('.dViewImg').css('display')=='block')
        $('.iViewImg').fadeTo(200, 0, function () {
            $(this).attr('src', $('.dViewing').find('img').attr('src'));
            $(this).css('width', 'auto');
            if($(this).width()>$('.dViewImg').width())
                $(this).css('width', '100%');
            ver_center($('.iViewImg'), 'all', 0, 1);
            $('.dViewImg').fadeTo(200, 1, function(){
                $('.dViewImg').attr('time', 1);
            });
        });
}