# ArrayPaginator

A TypeScript/Javascript class for paginating an array.


## Constructor

```ts
constructor(
    data: any[], // the actual array, becoming this.data

    __pageConfigurator: {
        setItemsPerPage: (num) => void;
        getItemsPerPage: () => number;
    }
) 
```

## Properties
<details>
<summary>view properties</summary>

```ts
data : any[]  // the array to be paginated.

className : string // read-only
```
</details>


## Methods
<details>
<summary>view methods</summary>
 
 ```
getPage(pageNumber): any[]

getCurrentPageNumber(): number
    // returns page asked for in most recent call of this.getPage()

getTotalPages(): number
```
 
 
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```ts
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

protected   _errorIfPropertyHasNoValue(
                property: string, // can contain dot-notation, i.e., 'property.subproperty'
                propertyNameInError? = ''
            ) : void
    // If value of this[property] is undefined or null, it triggers fatal error:
    // `The property "${propertyNameInError}" has no value.`
```
</details>  


## Usage
<details>
<summary>view usage</summary>

```ts
// Create a pageConfigurator:

let pageConfigurator = {
	__itemsPerPage: undefined,

	setItemsPerPage: (num) => {
		this.__itemsPerPage = num;
	},
	getItemsPerPage: () => this.__itemsPerPage
};

// Getting an instance:
let paginator = new ArrayPaginator(
    [1,2,3,4,5,6,7,8,9,10], 
    pageConfigurator
);

pageConfigurator.setItemsPerPage(5);
paginator.getPage(1); // --> [1,2,3,4,5]

paginator.getCurrentPageNumber(); // --> 1

paginator.getTotalPages(); // --> 2

pageConfigurator.setItemsPerPage(4);
paginator.getPage(2); // --> [5,6,7,8]

paginator.getCurrentPageNumber(); // --> 2

paginator.getTotalPages(); // --> 3

// Assigning it a new array to paginate:  
paginator.data = [item1, item2, item3, item4];
```
</details>


## Inheritance Chain

ArrayPaginator
<--[PublicArrayContainer](https://github.com/writetome51/public-array-container#publicarraycontainer)
<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)

## Installation

```bash
npm i  @writetome51/array-paginator
```

## Loading

```ts
// If using TypeScript:
import {ArrayPaginator} from '@writetome51/array-paginator';
// If using ES5 JavaScript:
var ArrayPaginator = require('@writetome51/array-paginator').ArrayPaginator;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
