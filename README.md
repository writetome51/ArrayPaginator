ArrayPaginator provides one public method, getPage(pageIndex), that returns a sub-array
of items copied from the entire array.

Example:

let paginator = new ArrayPaginator(theArray, itemsPerPage);

(if no arguments are passed to constructor, theArray = [] and itemsPerPage = 25)

let page = paginator.getPage(pageIndex);


Further info:

It has 3 public properties:

data (read-writable):  this holds the array.

itemsPerPage (read-writable):  integer

totalPages (read-only):  integer

Whenever the data property is assigned a new value, it's checked to make sure it's
an array.