(function($) {
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

    // TODO: this is only temporary to make results visibile
    console.log(selectOptions);

    // preserve chainability
    return table;
  }
}(jQuery));