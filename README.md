To get an instance of this class:

let paginator = ObjectFactory.getInstance(ArrayPaginator, [theArray, numItemsPerPage]);

Then, to get a page of items:

let page = paginator.getPage(pageIndex);

Further info:

ArrayPaginator provides one public method, getPage(pageIndex), that returns a sub-array of items copied
from the entire array.

It has 3 public properties:

data (read-writable):  this holds the array.

itemsPerPage (read-writable):  number

totalPages (read-only):  number

Its private property this._itemGetter checks the entire array to make sure its actually an
array, so you don't need to do that yourself.