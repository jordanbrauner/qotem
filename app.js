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
      var MAX_QUOTES = 7;

      $('button.generate').on('click', function(e) {
        e.preventDefault();
        if (genCount < MAX_QUOTES) {
          genCount += 1;
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
          // Left column
          var $leftCol = $("<div class='left-col'></div>");
          var $quote = $('<p class="quote-marks">"</p>');
          $leftCol.append($quote);
          $quoteContainer.append($leftCol);
          // Right Column
          var $rightCol = $("<div class='right-col'></div>");
          var $content = $("<div class='quote-content'>" + quote.content + "</div>");
          var $author = $("<div class='quote-author'>" + quote.title + "</div>");
          $rightCol.append($content);
          $rightCol.append($author);
          $quoteContainer.append($rightCol);
          // Overlay
          var $overlayCol = $("<div class='overlay-col'></div>");
          var $overlay = $("<p>Share</p>");
          $overlayCol.append($overlay);
          $quoteContainer.append($overlayCol);
          // Main
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
