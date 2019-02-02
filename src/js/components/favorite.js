
$(function () {

    // favorites output wrapper
    var outputFavorites = $('.results--favorites ul');

    //get items from local storage
    if(localStorage.getItem('favorites-li')){
        $(outputFavorites).html(localStorage.getItem('favorites-li'));
        $(outputFavorites).find('input[type="checkbox"]').attr('checked', true);
    }

    // // on unfavorite click in favorite list
    // $(document).on('click','.results--favorites input[type="checkbox"]',function() {

    //     // check / uncheck favorites and save favorites to localstorage
    //     var checkbox = $(this);
    //     var favId = $(checkbox).attr('id');

    //     if($(checkbox).attr('checked')) {
    //         $(checkbox).attr('checked', false);
    //         localStorage.setItem(favId, false);
    //         // remove li from favorite list
    //         $(outputFavorites).find('#'+favId+'').parents('li').remove();
    //         // remove from localstorage
    //         localStorage.setItem('favorites-li', $(outputFavorites).html());
    //     }
    // });


    // search results output wrapper
    var outputSearchResults = $('.results--search ul');

    // on favorite click in result list
    $(document).on('click','.results--search input[type="checkbox"]',function() {

        // check / uncheck favorites and save favorites to localstorage
        var checkbox = $(this);
        var favId = $(checkbox).attr('id');
        var clonedLi = $('#'+favId).parents('li').clone();

        if($(checkbox).attr('checked')) {
            $(checkbox).attr('checked', false);
            localStorage.setItem(favId, false);
            // remove li from favorite list
            $(outputFavorites).find('#'+favId+'').parents('li').remove();
            // remove from localstorage
            localStorage.setItem('favorites-li', $(outputFavorites).html());
        }else {
            $(checkbox).attr('checked', true);
            localStorage.setItem(favId, true);
            //add new item
            $(outputFavorites).append(clonedLi);
            //save changes to localstorage
            localStorage.setItem('favorites-li', $(outputFavorites).html());
        }

    });
});
