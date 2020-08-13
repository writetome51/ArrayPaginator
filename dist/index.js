import {getPage} from '@writetome51/array-get-page';
import {getRoundedUp} from '@writetome51/get-rounded-up-down';
import {PublicArrayContainer} from '@writetome51/public-array-container';


export class ArrayPaginator extends PublicArrayContainer {

	constructor(
		data = [], // the actual array, becoming inherited property this.data
		__pageConfigurator
	) {
		super(data);
		this.__pageConfigurator = __pageConfigurator;

		if (!(this.__pageConfigurator.setItemsPerPage) || !(this.__pageConfigurator.getItemsPerPage)) {
			throw new Error(
				`__pageConfigurator must have methods setItemsPerPage() and getItemsPerPage()`
			);
		}
	}


	getPage(pageNumber) {
		this.__currentPageNumber = pageNumber;
		let itemsPerPage = this.__pageConfigurator.getItemsPerPage();

		return getPage(pageNumber, itemsPerPage, this.data);
	}


	getCurrentPageNumber() {
		return this.__currentPageNumber;
	}


	getTotalPages() {
		return getRoundedUp(this.data.length / this.__pageConfigurator.getItemsPerPage());
	}

}
