import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {

	private __currentPageNumber;
	private __itemsPerPage;


	constructor(
		data?: any[], // the actual array, becoming inherited property this.data
		options?: { itemsPerPage: number }
	);


	getPage(
		pageNumber: number,
		options?: { itemsPerPage: any; }
	): any[];


	getCurrentPageNumber(): number;


	getTotalPages(): number;


	private __setProperties;
	private __set__itemsPerPage;
	private __errorIfRequestedPageDoesNotExist;
	private __getRemainingItems;
	private __isLastPage;

}
