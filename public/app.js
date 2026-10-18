angular.module("myApp").controller("MainController", function (RecordFactory) {
  var vm = this;

  // ── ONLY CHANGE THESE to customise the app for any topic ──────────────────
  vm.title       = "Record Management";
  vm.subtitle    = "Keep your information organized";
  vm.listTitle   = "All records";
  vm.firstLabel  = "First";
  vm.secondLabel = "Second";
  vm.thirdLabel  = "Third";
  vm.fourthLabel = "Fourth";
  // ─────────────────────────────────────────────────────────────────────────

  vm.records    = [];
  vm.form       = {};
  vm.editing    = false;
  vm.searchText = "";
  vm.message    = "";
  vm.dbStatus   = "Checking database";

  // GET – load all records
  vm.load = function () {
    RecordFactory.getAll().then(function (response) {
      vm.records = response.data;
    }).catch(function () {
      vm.message = "Could not load records. Check the server and MongoDB.";
    });
  };

  // GET – health check
  vm.checkHealth = function () {
    RecordFactory.getHealth().then(function (response) {
      vm.dbStatus = response.data.database === "Connected" ? "Database connected" : "Database disconnected";
    }).catch(function () {
      vm.dbStatus = "Database unavailable";
    });
  };

  // POST / PUT – add or update a record
  vm.save = function () {
    var payload = {
      first:  vm.form.first,
      second: vm.form.second,
      third:  vm.form.third,
      fourth: vm.form.fourth
    };

    var request = vm.editing
      ? RecordFactory.update(angular.extend({ id: vm.form.id }, payload))
      : RecordFactory.add(payload);

    request.then(function () {
      vm.message = vm.editing ? "Changes saved successfully." : "Record added successfully.";
      vm.reset();
      vm.load();
    }).catch(function () {
      vm.message = "Unable to save this record. Please check the details.";
    });
  };

  // Load record into form for editing
  vm.edit = function (record) {
    vm.form    = angular.copy(record);
    vm.editing = true;
    vm.message = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE – remove a record
  vm.remove = function (record) {
    if (confirm("Are you sure you want to delete this record?")) {
      RecordFactory.remove(record.id).then(function () {
        vm.message = "Record deleted successfully.";
        vm.load();
      }).catch(function () {
        vm.message = "Unable to delete this record.";
      });
    }
  };

  vm.reset = function () {
    vm.form    = {};
    vm.editing = false;
  };

  vm.logout = function () {
    sessionStorage.removeItem("demoLoggedIn");
    window.location.href = "/login.html";
  };

  vm.checkHealth();
  vm.load();
});
