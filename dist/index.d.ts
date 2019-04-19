import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {

	private __itemsPerPage;
	protected _currentPageNumber: number;


	constructor(
		data?: any[], // the actual array, represented by inherited property this.data
		__itemsPerPage?: number
	);


	currentPageNumber: number;
	readonly currentPage: any[];
	itemsPerPage: number;
	readonly totalPages: number;
	private __getPage;
	private __errorIfRequestedPageDoesNotExist;
	private __isLastPage;
}
