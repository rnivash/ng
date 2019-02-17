(function () {
    var app = angular.module("app", []);

    app.service("StorageFactory", StorageFactory);

    function StorageFactory() {
        return {
            Set: function (name, itm) {
                if (Storage) {
                    localStorage[name] = JSON.stringify(itm);
                }
            },

            Get: function (name) {
                if (Storage) {
                    var itm = localStorage[name];
                    if (itm) {
                        return JSON.parse(itm);
                    }
                }
            }
            ,Del: function (name) {
                if (Storage) {
                    localStorage.removeItem[name];                    
                }
            }
        };
    }
})();