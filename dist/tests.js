"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var get_countup_countdown_1 = require("@writetome51/get-countup-countdown");
var arrays_match_1 = require("@writetome51/arrays-match");
// Setup:
var paginator = new index_1.ArrayPaginator(get_countup_countdown_1.getCountup(1, 55));
// now paginator.data has numbers 1 thru 55, and itemsPerPage = 25.
// Test 1: make sure paginator.getPage(index) returns the right items:
var page1 = paginator.getPage(0);
var page2 = paginator.getPage(1);
var page3 = paginator.getPage(2);
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 25)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(26, 50)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(51, 55)))
    console.log('test 1 passed');
else
    console.log('test 1 failed');
// Test 2:  make sure paginator.getPage(index) returns the right items when
// the itemsPerPage is different:
paginator.data = get_countup_countdown_1.getCountup(1, 33);
paginator.itemsPerPage = 10;
page1 = paginator.getPage(0);
page2 = paginator.getPage(1);
page3 = paginator.getPage(2);
var page4 = paginator.getPage(3);
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 10)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(11, 20)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(21, 30)) &&
    arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(31, 33)))
    console.log('test 2 passed');
else
    console.log('test 2 failed');
// Test 3:  if a pageIndex that doesn't exist is passed to .getPage() it should trigger
// error:
var errorTriggered = false;
try {
    var page6 = paginator.getPage(6);
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
var expectedResults = [1, 2, 4, 3];
paginator.data = [1, 2, 3, 4, 5];
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
if (arrays_match_1.arraysMatch(results, expectedResults))
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
// Test 7: if first argument to constructor is not array, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator({ prop: 1 });
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 7 passed');
else
    console.log('test 7 failed');
// Test 8: if second argument to constructor is not integer, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator([1, 2, 3], 1.05);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 8 passed');
else
    console.log('test 8 failed');
// Test 9: if second argument is less than 1, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator([1, 2, 3], 0);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 9 passed');
else
    console.log('test 9 failed');
// Test 10: if array is empty and you try to get the first page, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator([], 1);
    paginator.getPage(0);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 10 passed');
else
    console.log('test 10 failed');
// Test 11: if array is empty and you try to get a negative page index, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator([], 1);
    paginator.getPage(-1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 11 passed');
else
    console.log('test 11 failed');
// Test 12: if itemsPerPage is greater than array length, it simply returns the entire array:
paginator = new index_1.ArrayPaginator([1, 2, 3, 4, 5], 12);
page1 = paginator.getPage(0);
if (arrays_match_1.arraysMatch(page1, [1, 2, 3, 4, 5]))
    console.log('test 12 passed');
else
    console.log('test 12 failed');
