import { PublicArrayContainer } from '@writetome51/public-array-container';


export declare class ArrayPaginator extends PublicArrayContainer {

	private __pageInfo;
	private __currentPageNumber;


	constructor(
		data: any[], // the actual array, becoming inherited property this.data

		__pageInfo: {
			setItemsPerPage: (num: number) => void;
			getItemsPerPage: () => number;
		}
	);


	getPage(pageNumber: number): any[];

	getCurrentPageNumber(): number;

	getTotalPages(): number;

}
