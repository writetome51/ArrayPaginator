import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {
	private _itemsPerPage;


	constructor(
		data?: any[], // the actual array, represented by inherited property this.data
		_itemsPerPage?: number
	);


	itemsPerPage: number;
	readonly totalPages: number;


	getPage(pageIndex: any): any[];


	private __isLastPage;
}
