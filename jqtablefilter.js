(function($) {
  // unqiue function for arrays
  function unique(array) {
    return $.grep(array, function(el, index) {
      return index == $.inArray(el, array);
    });
  }

  $.fn.jqTableFilter = function() {
    // object the plugin was called on
    var table = this;

    // find unique contents of each column.
    // used for generating select boxes.
    var selectOptions = [];
    // iterate over all rows
    table.find("tr").each(function() {
      var i = 0;
      // iterate over each column in the current row
      $(this).children("td").each(function() {
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

    // preserve chainability
    return table;
  }
}(jQuery));