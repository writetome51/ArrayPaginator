"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var array_get_page_1 = require("@writetome51/array-get-page");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var public_array_container_1 = require("@writetome51/public-array-container");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(data, // the actual array, becoming inherited property this.data
    __pageConfigurator) {
        if (data === void 0) { data = []; }
        var _this = _super.call(this, data) || this;
        _this.__pageConfigurator = __pageConfigurator;
        if (!(_this.__pageConfigurator.setItemsPerPage) || !(_this.__pageConfigurator.getItemsPerPage)) {
            throw new Error("__pageConfigurator must have methods setItemsPerPage() and getItemsPerPage()");
        }
        return _this;
    }
    ArrayPaginator.prototype.getPage = function (pageNumber) {
        this.__currentPageNumber = pageNumber;
        var itemsPerPage = this.__pageConfigurator.getItemsPerPage();
        return array_get_page_1.getPage(pageNumber, itemsPerPage, this.data);
    };
    ArrayPaginator.prototype.getCurrentPageNumber = function () {
        return this.__currentPageNumber;
    };
    ArrayPaginator.prototype.getTotalPages = function () {
        return get_rounded_up_down_1.getRoundedUp(this.data.length / this.__pageConfigurator.getItemsPerPage());
    };
    return ArrayPaginator;
}(public_array_container_1.PublicArrayContainer));
exports.ArrayPaginator = ArrayPaginator;
