
$(function () {

    if (!$('.search').length) {
        return;
    }

    // on search
    var input = $('.search').find('input');
    $(input).keyup(function (event) {  

        var inputVal = $(this).val();
        $.ajax({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie?api_key=4cb1eeab94f45affe2536f2c684a5c9e&query=' + inputVal,
            dataType: 'json'
        })

        .done(function(response) {

            // search results output
            var outputSearchResults = $('.results--search ul');
            $(outputSearchResults).empty();

            // api results 
            var results = response.results;

            for (var i = 0; i < results.length; ++i) {
                var resultTitle = results[i].title.toUpperCase();
                var inputValMatch = inputVal.toUpperCase();
                
                // if api results match search val
                if (resultTitle.indexOf(inputValMatch) > -1) {
                    
                    // from 2 chars matches show results
                    if (inputVal.length >= 2) {
                        var resultId = results[i].id;
                        var resultTitle = results[i].title;
                        
                        var resultItems = 
                        '<li>' +
                        '<div class="results_item">' +
                        resultTitle +
                        '<div class="results_item_choices">' +
                        '<button class="btn btn--rounded btn--details" data-detail="' +resultId+ '">Show details</button>' +
                        '<label class="checkbox"><input type="checkbox" id="favorite-'+resultId+'" name="favorite" value="' +resultId+ '"><i class="far fa-heart i--favorite"></i></label>' +
                        '</div>' +
                        '</div>' +
                        '<div class="results_detail"></div>' +
                        '</li>';

                        // append these to output list
                        $(resultItems).each(function (i, item) {
                            $(outputSearchResults).append(item);
                        });
                    }
                }
            }
        })

        .fail(function() {
            console.log("Failed");
        });

    });  
});
