var app = angular.module("productApp", []);


app.controller("index", function ($scope, $http) {
    $http.get("/api/Products").then(function (response) {
        $scope.products = response.data;
    });

    $scope.confirm = function (e) {
        swal({
            title: 'Confirmation',
            text: "Are you sure want to delete the data?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }, function (isConfirmed) {
            if (isConfirmed) {
                $http.delete("/api/Products/" + e.product.ProductId).then(function () {
                    window.location.href = "/Product";
                });
            }
        });
        
    }
});

app.controller("create", function ($scope, $http) {
    $scope.product = {};
    $scope.submit = function () {
        $http({
            method: "POST",
            url: "/api/Products",
            data: $scope.product
        }).then(function (response) {
            if (response.status === 201) {
                $scope.createForm.$setPristine();
                $scope.createForm.$setUntouched();
                $scope.product = {};
                $scope.isCreated = true;
                return;
            }
            $scope.isCreated = false;
            return;
        });
    }
});

app.controller("details", function ($scope, $http) {
    $scope.product = {};
    $scope.showDetails = function (productId) {
        $http.get("/api/Products/" + productId).then(function (resp) {
            console.log(resp);
            if (resp.status === 200) {
                $scope.product.ProductName = resp.data.ProductName;
                $scope.product.Price = resp.data.Price;
                $scope.product.Description = resp.data.Description;
            }
        });
    }
});

app.controller("edit", function($scope, $http) {
    $scope.product = {};
    var id = null;
    $scope.getData = function (productId) {
        id = productId;
        $http.get("/api/Products/" + productId).then(function (resp) {
            if (resp.status === 200) {
                $scope.product.ProductName = resp.data.ProductName;
                $scope.product.Price = resp.data.Price;
                $scope.product.Description = resp.data.Description;
            }
        });
    }
    $scope.submit = function () {
        $scope.product.ProductId = id;
        $http.put("/api/Products", $scope.product).then(function() {
            window.location.href = "/Product";
        }); 
    }
});