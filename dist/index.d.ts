import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {
	private __itemsPerPage;


	constructor(
		data?: any[], // the actual array, represented by inherited property this.data
		__itemsPerPage?: number
	);


	itemsPerPage: number;
	readonly totalPages: number;


	getPage(pageIndex: any): any[];


	private __errorIfRequestedPageDoesNotExist;
	private __isLastPage;
}
