app.filter('dateToISO', function() {

    //Converts date from a mysql format to a format that Angular can recognize
    return function(date) {
        iso = date.replace(/(.+) (.+)/, "$1T$2Z");
    return iso;
  };
});
app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);