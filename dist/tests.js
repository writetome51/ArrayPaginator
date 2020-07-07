"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var get_countup_countdown_1 = require("@writetome51/get-countup-countdown");
var arrays_match_1 = require("@writetome51/arrays-match");
// Setup:
var pageInfo = {
    __itemsPerPage: undefined,
    setItemsPerPage: function (num) {
        _this.__itemsPerPage = num;
    },
    getItemsPerPage: function () { return _this.__itemsPerPage; }
};
pageInfo.setItemsPerPage(25);
var paginator = new index_1.ArrayPaginator(get_countup_countdown_1.getCountup(1, 55), pageInfo);
// now paginator.data has numbers 1 thru 55, and itemsPerPage = 25.
// Test 0: make sure .getTotalPages() is accurate:
if (paginator.getTotalPages() === 3)
    console.log('test 0 passed');
else
    console.log('test 0 FAILED');
// Test 1: make sure paginator.getPage() returns the right items:
var page1 = paginator.getPage(1);
var page2 = paginator.getPage(2);
var page3 = paginator.getPage(3);
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 25)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(26, 50)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(51, 55)))
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
// Test 2:  make sure paginator.getPage() returns the right items when
// the itemsPerPage is different:
pageInfo.setItemsPerPage(15);
var currentPageResults = [];
page1 = paginator.getPage(1);
currentPageResults.push(paginator.getCurrentPageNumber());
page2 = paginator.getPage(2);
currentPageResults.push(paginator.getCurrentPageNumber());
page3 = paginator.getPage(3);
currentPageResults.push(paginator.getCurrentPageNumber());
var page4 = paginator.getPage(4);
currentPageResults.push(paginator.getCurrentPageNumber());
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 15)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(16, 30)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(31, 45)) &&
    arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(46, 55)))
    console.log('test 2 passed');
else
    console.log('test 2 FAILED');
// Test 2A: make sure the current page results from previous test are correct:
if (arrays_match_1.arraysMatch(currentPageResults, [1, 2, 3, 4]))
    console.log('test 2A passed');
else
    console.log('test 2A FAILED');
// Test 3:  if a page that doesn't exist is passed to .getPage() it should trigger
// error:
var errorTriggered = false;
try {
    paginator.getPage(5);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 3 passed');
else
    console.log('test 3 FAILED');
// Test 4: Make sure paginator.getTotalPages() is always correct after changing the amount
// of data and itemsPerPage several times:
var results = [];
var expectedResults = [1, 2, 4, 3];
paginator.data = [1, 2, 3, 4, 5];
pageInfo.setItemsPerPage(5);
results.push(paginator.getTotalPages()); // should be 1.
paginator.data = [1, 2];
pageInfo.setItemsPerPage(1);
results.push(paginator.getTotalPages()); // should be 2.
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 10
pageInfo.setItemsPerPage(3);
results.push(paginator.getTotalPages()); // should be 4.
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]; // 21
pageInfo.setItemsPerPage(9);
results.push(paginator.getTotalPages()); // should be 3.
if (arrays_match_1.arraysMatch(results, expectedResults))
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
// Test 4A: Make sure paginator.getTotalPages() is always correct after changing the
// itemsPerPage several times:
results = [];
expectedResults = [5, 21, 6, 4];
paginator.data = get_countup_countdown_1.getCountup(1, 21);
pageInfo.setItemsPerPage(5);
page1 = paginator.getPage(1); // should be [1,2,3,4,5]
results.push(paginator.getTotalPages()); // should be 5.
pageInfo.setItemsPerPage(1);
page2 = paginator.getPage(2); // should be [2]
results.push(paginator.getTotalPages()); // should be 21.
pageInfo.setItemsPerPage(4);
page3 = paginator.getPage(3); // should be [9,10,11,12]
results.push(paginator.getTotalPages()); // should be 6.
pageInfo.setItemsPerPage(6);
page4 = paginator.getPage(4); // should be [19,20,21]
results.push(paginator.getTotalPages()); // should be 4.
if (arrays_match_1.arraysMatch(results, expectedResults))
    console.log('test 4A passed');
else
    console.log('test 4A FAILED');
// Test 4B: make sure resulting pages of previous test are correct:
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 5)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(2, 2)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(9, 12)) &&
    arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(19, 21)))
    console.log('test 4B passed');
else
    console.log('test 4B FAILED');
// Test 5: if itemsPerPage is set to a non-number, float, 0, or negative, an error is
// triggered.
// To pass, all these should trigger errors:
var numErrors = 0;
pageInfo.setItemsPerPage(false);
try {
    paginator.getPage(1);
}
catch (e) {
    ++numErrors;
}
pageInfo.setItemsPerPage(1.2);
try {
    paginator.getPage(1);
}
catch (e) {
    ++numErrors;
}
pageInfo.setItemsPerPage(0);
try {
    paginator.getPage(1);
}
catch (e) {
    ++numErrors;
}
pageInfo.setItemsPerPage(-0.1);
try {
    paginator.getPage(1);
}
catch (e) {
    ++numErrors;
}
if (numErrors === 4)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
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
    console.log('test 6 FAILED');
// Test 7: if first argument to constructor is not array, it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator('', pageInfo);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 7 passed');
else
    console.log('test 7 FAILED');
// Test 8: if second argument to constructor is not object it triggers error:
errorTriggered = false;
try {
    paginator = new index_1.ArrayPaginator([1, 2, 3], 1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 8 passed');
else
    console.log('test 8 FAILED');
// Test 9: if itemsPerPage is less than 1, it triggers error:
errorTriggered = false;
pageInfo.setItemsPerPage(0);
paginator = new index_1.ArrayPaginator([1, 2, 3], pageInfo);
try {
    paginator.getPage(1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 9 passed');
else
    console.log('test 9 FAILED');
// Test 10: if array is empty and you try to get the first page, it triggers error:
errorTriggered = false;
pageInfo.setItemsPerPage(1);
paginator = new index_1.ArrayPaginator([], pageInfo);
try {
    paginator.getPage(1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 10 passed');
else
    console.log('test 10 FAILED');
// Test 11: if you try to get a negative page number, it triggers error:
errorTriggered = false;
paginator.data = [1, 2, 3, 4, 5, 6, 7];
try {
    paginator.getPage(-1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 11 passed');
else
    console.log('test 11 FAILED');
// Test 12: if itemsPerPage is greater than array length, .getPage(1) simply returns the entire array:
pageInfo.setItemsPerPage(12);
paginator = new index_1.ArrayPaginator([1, 2, 3, 4, 5], pageInfo);
page1 = paginator.getPage(1);
if (arrays_match_1.arraysMatch(paginator.getPage(1), paginator.data))
    console.log('test 12 passed');
else
    console.log('test 12 FAILED');
