# ArrayPaginator

A TypeScript/Javascript class for paginating an array.


## Constructor

```
constructor(data? = [], itemsPerPage? = 25)
    // param 'data' is the array being paginated.
```

## Properties
```
data : any[]  // the actual array.

itemsPerPage : integer // default is 25

currentPageNumber : integer
    // Giving this a value causes this.currentPage to update.
    
protected _currentPageNumber: integer
    // is available in case a subclass wants to use it.

currentPage : any[] (read-only)
    // All array items in the current page.

totalPages :  integer (read-only)

className : string (read-only)
```

## Methods
```
getPage(pageIndex) : any[]
    // returns a sub-array of items copied from entire array.
``` 
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
``` 
protected   _createGetterAndOrSetterForEach(
                  propertyNames: string[],
                  configuration: IGetterSetterConfiguration
            ) : void
     /*********************
     Use this method when you have a bunch of properties that need getter and/or 
     setter functions that all do the same thing. You pass in an array of string 
     names of those properties, and the method attaches the same getter and/or 
     setter function to each property.
     IGetterSetterConfiguration is this object:
     {
         get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function,
             // get_setterFunction takes the property name as first argument and 
             // returns the setter function.  The setter function must take one 
             // parameter and return void.
     
         get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function
             // get_getterFunction takes the property name as first argument and 
             // returns the getter function.  The getter function must return something.
     }
     *********************/ 
   
   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.

protected   _runMethod_and_returnThis(
    callingObject, 
    method: Function, 
    methodArgs: any[], 
    additionalAction?: Function // takes the result returned by method as an argument.
) : this
```   

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

// Getting the current page number:  
let currentPageNumber = paginator.currentPageNumber;
```

## Inheritance Chain

ArrayPaginator<--[PublicArrayContainer](https://github.com/writetome51/public-array-container#publicarraycontainer)<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)

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


## License
[MIT](https://choosealicense.com/licenses/mit/)
