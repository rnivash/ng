
var app = angular.module("app1");

app.controller("c1", ["$scope", "StorageFactory", function($scope, sf) {

        $scope.currentDate = new Date();
        $scope.salaryMonthYear = "";
        $scope.salaryamt = "";
        $scope.SalaryList = [];
        $scope.SalaryListLocal = [];
        $scope.TotalSalaryIncome = 0;

        var getSalary = function(adate) {
            var thisamt = 0;
            for (var i = 0; i < $scope.SalaryListLocal.length; i++) {
                var td = $scope.SalaryListLocal[i].dt;
                var ad = typeof td.getMonth === 'function' ? td : new Date(td);
                if (ad <= adate)
                    thisamt = $scope.SalaryListLocal[i].am;
            }
            return parseFloat(thisamt);
        };
        
        var calc = function () {
            $scope.SalaryList = [];
            $scope.TotalSalaryIncome = 0;
            if ($scope.SalaryListLocal.length > 0) {
                var td = $scope.SalaryListLocal[0].dt;
                var cDate = typeof td.getMonth === 'function' ? td : new Date(td);
                cDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate());
                for (cDate; cDate < $scope.currentDate; cDate.setMonth(cDate.getMonth() + 1)) {
                    var thisamt = getSalary(cDate);
                    $scope.TotalSalaryIncome += parseFloat(thisamt);
                    $scope.SalaryList.push({
                        dt: new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate()),
                        am: thisamt
                    });
                }
            } 
        };
        
        $scope.addSalary = function() {
            if ($scope.salaryMonthYear !== "") {
                var my = $scope.salaryMonthYear.split("/");
                var nDate = new Date(my[1], parseInt(my[0]) - 1, 2);
                $scope.SalaryListLocal.push({ dt: nDate, am: $scope.salaryamt });
                sf.Del("SalaryListLocal");
                sf.Set("SalaryListLocal", $scope.SalaryListLocal);
                calc();
                $scope.salaryMonthYear = "";
                $scope.salaryamt = "";
            }
        };

        $scope.delSalary = function(salary) {
            var index = $scope.SalaryListLocal.indexOf(salary);
            $scope.SalaryListLocal.splice(index, 1);
            sf.Del("SalaryListLocal");
            sf.Set("SalaryListLocal", $scope.SalaryListLocal);
            calc();
        };
        
        function load(){
            $scope.SalaryListLocal = sf.Get("SalaryListLocal") || [];
            calc();
        }
        
        load();
    }]);

app.directive("salary",
    function() {
        return {
            controller: "c1",
            template: angular.element("#idsalaryformview").html(),
            replace: false
        };
    });

app.directive("salaryList",
    [
        function() {
            return {
                scope: {
                    ShowDelete: "=shdel",
                    SalaryListRemote: "=info",
                    delete1: "&onDelete"
                    
                },
                controller: "c1",
                template: angular.element("#idofthedive").html(),
                replace: false
            };
        }
    ]);