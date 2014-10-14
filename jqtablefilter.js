(function($) {
  // unqiue function for arrays
  function unique(array) {
    return $.grep(array, function(el, index) {
      return index == $.inArray(el, array);
    });
  }

  $.fn.jqTableFilter = function(options) {
    // object the plugin was called on
    var table = this;

    // default options
    var defaultCols = (function() {
      var cols = [];
      var count = table.find("tr").eq(0).children().length;

      for(var i = 0; i < count; i++) {
        cols.push(i);
      }

      return cols;
    })();

    var defaults = {
      columns: defaultCols
    }

    var settings = $.extend({}, defaults, options);

    // find unique contents of each column.
    // used for generating select boxes.
    var selectOptions = [];
    // iterate over all rows
    table.find("tr").each(function() {
      var i = 0;
      // iterate over each column in the current row
      $(this).children("td").each(function() {
        if(settings.columns.indexOf(i) != -1) {
          var value = $(this).text();
          if(selectOptions[i] == undefined) {
            selectOptions[i] = [$(this).text()];
          } else {
            // only add current value when it's not already in the array.
            // this leads to unique values.
            if($.inArray(value, selectOptions[i]) == -1) {
              selectOptions[i].push(value);
            }
          }
        } else {
          selectOptions[i] = [];
        }
        i++;
      });
    });

    // replace table headers with select boxes
    var i = 0;
    $.each(selectOptions, function(index, value) {
      value = unique(value);
      if(value.length) {
        var boxHtml = "<select>";
        boxHtml = boxHtml + "<option value=\"all\">" +  table.find("th").eq(i).text() + "</option>";
        $.each(value, function(innerIndex, innerValue) {
          boxHtml = boxHtml + "<option>" + innerValue + "</option>";
        });
        boxHtml = boxHtml + "</select>";
        table.find("th").eq(i).html(boxHtml);
      }
      i++;
    });

    // register the filter event
    table.find("select").on('change', function() {
      var pivots = [];
      var table = $(this).closest("table");

      var i = 0;
      table.find("th").each(function() {
        if($(this).children("select").val()) {
          pivots[i] = $(this).children("select").val();
        } else {
          pivots[i] = null;
        }
        i++;
      });

      // iterate over all table rows
      var iterations = $("tr").length-1;
      for(var i = 0; i < iterations; i++) {
        var col = 0;
        // check if we have to hide this row
        table.find("tr").eq(i+1).find("td").each(function() {
          if(pivots[col] != null && pivots[col] != "all" && $(this).text() != pivots[col]) {
            $(this).closest("tr").hide();
            col++;
            return false;
          }

          // if we reach this the row should be shown
          $(this).closest("tr").show();
          col++;
        });
      }
    });

    // preserve chainability
    return table;
  }
}(jQuery));
