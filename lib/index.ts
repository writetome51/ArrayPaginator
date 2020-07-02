import { errorIfNotInteger } from 'error-if-not-integer';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { getTail } from '@writetome51/array-get-head-tail';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { hasValue } from '@writetome51/has-value-no-value';
import { PublicArrayContainer } from '@writetome51/public-array-container';


export class ArrayPaginator extends PublicArrayContainer {


	private __currentPageNumber: number;
	private __itemsPerPage: number;


	constructor(
		data = [], // the actual array, becoming inherited property this.data
		options: { itemsPerPage: number } = {itemsPerPage: 25}
	) {
		super(data);
		this.__set__itemsPerPage(options.itemsPerPage);
	}


	getPage(
		pageNumber: number, options = {itemsPerPage: undefined}
	): any[] {
		this.__setProperties(pageNumber, options.itemsPerPage);

		const firstIndexToGet = (this.__itemsPerPage * (pageNumber - 1));

		if (this.__isLastPage(pageNumber)) return this.__getRemainingItems(firstIndexToGet);
		else return getAdjacentAt(firstIndexToGet, this.__itemsPerPage, this.data);
	}


	getCurrentPageNumber(): number {
		return this.__currentPageNumber;
	}


	getTotalPages(): number {
		return getRoundedUp(this.data.length / this.__itemsPerPage);
	}


	private __setProperties(__currentPageNumber, __itemsPerPage = undefined) {
		if (hasValue(__itemsPerPage)) this.__set__itemsPerPage(__itemsPerPage);

		this.__errorIfRequestedPageDoesNotExist(__currentPageNumber);
		this.__currentPageNumber = __currentPageNumber;
	}


	private __set__itemsPerPage(value) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error('The number of items per page must be at least 1');

		this.__itemsPerPage = value;
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
