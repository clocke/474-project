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

    function requestArticle() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/article',
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

    function createArticle(articleTitle, content){
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/article',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                Article: {
                    Title: articleTitle,
                    //Category: categoryID,
                    Content: content,
                    //TagID: tagID
                }
            }),
            contentType: 'json',
            success: function(){
                console.log("success");
            },
            error: function ajaxError(jqXHR) {
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {

        console.log('Response received from API: ', result);

        var articles = [];
        articles = result.articles;
        articles.forEach(addCard);
        console.log('Response received from API: ', articles);

    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#createArticle').click(handleSubmitClick);
        // $('#profileTest').click(handleCards);


        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                $('.authToken').text(token);
                requestArticle();
            }
        });
/*
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }*/
    });

    function handleSubmitClick(event) {
        var articleTitle = document.getElementById('articleTitle').value;
        //var categoryID = document.getElementById('roleUpdate').value;
        //var tagID = document.getElementById('tagUpdate').value;
        let get_desc = $('#form_desc').val();
        createArticle(articleTitle, get_desc);
     
        event.preventDefault();

    }

    function handleRequestClick(event) {

        event.preventDefault();
        requestArticle();
        alert("Category js click");

    }

    function handleCards(event) {

        event.preventDefault();
        requestArticle();
        alert("Adding Cards");

    }

    

    function addCard(item) {

        //event.preventDefault();
        var inputKey = item.ArticleId;
        var inputTitle = item.Title;
        var inputContent = item.Content;
        var inputContactInfo = item.Author;
        //var inputPic = item.UserProfile.ProfilePic;

        var inputPic = "images/wr-investors-2.png";

        var cardImage = "<img src='" + inputPic + "' class='card-img-top' alt='...'>";
        var cardTitle = "<h5 class='card-title' id='profileName'>" + inputTitle + "</h5>";
        var cardText = "<p class='card-text' id='profileText'>" + inputContent + "</br> </br> Author: " + inputContactInfo + "</p>";
        var cardBody = "<div class='card-body'>" + cardTitle + cardText + "</div>";
        var cardButton = "<button class='btn btn-sm btn-outline-info btn-block' type='submit' value='" + inputKey + "'> View </button>";
        var cardFooter = "<div class='card-footer'>" + cardButton + "</div>";
        var cardWrap = "<div class='card'>" + cardBody + cardFooter + "</div>";

        $('#article-deck').append(cardWrap);

    }


}(jQuery));
