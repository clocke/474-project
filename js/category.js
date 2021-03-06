/*global WildRydes _config*/

// Code modified from AWS WildRydes example for 474 Project. Modified by SM

var WildRydes = window.WildRydes || {};


(function scopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = './signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = './signin.html';
    });

    function requestCategory() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/category',
            headers: {
                Authorization: authToken
            },
/*            data: JSON.stringify({
                Category: {
                    Id: '0',
                    Title: 'Category Title'
                }
            }),*/
            contentType: 'json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting category: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your category:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {

        console.log('Response received from API: ', result);

        var categories = [];
        categories = result.categories;
        categories.forEach(addCard);
        console.log('Response received from API: ', categories);

    }

    // Register click handler for #request button
    $(function onDocReady() {
        // $('#request2').click(handleRequestClick);
        // $('#cardTest').click(handleCards);


        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                $('.authToken').text(token);
                requestCategory();
            }
        });
/*
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }*/
    });


    function handleRequestClick(event) {

        event.preventDefault();
        requestCategory();
        alert("Category js click");

    }

    function handleCards(event) {

        event.preventDefault();
        requestCategory();
        alert("Adding Cards");

    }

    function addCard(item) {

        //event.preventDefault();
        var inputTitle = item.Title;
        var inputValue = item.CategoryId;
        var cardTitle = "<h5 class='card-title' id='categoryTitle'>" + inputTitle + "</h5>";
        var cardText = "<p class='card-text' id='categoryText'>" + inputValue + "</p>";
        var cardBody = "<div class='card-body'>" + cardTitle + cardText + "</div>";
        var cardButton = "<button class='btn btn-sm btn-outline-info btn-block' type='submit' value='" + inputValue + "'> View </button>";
        var cardFooter = "<div class='card-footer'>" + cardButton + "</div>";
        var cardWrap = "<div class='card'>" + cardBody + cardFooter + "</div>";

        $('#category-deck').append(cardWrap);

    }


}(jQuery));
