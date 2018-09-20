import { IOpenDataContainer } from './IOpenDataContainer';
import { SelfIdentifiable } from '../../BaseObject';
import { OpenArrayItemGetter } from './OpenArrayContainer/OpenArrayItemGetter';
import { ObjectFactory } from '../../ObjectFactory/ObjectFactory';


export class ArrayPaginator extends SelfIdentifiable implements IOpenDataContainer<any[]> {

	constructor(
		private _itemGetter: OpenArrayItemGetter, // injected dependency

		data = [],
		public itemsPerPage = 25
	) {
		super();
		this._itemGetter.data = data; // itemGetter checks data type to ensure it's array.
	}


	set data(value) {
		this._itemGetter.data = value;
	}


	get data() {
		return this._itemGetter.data;
	}


	getPage(pageIndex): any[] {
		const firstIndexToKeep = this.itemsPerPage * pageIndex;
		return this._itemGetter.adjacentItems(firstIndexToKeep, this.itemsPerPage);
	}


}


ObjectFactory.register(
	{class: ArrayPaginator, dependencies: [OpenArrayItemGetter]}
);
