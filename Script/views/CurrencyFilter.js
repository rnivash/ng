
var app = angular.module("app1", []);

app.filter("indcurr", function () {
    return function (input) {
        input = input + "";
        if (input.length === 4) {
            input = input.substring(0, 1) + "," + input.substring(1, 4);
        }
        else if (input.length === 5) {
            input = input.substring(0,2) + "," + input.substring(2, 5);
        }
        else if (input.length === 6) {
            input = input.substring(0, 1) + "," + input.substring(1, 2) + "," + input.substring(3, 6);
        }
        else if (input.length === 7) {
            input = input.substring(0, 2) + "," + input.substring(2, 4) + "," + input.substring(4, 7);
        }
        return "RS. " + input;
    };
});