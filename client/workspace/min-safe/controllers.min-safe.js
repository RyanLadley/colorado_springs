app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
  

    $scope.icons = {
        overview: false,
        entry: false,
        reports: false,
        credits: false,
        adjustments: false
    }

    $scope.expand = false;
    $scope.toggleExpand = function(){
        $scope.expand = !$scope.expand;

        if($scope.expand){
            $scope.pos = {
            "width": "200px"
            };
            $scope.abs = {
                "left": "0"
            };
        }
        else{
           $scope.pos= {
            "width": "50"
            };
            $scope.abs = {
                "left": "-200"
            } 
        }   
    }


    $scope.$watch(function() {return $location.path();}, function(path){

        angular.forEach($scope.icons,function(value,index){
            $scope.icons[index] = false;
        });

        if(path === "/"){
            $scope.icons.home = true;
        }
        else if(path === "/overview\*"  ){
            $scope.icons.epic = true;
        }
        else if(path ==="/entry\*"){
            $scope.icons.sprint = true;
        }
        else if(path === "/reports\*"){
            $scope.icons.backlog = true;
        }
        else if(path === "/credits\*"){
            $scope.icons.archive = true;
        }
        else if(path === "/adjustments\*"){
            $scope.icons.archive = true;
        };
    });
}]);