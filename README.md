To include in your project:

import {ArrayPaginator} from '@writetome51/array-paginator';

ArrayPaginator provides one public method, getPage(pageIndex), that returns a sub-array
of items copied from the entire array.

Example:

let paginator = new ArrayPaginator(theArray, itemsPerPage);

(if no arguments are passed to constructor, theArray = [] and itemsPerPage = 25)

let page = paginator.getPage(pageIndex);  // page indexes begin at 0.

// Assigning it a new array:

paginator.data = [item1, item2, item3, ...]

// Changing number of items displayed in each page:

paginator.itemsPerPage = 15;

// Getting the total number of pages:

let totalPages = paginator.totalPages;


Further info:

It has 3 public properties:

data (read-writable):  this holds the array.  Whenever data is assigned a new value, it errors if it's not an array.

itemsPerPage (read-writable):  integer

totalPages (read-only):  integer
