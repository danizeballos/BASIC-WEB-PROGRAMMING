var app = angular.module('ProductsApp', []);
app.controller('ProductController', ($scope) => {
    $scope.product = {};
    $scope.products = new Array();

    $scope.addProduct = () => {
        $scope.products.push({
            name: $scope.product.name,
            price: $scope.product.price,
            quantity: $scope.product.quantity,
            description: $scope.product.description,
        });
    }

    $scope.deleteProduct = (i) => {
        $scope.products.splice(i, 1);
    }
});