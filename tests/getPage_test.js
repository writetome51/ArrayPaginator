"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayPaginator_1 = require("../ArrayPaginator");
var getCountup_getCountdown_1 = require("@writetome51/get-countup-countdown/getCountup_getCountdown");
var arraysMatch_1 = require("@writetome51/arrays-match/arraysMatch");
// Setup:
var paginator = new ArrayPaginator_1.ArrayPaginator();
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
var expectedResults = [0, 2, 4, 3];
paginator.data = [];
paginator.itemsPerPage = 5;
results.push(paginator.totalPages);
paginator.data = [1, 2];
paginator.itemsPerPage = 1;
results.push(paginator.totalPages);
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 10
paginator.itemsPerPage = 3;
results.push(paginator.totalPages);
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 20
paginator.itemsPerPage = 9;
results.push(paginator.totalPages);
if (arraysMatch_1.arraysMatch(results, expectedResults))
    console.log('test 4 passed');
else
    console.log('test 4 failed.');
// Test 5: if itemsPerPage is set to a non-number, float, 0, or negative, an error is
// triggered.
// To pass, all these should trigger errors:
var numErrors = 0;
try {
    paginator.itemsPerPage = false;
}
catch (e) {
    ++numErrors;
}
try {
    paginator.itemsPerPage = 1.2;
}
catch (e) {
    ++numErrors;
}
try {
    paginator.itemsPerPage = 0;
}
catch (e) {
    ++numErrors;
}
try {
    paginator.itemsPerPage = -0.1;
}
catch (e) {
    ++numErrors;
}
if (numErrors === 4)
    console.log('test 5 passed');
else
    console.log('test 5 failed');
// Test 6: if paginator.data is set to a non-array, it triggers error:
errorTriggered = false;
try {
    paginator.data = {};
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 6 passed');
else
    console.log('test 6 failed');
