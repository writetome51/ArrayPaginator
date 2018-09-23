import { IOpenDataContainer } from 'open-data-container/IOpenDataContainer';
import { SelfIdentifiable } from 'self-identifiable/SelfIdentifiable';
import { ObjectFactory } from '@writetome51/object-factory/ObjectFactory';
import { OpenArrayItemGetter } from '@writetome51/open-array/OpenArrayItemGetter';
import { getRoundedUp } from 'intuitive-number-handlers/get/getRounded_getRoundedDown_getRoundedUp';
import { inRange } from 'intuitive-number-handlers/return_boolean/inRange';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';


export class ArrayPaginator extends SelfIdentifiable implements IOpenDataContainer<any[]> {

	constructor(
		private _itemGetter: OpenArrayItemGetter, // injected dependency

		data = [], // the actual array.
		private _itemsPerPage = 25
	) {
		super();
		this._itemGetter.data = data; // itemGetter checks data type to ensure it's array.
		this.itemsPerPage = this._itemsPerPage;
	}


	// this.data will hold the actual array:

	set data(value) {
		this._itemGetter.data = value;
	}


	get data() {
		return this._itemGetter.data;
	}


	set itemsPerPage(value) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error('The number of items per page must be at least 1');
		this._itemsPerPage = value;
	}

	get itemsPerPage(){
		return this._itemsPerPage;
	}


	// read-only property:

	get totalPages() {
		return getRoundedUp(this.data.length / this.itemsPerPage);
	}


	// the main feature of this class:

	getPage(pageIndex): any[] {
		if (!(inRange([0, this.totalPages - 1], pageIndex))) {
			throw new Error('The requested page does not exist');
		}
		const firstIndexToKeep = this._itemsPerPage * pageIndex;
		return this._itemGetter.adjacentItems(firstIndexToKeep, this._itemsPerPage);
	}


}


ObjectFactory.register(
	{class: ArrayPaginator, dependencies: [OpenArrayItemGetter]}
);
