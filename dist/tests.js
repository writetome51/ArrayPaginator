import {ArrayPaginator} from './index.js';
import {getCountup} from '@writetome51/get-countup-countdown';
import {arraysMatch} from '@writetome51/arrays-match';


// Setup:
let pageConfigurator = {
	__itemsPerPage: undefined,
	setItemsPerPage: function(num) {
		this.__itemsPerPage = num;
	},
	getItemsPerPage: function() {
		return this.__itemsPerPage;
	}
};
pageConfigurator.setItemsPerPage(25);
let paginator = new ArrayPaginator(getCountup(1, 55), pageConfigurator);

// now paginator.data has numbers 1 thru 55, and itemsPerPage = 25.
// Test 0: make sure .getTotalPages() is accurate:
if (paginator.getTotalPages() === 3) console.log('test 0 passed');
else console.log('test 0 FAILED');


// Test 1: make sure paginator.getPage() returns the right items:
let page1 = paginator.getPage(1);
let page2 = paginator.getPage(2);
let page3 = paginator.getPage(3);
if (arraysMatch(page1, getCountup(1, 25)) &&
	arraysMatch(page2, getCountup(26, 50)) &&
	arraysMatch(page3, getCountup(51, 55))) console.log('test 1 passed');
else console.log('test 1 FAILED');


// Test 2:  make sure paginator.getPage() returns the right items when
// the itemsPerPage is different:
pageConfigurator.setItemsPerPage(15);
let currentPageResults = [];
page1 = paginator.getPage(1);
currentPageResults.push(paginator.getCurrentPageNumber());
page2 = paginator.getPage(2);
currentPageResults.push(paginator.getCurrentPageNumber());
page3 = paginator.getPage(3);
currentPageResults.push(paginator.getCurrentPageNumber());
let page4 = paginator.getPage(4);
currentPageResults.push(paginator.getCurrentPageNumber());
if (arraysMatch(page1, getCountup(1, 15)) &&
	arraysMatch(page2, getCountup(16, 30)) &&
	arraysMatch(page3, getCountup(31, 45)) &&
	arraysMatch(page4, getCountup(46, 55))) console.log('test 2 passed');
else console.log('test 2 FAILED');


// Test 2A: make sure the current page results from previous test are correct:
if (arraysMatch(currentPageResults, [1, 2, 3, 4])) console.log('test 2A passed');
else console.log('test 2A FAILED');


// Test 3:  if a page that doesn't exist is passed to .getPage() it should trigger
// error:
let errorTriggered = false;
try {
	paginator.getPage(5);
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 3 passed');
else console.log('test 3 FAILED');


// Test 4: Make sure paginator.getTotalPages() is always correct after changing the amount
// of data and itemsPerPage several times:
let results = [];
let expectedResults = [1, 2, 4, 3];
paginator.data = [1, 2, 3, 4, 5];
pageConfigurator.setItemsPerPage(5);
results.push(paginator.getTotalPages()); // should be 1.
paginator.data = [1, 2];
pageConfigurator.setItemsPerPage(1);
results.push(paginator.getTotalPages()); // should be 2.
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 10
pageConfigurator.setItemsPerPage(3);
results.push(paginator.getTotalPages()); // should be 4.
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]; // 21
pageConfigurator.setItemsPerPage(9);
results.push(paginator.getTotalPages()); // should be 3.
if (arraysMatch(results, expectedResults)) console.log('test 4 passed');
else console.log('test 4 FAILED');


// Test 4A: Make sure paginator.getTotalPages() is always correct after changing the
// itemsPerPage several times:
results = [];
expectedResults = [5, 21, 6, 4];
paginator.data = getCountup(1, 21);
pageConfigurator.setItemsPerPage(5);
page1 = paginator.getPage(1); // should be [1,2,3,4,5]
results.push(paginator.getTotalPages()); // should be 5.
pageConfigurator.setItemsPerPage(1);
page2 = paginator.getPage(2); // should be [2]
results.push(paginator.getTotalPages()); // should be 21.
pageConfigurator.setItemsPerPage(4);
page3 = paginator.getPage(3); // should be [9,10,11,12]
results.push(paginator.getTotalPages()); // should be 6.
pageConfigurator.setItemsPerPage(6);
page4 = paginator.getPage(4); // should be [19,20,21]
results.push(paginator.getTotalPages()); // should be 4.
if (arraysMatch(results, expectedResults)) console.log('test 4A passed');
else console.log('test 4A FAILED');


// Test 4B: make sure resulting pages of previous test are correct:
if (arraysMatch(page1, getCountup(1, 5)) &&
	arraysMatch(page2, getCountup(2, 2)) &&
	arraysMatch(page3, getCountup(9, 12)) &&
	arraysMatch(page4, getCountup(19, 21))) console.log('test 4B passed');
else console.log('test 4B FAILED');


// Test 5: if itemsPerPage is set to a non-number, float, 0, or negative, an error is
// triggered.
// To pass, all these should trigger errors:
let numErrors = 0;
pageConfigurator.setItemsPerPage(false);
try {
	paginator.getPage(1);
} catch (e) {
	++numErrors;
}
pageConfigurator.setItemsPerPage(1.2);
try {
	paginator.getPage(1);
} catch (e) {
	++numErrors;
}
pageConfigurator.setItemsPerPage(0);
try {
	paginator.getPage(1);
} catch (e) {
	++numErrors;
}
pageConfigurator.setItemsPerPage(-0.1);
try {
	paginator.getPage(1);
} catch (e) {
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
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered)
	console.log('test 6 passed');
else
	console.log('test 6 FAILED');


// Test 7: if first argument to constructor is not array, it triggers error:
errorTriggered = false;
try {
	paginator = new ArrayPaginator('', pageConfigurator);
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered)
	console.log('test 7 passed');
else
	console.log('test 7 FAILED');


// Test 8: if second argument to constructor is not object it triggers error:
errorTriggered = false;
try {
	paginator = new ArrayPaginator([1, 2, 3], 1);
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered)
	console.log('test 8 passed');
else
	console.log('test 8 FAILED');


// Test 9: if itemsPerPage is less than 1, it triggers error:
errorTriggered = false;
pageConfigurator.setItemsPerPage(0);
paginator = new ArrayPaginator([1, 2, 3], pageConfigurator);
try {
	paginator.getPage(1);
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered)
	console.log('test 9 passed');
else
	console.log('test 9 FAILED');


// Test 10: if array is empty and you try to get the first page, it triggers error:
errorTriggered = false;
pageConfigurator.setItemsPerPage(1);
paginator = new ArrayPaginator([], pageConfigurator);
try {
	paginator.getPage(1);
} catch (e) {
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
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered)
	console.log('test 11 passed');
else
	console.log('test 11 FAILED');


// Test 12: if itemsPerPage is greater than array length, .getPage(1) simply returns the entire array:
pageConfigurator.setItemsPerPage(12);
paginator = new ArrayPaginator([1, 2, 3, 4, 5], pageConfigurator);
if (arraysMatch(paginator.getPage(1), paginator.data))
	console.log('test 12 passed');
else
	console.log('test 12 FAILED');
