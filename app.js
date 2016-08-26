(function() {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  // App
  //////////////////////////////////////////////////////////////////////////////
  var app = {

    // Initialize --------------------------------------------------------------
    initialize: function() {
      this.listeners();
      quotes.generateQuote('not-maxed');
    },

    // Listeners ---------------------------------------------------------------
    listeners: function() {

      var genCount = 1;
      var MAX_QUOTES = 5;

      $('button.generate').on('click', function(e) {
        e.preventDefault();
        if (genCount < MAX_QUOTES) {
          genCount += 1;
          console.log(genCount);
          quotes.generateQuote('not-maxed');
        } else {
          quotes.generateQuote('maxed');
        }
      });

    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Quote methods
  //////////////////////////////////////////////////////////////////////////////
  var quotes = {

    // Generate Quote ----------------------------------------------------------
    generateQuote: function(type) {
      $.ajax( {
        url: 'http://quotesondesign.com//wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        dataType: 'json',
        success: function(data) {

          var quote = data.shift();
          var $quoteContainer = $("<div class='quote-container'></div>");
          var $content = $("<div class='quote-content'>" + quote.content + "</div>");
          var $title = $("<div class='quote-title'>" + quote.title + "</div>");
          $quoteContainer.append($content);
          $quoteContainer.append($title);
          $quoteContainer.css('display', 'none');

          if (type === "not-maxed") {
            $('#quotes').prepend($quoteContainer);
            $('#quotes .quote-container:first-child').slideDown('fast');
          }
          if (type === "maxed") {
            $('#quotes .quote-container:last-child').slideUp('fast', function() {
              $(this).remove();
              $('#quotes').prepend($quoteContainer);
              $('#quotes .quote-container:first-child').slideDown('fast');
            });
          }


        },
        cache: false
      });
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Run App
  //////////////////////////////////////////////////////////////////////////////
  app.initialize();

})();
