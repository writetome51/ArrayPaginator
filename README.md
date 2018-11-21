# ArrayPaginator

A TypeScript/Javascript class for paginating an array.

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/array-paginator
```

## Loading

```
// If using TypeScript:
import {ArrayPaginator} from '@writetome51/array-paginator';
// If using ES5 JavaScript:
var ArrayPaginator = require('@writetome51/array-paginator').ArrayPaginator;
```

## Public API   

### Constructor

```
new ArrayPaginator(data = [], itemsPerPage = 25)
// param 'data' is the array being paginated.
```

### Properties

`data` : any[] (read-writable) .  This holds the array.

`itemsPerPage` : integer  (read-writable)  

`totalPages` :  integer (read-only) 

### Methods

`getPage(pageIndex)` : any[]  (returns a sub-array of items copied from entire array)
   

## Usage

```
// Getting an instance:
let paginator = new ArrayPaginator(theArray, itemsPerPage); 

// Getting a page:
let page = paginator.getPage(pageIndex);  // page indexes begin at 0.

// Assigning it a new array:  
paginator.data = [item1, item2, item3, ...]

// Changing number of items per page:  
paginator.itemsPerPage = 15;

// Getting the total number of pages:  
let totalPages = paginator.totalPages;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)