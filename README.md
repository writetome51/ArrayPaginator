To get an instance of this class:

let paginator = ObjectFactory.getInstance(ArrayPaginator, [theArray, numItemsPerPage]);

Then, to get a page of items:

let page = paginator.getPage(pageIndex);

Further info:

ArrayPaginator provides one public method, getPage(pageIndex), that returns a sub-array of items copied
from the entire array.

It has one public property, data, which holds the array.

Its private property this._itemGetter checks the entire array to make sure its actually an
array, so you don't need to do that yourself.