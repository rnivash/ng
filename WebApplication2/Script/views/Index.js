
var app = angular.module("app1", [])

app.controller("c1", function ($scope) {
    $scope.currentDate = new Date();
    $scope.salaryMonthYear = "";
    $scope.salaryamt = "";
    $scope.SalaryList = [];
    $scope.SalaryListLocal = [];
    $scope.TotalSalaryIncome = 0;

    $scope.addSalary = function () {
        if ($scope.salaryMonthYear != "") {
            var my = $scope.salaryMonthYear.split("/");
            var nDate = new Date(my[1], parseInt(my[0])-1, 2);
            $scope.SalaryListLocal.push({ dt: nDate, am: $scope.salaryamt });         
            calc();
        }
    }

    var calc = function () {
        var cDate = $scope.SalaryListLocal[0].dt;
        cDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate())
        $scope.SalaryList = [];
        $scope.TotalSalaryIncome = 0;
        for ( cDate ; cDate < $scope.currentDate; cDate.setMonth(cDate.getMonth() + 1)) {
            var thisamt = getSalary(cDate);
            $scope.TotalSalaryIncome += parseFloat(thisamt);
            $scope.SalaryList.push({ dt: new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate()), am: thisamt });
        }
    };

    var getSalary = function(adate){
        var thisamt = 0;
        for (var i = 0; i < $scope.SalaryListLocal.length; i++) {
            var ad = $scope.SalaryListLocal[i].dt;
            if (ad <= adate)
                thisamt = $scope.SalaryListLocal[i].am;
        }
        return parseFloat(thisamt);
    }


        
});

app.directive("salary", function () {
    return {
        controller: "c1",
        template: "<div><input ng-model='salaryMonthYear' /> \
        <input ng-model='salaryamt' /> \
<button ng-click='addSalary()' >Add</button> <h1>{{TotalSalaryIncome}}</h1> \
<salary-list></salary-list></div>",
        replace: true
    };
});


app.directive("salaryList", function () {
    return {
        controller: "c1",
        template: "<ul ng-repeat='abc in SalaryList' ><li>{{abc.dt | date:'MMM yyyy'  }} RS.{{abc.am}}</li></ul>",
        replace: true
    };
});
