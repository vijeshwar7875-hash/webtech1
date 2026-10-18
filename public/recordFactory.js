angular.module("myApp").factory("RecordFactory", function (RecordService) {
  return {
    getAll: function () { return RecordService.getAll(); },
    add: function (record) { return RecordService.add(record); },
    update: function (record) { return RecordService.update(record); },
    remove: function (id) { return RecordService.remove(id); },
    getHealth: function () { return RecordService.getHealth(); }
  };
});
