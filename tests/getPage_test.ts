import { ObjectFactory } from '@writetome51/object-factory/ObjectFactory';
import { ArrayPaginator } from '../ArrayPaginator';
import { getCountup } from 'intuitive-number-handlers/get/getCountup_getCountdown';
import { arraysMatch } from 'intuitive-array-handlers/no_modify/return_boolean/arraysMatch';


// Setup:
let paginator = ObjectFactory.getInstance(ArrayPaginator);
paginator.itemsPerPage = 25;
paginator.data = getCountup(1, 50); // now data has numbers 1 thru 50.


// Test 1: make sure paginator.getPage(index) returns the right items:
let page1 = paginator.getPage(0);
let page2 = paginator.getPage(1);

if (arraysMatch(page1, getCountup(1, 25)) &&
	arraysMatch(page2, getCountup(26, 50))) console.log('test 1 passed');
else console.log('test 1 failed');


// Test 2:  make sure paginator.getPage(index) returns the right items when
// the itemsPerPage is different:
paginator.itemsPerPage = 10;
page1 = paginator.getPage(0);
page2 = paginator.getPage(1);
let page3 = paginator.getPage(2);
let page4 = paginator.getPage(3);
let page5 = paginator.getPage(4);

if (arraysMatch(page1, getCountup(1, 10)) &&
	arraysMatch(page2, getCountup(11, 20)) &&
	arraysMatch(page3, getCountup(21,30)) &&
	arraysMatch(page4, getCountup(31,40)) &&
	arraysMatch(page5, getCountup(41,50))) console.log('test 2 passed');
else console.log('test 2 failed');


// Test 3:  if a pageIndex that doesn't exist is passed to .getPage() it should trigger
// error:
let errorTriggered = false;
try{
	let page6 = paginator.getPage(5);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 3 passed');
else console.log('test 3 failed');


// Test 4: Make sure paginator.totalPages is always correct after changing the amount
// of data and itemsPerPage several times:
let results = [];
paginator.data = [];
paginator.itemsPerPage = 0;
results.push(paginator.totalPages);
console.log(paginator.totalPages);
