angular.module("myApp").service("RecordService", function ($http) {
  this.getAll = function () { return $http.get("/api/records"); };
  this.add = function (record) { return $http.post("/api/records", record); };
  this.update = function (record) { return $http.put("/api/records/" + record.id, record); };
  this.remove = function (id) { return $http.delete("/api/records/" + id); };
  this.getHealth = function () { return $http.get("/api/health"); };
});
