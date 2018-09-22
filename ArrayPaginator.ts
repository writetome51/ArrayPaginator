import { IOpenDataContainer } from './IOpenDataContainer';
import { OpenArrayItemGetter } from './OpenArrayContainer/OpenArrayItemGetter';
import { SelfIdentifiable } from 'self-identifiable/SelfIdentifiable';
import { ObjectFactory } from '@writetome51/object-factory/ObjectFactory';


export class ArrayPaginator extends SelfIdentifiable implements IOpenDataContainer<any[]> {

	constructor(
		private _itemGetter: OpenArrayItemGetter, // injected dependency

		data = [], // the actual array.
		public itemsPerPage = 25
	) {
		super();
		this._itemGetter.data = data; // itemGetter checks data type to ensure it's array.
	}


	// this.data will hold the actual array:
	set data(value) {
		this._itemGetter.data = value;
	}


	// gets the entire array:
	get data() {
		return this._itemGetter.data;
	}


	// the main feature of this class:
	getPage(pageIndex): any[] {
		const firstIndexToKeep = this.itemsPerPage * pageIndex;
		return this._itemGetter.adjacentItems(firstIndexToKeep, this.itemsPerPage);
	}


}


ObjectFactory.register(
	{class: ArrayPaginator, dependencies: [OpenArrayItemGetter]}
);
