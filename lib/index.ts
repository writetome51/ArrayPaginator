import { PublicArrayContainer } from '@writetome51/public-array-container';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getTail } from '@writetome51/array-get-head-tail';
import { inRange } from '@writetome51/in-range';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { not } from '@writetome51/not';


export class ArrayPaginator extends PublicArrayContainer {

	private __currentPageNumber: number;


	constructor(
		data = [], // the actual array, represented by inherited property this.data
		private __itemsPerPage = 25
	) {
		super(data);
		this.itemsPerPage = this.__itemsPerPage; // __itemsPerPage gets validated.
	}


	set itemsPerPage(value) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error('The number of items per page must be at least 1');

		this.__itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__itemsPerPage;
	}


	get totalPages(): number {
		return getRoundedUp(this.data.length / this.itemsPerPage);
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	// the main feature of this class:

	getPage(pageIndex): any[] {
		this.__errorIfRequestedPageDoesNotExist(pageIndex);
		this.__currentPageNumber = (pageIndex + 1);

		const firstIndexToGet = this.itemsPerPage * pageIndex;

		if (this.__isLastPage(pageIndex)) {
			// ...only return the remaining items in array, not this.itemsPerPage:
			return getTail((this.data.length - firstIndexToGet), this.data);
		}
		else return getAdjacentAt(firstIndexToGet, this.itemsPerPage, this.data);
	}


	private __errorIfRequestedPageDoesNotExist(pageIndex) {
		let totalPages = this.totalPages; // So it only calls getter function once.
		if (totalPages === 0 || not(inRange([0, totalPages - 1], pageIndex))) {
			throw new Error('The requested page does not exist');
		}
	}


	private __isLastPage(pageIndex): boolean {
		return (pageIndex === (this.totalPages - 1));
	}


}
