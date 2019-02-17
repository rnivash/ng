
var app = angular.module("app1");

app.controller("c1",
    function($scope) {

        $scope.currentDate = new Date();
        $scope.salaryMonthYear = "";
        $scope.salaryamt = "";
        $scope.SalaryList = [];
        $scope.SalaryListLocal = [];
        $scope.TotalSalaryIncome = 0;

       

        var getSalary = function(adate) {
            var thisamt = 0;
            for (var i = 0; i < $scope.SalaryListLocal.length; i++) {
                var ad = $scope.SalaryListLocal[i].dt;
                if (ad <= adate)
                    thisamt = $scope.SalaryListLocal[i].am;
            }
            return parseFloat(thisamt);
        };
        var calc = function () {
            $scope.SalaryList = [];
            $scope.TotalSalaryIncome = 0;
            if ($scope.SalaryListLocal.length > 0) {
                var cDate = $scope.SalaryListLocal[0].dt;
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
                calc();
                $scope.salaryMonthYear = "";
                $scope.salaryamt = "";
            }
        };

        $scope.delSalary = function(salary) {
            var index = $scope.SalaryListLocal.indexOf(salary);
            $scope.SalaryListLocal.splice(index, 1);
            calc();
        };
    });

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