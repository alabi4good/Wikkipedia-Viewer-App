$(function() {

    // wikipedia article from API
    function getArticle(article) {
        $.ajax({
            url: `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${article}`,
            type: 'POST',
            dataType: 'jsonp',
            success: function(data) {
                var results = data.query.pages;
                // Using ES6 object.keys and Array.prototype.forEach to loop through the results object
                Object.keys(results).forEach(key => {
                    //console.log(results[key].thumbnail.source);
                   //Append the wiki Article to the DOM and display in the UI
                    $('.wiki').append(`<li class="wikiArticle"><p>${results[key].extract}</p></li>`);
                  
                });
            }
        });
    }
    

    // Display input box
    $('#icon').click(function(e) {
       if(e.target.classList.contains('fa')){
        $(this).addClass('active');
        $('.Input').css('display', 'block');
        $('#article').focus();
       }
       
    });

    // Hide the input box
    $('#cancel').click(function() {
        $('#icon').removeClass('active');
        $('.Input').css('display', 'none');
        $('#article').val('');

        //remove the article
        $('.wiki').empty();

        // Move the box down to original position
        $('#box').css('transform', 'translate(-50%, -50%)');
        $('#box p:last-child').fadeIn('slow');
        $('footer').show();
        
    });

    //Get Wikipedia Article
    $('form').submit(function(e) {
        e.preventDefault();
        var article = $('#article').val();

        // Move the box up
        $('#box').css('transform', 'translate(-50%, -100%)');
        $('#box p:last-child').css('display', 'none');
        $('footer').hide();

        // Move the wiki up
        //$('.wiki').css('transform', 'translate(-50%, -20%)');
        getArticle(article);
        
    });
});