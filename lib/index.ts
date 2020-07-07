import { getPage } from '@writetome51/array-get-page';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { PublicArrayContainer } from '@writetome51/public-array-container';


export class ArrayPaginator extends PublicArrayContainer {

	private __currentPageNumber: number;


	constructor(
		data = [], // the actual array, becoming inherited property this.data

		private __pageConfigurator: {
			setItemsPerPage: (num) => void;
			getItemsPerPage: () => number;
		}
	) {
		super(data);

		if (!(this.__pageConfigurator.setItemsPerPage) || !(this.__pageConfigurator.getItemsPerPage)) {
			throw new Error(
				`__pageConfigurator must have methods setItemsPerPage() and getItemsPerPage()`
			);
		}
	}


	getPage(pageNumber): any[] {
		this.__currentPageNumber = pageNumber;
		let itemsPerPage = this.__pageConfigurator.getItemsPerPage();

		return getPage(pageNumber, itemsPerPage, this.data);
	}


	getCurrentPageNumber(): number {
		return this.__currentPageNumber;
	}


	getTotalPages(): number {
		return getRoundedUp(this.data.length / this.__pageConfigurator.getItemsPerPage());
	}

}
