app.filter('dateToISO', function() {

    //Converts date from a mysql format to a format that Angular can recognize
    return function(date) {
        iso = date.replace(/(.+) (.+)/, "$1T$2Z");
    return iso;
  };
});