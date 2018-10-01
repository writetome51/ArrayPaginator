import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { OpenArrayContainer } from '@writetome51/open-array-container/OpenArrayContainer';
import { getAdjacentAt } from '@writetome51/array-non-modifying-getters-basic/getAdjacentAt';
import { inRange } from '@writetome51/number-analysis-basic/inRange';
import { getRoundedUp } from '@writetome51/get-rounded-up-down/getRounded_getRoundedDown_getRoundedUp';
import { not } from '@writetome51/not';


export class ArrayPaginator extends OpenArrayContainer {

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


	get itemsPerPage() {
		return this._itemsPerPage;
	}


	// read-only property:

	get totalPages() {
		return getRoundedUp(this.data.length / this.itemsPerPage);
	}


	// the main feature of this class:

	getPage(pageIndex): any[] {
		if (not(inRange([0, this.totalPages - 1], pageIndex))) {
			throw new Error('The requested page does not exist');
		}
		const firstIndexToGet = this._itemsPerPage * pageIndex;
		return getAdjacentAt(firstIndexToGet, this._itemsPerPage, this.data);
	}


}
