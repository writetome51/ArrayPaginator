import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { getTail } from '@writetome51/array-get-head-tail';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { hasValue } from '@writetome51/has-value-no-value';
import { PublicArrayContainer } from '@writetome51/public-array-container';


export class ArrayPaginator extends PublicArrayContainer {


	private __currentPageNumber: number;


	constructor(
		data = [], // the actual array, becoming inherited property this.data
		private __pageInfo: {
			setItemsPerPage: (num) => void;
			getItemsPerPage: () => number;
		}
	) {
		super(data);
	}


	getPage(pageNumber: number): any[] {
		this.__set__currentPageNumber(pageNumber);
		let itemsPerPage = this.__pageInfo.getItemsPerPage();

		const firstIndexToGet = (itemsPerPage * (pageNumber - 1));

		if (this.__isLastPage(pageNumber)) return this.__getRemainingItems(firstIndexToGet);
		else return getAdjacentAt(firstIndexToGet, itemsPerPage, this.data);
	}


	getCurrentPageNumber(): number {
		return this.__currentPageNumber;
	}


	getTotalPages(): number {
		return getRoundedUp(this.data.length / this.__pageInfo.getItemsPerPage());
	}


	private __set__currentPageNumber(value) {
		this.__errorIfRequestedPageDoesNotExist(value);
		this.__currentPageNumber = value;
	}


	private __errorIfRequestedPageDoesNotExist(pageNumber) {
		let totalPages = this.getTotalPages();

		if (totalPages === 0 || not(inRange([1, totalPages], pageNumber))) {
			throw new Error('The requested page does not exist');
		}
	}


	private __getRemainingItems(firstIndexToGet) {
		let numItemsToGet = (this.data.length - firstIndexToGet);
		return getTail(numItemsToGet, this.data);
	}


	private __isLastPage(pageNumber): boolean {
		return (pageNumber === this.getTotalPages());
	}


}
