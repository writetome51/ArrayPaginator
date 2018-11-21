var ArrayPaginator = require('./index').ArrayPaginator;

let paginator = new ArrayPaginator(['hello','goodbye']);

console.log(paginator.itemsPerPage);