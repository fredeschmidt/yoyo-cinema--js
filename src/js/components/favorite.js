
$(function () {

    // on favorite click
    $(document).on('click','.results input[type="checkbox"]',function() {

        // favorites output wrapper
        var outputFavorites = $('.results--favorites ul');

        // check / uncheck favorites and save favorites to localstorage
        var checkbox = $(this);
        var favId = $(checkbox).attr('id');
        if($(checkbox).attr('checked')) {
            $(checkbox).attr('checked', false);
            localStorage.setItem(favId, false);
        }else {
            $(checkbox).attr('checked', true);
            localStorage.setItem(favId, true);
        }

    });
});
