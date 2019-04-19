import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {


	itemsPerPage: number;
	currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;

	private __itemsPerPage;
	private __currentPageNumber;



	constructor(
		data?: any[], // the actual array, represented by inherited property this.data
		__itemsPerPage?: number
	);


	private __getPage;
	private __errorIfRequestedPageDoesNotExist;
	private __isLastPage;

}
