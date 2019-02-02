
$(function () {

    // checkStorage();

    // on favorite click
    $(document).on('click','.results input[type="checkbox"]',function() {

        // favorites output
        var outputFavorites = $('.results--favorites ul');

        // check / uncheck favorites
        var checkbox = $(this);
        if($(checkbox).attr('checked')) {
            $(checkbox).attr('checked', false);
        }else {
            $(checkbox).attr('checked', true);
        }

        // save favorites to local storage
        // $('input[type="checkbox"]:checked').each(function(i, favChecked){
        //     var favId = $(favChecked).attr('id');
        //     localStorage.setItem(favId, true);
        // });

    });


    // function checkStorage() {
    //     var keys = Object.keys(localStorage);
    //     var i = 0, key;

    //     for (; key = keys[i]; i++) {
    //         $('.results').find('input#'+key+'').attr('checked', true);
    //     }
    // }
});
