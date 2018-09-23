"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectFactory_1 = require("@writetome51/object-factory/ObjectFactory");
var ArrayPaginator_1 = require("../ArrayPaginator");
var getCountup_getCountdown_1 = require("intuitive-number-handlers/get/getCountup_getCountdown");
var arraysMatch_1 = require("intuitive-array-handlers/no_modify/return_boolean/arraysMatch");
// Setup:
var paginator = ObjectFactory_1.ObjectFactory.getInstance(ArrayPaginator_1.ArrayPaginator);
paginator.itemsPerPage = 25;
paginator.data = getCountup_getCountdown_1.getCountup(1, 50); // now data has numbers 1 thru 50.
// Test 1: make sure paginator.getPage(index) returns the right items:
var page1 = paginator.getPage(0);
var page2 = paginator.getPage(1);
if (arraysMatch_1.arraysMatch(page1, getCountup_getCountdown_1.getCountup(1, 25)) &&
    arraysMatch_1.arraysMatch(page2, getCountup_getCountdown_1.getCountup(26, 50)))
    console.log('test 1 passed');
else
    console.log('test 1 failed');
// Test 2:  make sure paginator.getPage(index) returns the right items when
// the itemsPerPage is different:
paginator.itemsPerPage = 10;
page1 = paginator.getPage(0);
page2 = paginator.getPage(1);
var page3 = paginator.getPage(2);
var page4 = paginator.getPage(3);
var page5 = paginator.getPage(4);
if (arraysMatch_1.arraysMatch(page1, getCountup_getCountdown_1.getCountup(1, 10)) &&
    arraysMatch_1.arraysMatch(page2, getCountup_getCountdown_1.getCountup(11, 20)) &&
    arraysMatch_1.arraysMatch(page3, getCountup_getCountdown_1.getCountup(21, 30)) &&
    arraysMatch_1.arraysMatch(page4, getCountup_getCountdown_1.getCountup(31, 40)) &&
    arraysMatch_1.arraysMatch(page5, getCountup_getCountdown_1.getCountup(41, 50)))
    console.log('test 2 passed');
else
    console.log('test 2 failed');
// Test 3:  if a pageIndex that doesn't exist is passed to .getPage() it should trigger
// error:
var errorTriggered = false;
try {
    var page6 = paginator.getPage(5);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 3 passed');
else
    console.log('test 3 failed');
// Test 4: Make sure paginator.totalPages is always correct after changing the amount
// of data and itemsPerPage several times:
var results = [];
paginator.data = [];
paginator.itemsPerPage = 0;
results.push(paginator.totalPages);
console.log(paginator.totalPages);
