app.service('dateFromString', function(){

    this.get = function(dateString){
        var dateParts = dateString.split("-");
        if(dateParts > 1){
            var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        }
        else{
            var date = new Date(dateString)
        }

        return date

    }
});