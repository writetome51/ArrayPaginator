import { errorIfNotInteger } from 'error-if-not-integer';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { getTail } from '@writetome51/array-get-head-tail';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { PublicArrayContainer } from '@writetome51/public-array-container';


export class ArrayPaginator extends PublicArrayContainer {

	// currentPageNumber: number
	protected _currentPageNumber: number;


	constructor(
		data = [], // the actual array, represented by inherited property this.data
		private __itemsPerPage = 25
	) {
		super(data);
		this.itemsPerPage = this.__itemsPerPage;  // __itemsPerPage gets validated.
	}


	set itemsPerPage(value) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error('The number of items per page must be at least 1');

		this.__itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__itemsPerPage;
	}


	// Setting this.currentPageNumber causes this.currentPage to update.

	set currentPageNumber(value) {
		this.__errorIfRequestedPageDoesNotExist(value);
		this._currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this._currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__getPage(this._currentPageNumber);
	}


	get totalPages(): number {
		return getRoundedUp(this.data.length / this.itemsPerPage);
	}


	private __getPage(pageNumber): any[] {

		const firstIndexToGet = (this.itemsPerPage * (pageNumber - 1));

		if (this.__isLastPage(pageNumber)) {

			// ...only return the remaining items in array, not this.itemsPerPage:
			let numItemsToGet = (this.data.length - firstIndexToGet);
			return getTail(numItemsToGet, this.data);
		}
		else return getAdjacentAt(firstIndexToGet, this.itemsPerPage, this.data);
	}


	private __errorIfRequestedPageDoesNotExist(pageNumber) {
		errorIfNotInteger(pageNumber);

		let totalPages = this.totalPages; // So it only calls getter function once.
		if (totalPages === 0 || not(inRange([1, totalPages], pageNumber))) {
			throw new Error('The requested page does not exist');
		}
	}


	private __isLastPage(pageNumber): boolean {
		return (pageNumber === this.totalPages);
	}


}
