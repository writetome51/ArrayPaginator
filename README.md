ArrayPaginator provides one public method, getPage(pageIndex), that returns a sub-array
of items copied from the entire array.

Example:

let paginator = new ArrayPaginator(theArray, numItemsPerPage);

let page = paginator.getPage(pageIndex);


Further info:

It has 3 public properties:

data (read-writable):  this holds the array.

itemsPerPage (read-writable):  number

totalPages (read-only):  number

Whenever the data property is assigned a new value, it's checked to make sure it's
an array.