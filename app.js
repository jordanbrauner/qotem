(function() {
  'use strict';

  //////////////////////////////////////////////////////////////////////////////
  // App
  //////////////////////////////////////////////////////////////////////////////
  var app = {

    // Initialize --------------------------------------------------------------
    initialize: function() {
      this.listeners();
      quotes.generateQuote();
    },

    // Listeners ---------------------------------------------------------------
    listeners: function() {

      $('button.reveal').on('click', function() {
        var $source = $('.quote-source');
        $source.slideDown();
      });

      $('button.more').on('click', function(e) {
        e.preventDefault();
        quotes.generateQuote();
      });

    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Quote methods
  //////////////////////////////////////////////////////////////////////////////
  var quotes = {

    // Generate Quote ----------------------------------------------------------
    generateQuote: function() {
      $.ajax( {
        url: 'http://quotesondesign.com//wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
          var quote = data.shift();
          var $quoteContainer = $("<div class='quote-container'></div>");
          var $h3 = $("<h3>" + quote.title + "</h3>");
          var $p = $("<p>" + quote.content + "</p>");
          $quoteContainer.append($h3);
          $quoteContainer.append($p);
          $quoteContainer.css("display", "none");
          $("#quotes").append($quoteContainer);
          $("#quotes .quote-container:last-child").slideDown();
        },
        cache: false
      });
    }
  };

})();
