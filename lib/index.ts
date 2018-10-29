import { PublicArrayContainer } from '@writetome51/public-array-container';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getTail } from '@writetome51/array-get-head-tail/getTail';
import { inRange } from '@writetome51/in-range';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { not } from '@writetome51/not';


export class ArrayPaginator extends PublicArrayContainer {

	constructor(
		data = [], // the actual array, represented by inherited property this.data
		private _itemsPerPage = 25
	) {
		super(data);
		this.itemsPerPage = this._itemsPerPage; // _itemsPerPage gets validated.
	}


	set itemsPerPage(value) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error('The number of items per page must be at least 1');

		this._itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this._itemsPerPage;
	}


	// read-only:

	get totalPages(): number {
		return getRoundedUp(this.data.length / this.itemsPerPage);
	}


	// the main feature of this class:

	getPage(pageIndex): any[] {
		let totalPages = this.totalPages;
		if (totalPages === 0 || not(inRange([0, totalPages - 1], pageIndex))) {
			throw new Error('The requested page does not exist');
		}
		const firstIndexToGet = this._itemsPerPage * pageIndex;

		if (this.__isLastPage(pageIndex)) {
			// ...only return the remaining items in array, not this.itemsPerPage:
			return getTail((this.data.length - firstIndexToGet), this.data);
		}
		else return getAdjacentAt(firstIndexToGet, this._itemsPerPage, this.data);
	}


	private __isLastPage(pageIndex) {
		return (pageIndex === (this.totalPages - 1));
	}


}
