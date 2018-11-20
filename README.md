To include in your project:

    import {ArrayPaginator} from '@writetome51/array-paginator';

ArrayPaginator provides one public method:  

    getPage(pageIndex): any[]  
    // returns a sub-array (or 'page') of items copied from the entire array.

It has 3 public properties:

data : any[] (read-writable)  // This holds the array.

itemsPerPage: integer  (read-writable)  

totalPages :  integer (read-only)  


Example:

    let paginator = new ArrayPaginator(theArray, itemsPerPage);  
    // (if no arguments are passed to constructor, theArray = [] and itemsPerPage = 25)

    let page = paginator.getPage(pageIndex);  // page indexes begin at 0.

    // Assigning it a new array:  
    paginator.data = [item1, item2, item3, ...]

    // Changing number of items per page:  
    paginator.itemsPerPage = 15;

    // Getting the total number of pages:  
    let totalPages = paginator.totalPages;
