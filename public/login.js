angular.module("loginApp", []).controller("LoginController", function ($http) {
  var vm = this;
  vm.username = "";
  vm.password = "";
  vm.loading = false;
  vm.error = "";

  vm.login = function () {
    vm.loading = true;
    vm.error = "";
    $http.post("/api/login", {
      username: vm.username,
      password: vm.password
    }).then(function (response) {
      if (response.data && response.data.success) {
        sessionStorage.setItem("demoLoggedIn", "true");
        window.location.href = "/";
      } else {
        vm.error = "Please check your login details.";
      }
    }).catch(function () {
      vm.error = "Login failed. Check the server and try again.";
    }).finally(function () {
      vm.loading = false;
    });
  };
});
