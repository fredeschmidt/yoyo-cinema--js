
$(function () {

	if (!$('.results').length) {
        return;
    }

    // on detail click
	$(document).on('click','.results .btn--details',function(event) {
        event.preventDefault();

		// details output
		var output = $(this).parents('li').find('.results_detail');
        $(output).empty();

        // btn
        var txt = $(output).is(':visible') ? 'Show details' : 'Hide details';
     	$(this).text(txt);
     	$(this).toggleClass('active');

		var detailId = $(this).attr('data-detail');
		$.ajax({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' +detailId+ '?api_key=4cb1eeab94f45affe2536f2c684a5c9e',
            dataType: 'json'
        })

        .done(function(response) {

            $(output).append('<div class="results_detail_img"></div><div class="results_detail_info"></div>');

            var outputImg = $(output).find('.results_detail_img');
            var outputInfo = $(output).find('.results_detail_info');

            // api details
            var title = response.title;
            var img = response.poster_path;
            if (!img == "") {
            var title = response.title;
                $(outputImg).append('<img src="http://image.tmdb.org/t/p/w92' +img+ '" alt="' +title+ '">');
            }

            var resume = response.overview;
            if (!resume == "") {
                $(outputInfo).append('<small>Resumé:</small><p>' +resume+ '</p>');
            }

            var genres = response.genres;
            if (!genres.length == 0) {
			    var arrGenres = Array();
				for (var i = 0; i < genres.length; ++i) {
					var genre = genres[i].name;
				    arrGenres.push(genre);
				}
				$(outputInfo).append('<small>Genre:</small><p>' +arrGenres.join(', ')+ '</p>');
			}

            var votes = response.vote_average;
            if (!votes == 0) {
                $(outputInfo).append('<small>Vote average:</small><span>' +votes+ '</span>');
            }

	        // show / hide details
            $(output).slideToggle();
        })

        .fail(function() {
            console.log("Failed");
        });
	
	});
});
