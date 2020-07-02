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
var error_if_not_integer_1 = require("error-if-not-integer");
var array_get_adjacent_at_1 = require("@writetome51/array-get-adjacent-at");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var array_get_head_tail_1 = require("@writetome51/array-get-head-tail");
var in_range_1 = require("@writetome51/in-range");
var not_1 = require("@writetome51/not");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var public_array_container_1 = require("@writetome51/public-array-container");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(data, // the actual array, becoming inherited property this.data
    options) {
        if (data === void 0) { data = []; }
        if (options === void 0) { options = { itemsPerPage: 25 }; }
        var _this = _super.call(this, data) || this;
        _this.__set__itemsPerPage(options.itemsPerPage);
        return _this;
    }
    ArrayPaginator.prototype.getPage = function (pageNumber, options) {
        if (options === void 0) { options = { itemsPerPage: undefined }; }
        this.__setProperties(pageNumber, options.itemsPerPage);
        var firstIndexToGet = (this.__itemsPerPage * (pageNumber - 1));
        if (this.__isLastPage(pageNumber))
            return this.__getRemainingItems(firstIndexToGet);
        else
            return array_get_adjacent_at_1.getAdjacentAt(firstIndexToGet, this.__itemsPerPage, this.data);
    };
    ArrayPaginator.prototype.getCurrentPageNumber = function () {
        return this.__currentPageNumber;
    };
    ArrayPaginator.prototype.getTotalPages = function () {
        return get_rounded_up_down_1.getRoundedUp(this.data.length / this.__itemsPerPage);
    };
    ArrayPaginator.prototype.__setProperties = function (__currentPageNumber, __itemsPerPage) {
        if (__itemsPerPage === void 0) { __itemsPerPage = undefined; }
        if (has_value_no_value_1.hasValue(__itemsPerPage))
            this.__set__itemsPerPage(__itemsPerPage);
        this.__errorIfRequestedPageDoesNotExist(__currentPageNumber);
        this.__currentPageNumber = __currentPageNumber;
    };
    ArrayPaginator.prototype.__set__itemsPerPage = function (value) {
        error_if_not_integer_1.errorIfNotInteger(value);
        if (value < 1)
            throw new Error('The number of items per page must be at least 1');
        this.__itemsPerPage = value;
    };
    ArrayPaginator.prototype.__errorIfRequestedPageDoesNotExist = function (pageNumber) {
        var totalPages = this.getTotalPages();
        if (totalPages === 0 || not_1.not(in_range_1.inRange([1, totalPages], pageNumber))) {
            throw new Error('The requested page does not exist');
        }
    };
    ArrayPaginator.prototype.__getRemainingItems = function (firstIndexToGet) {
        var numItemsToGet = (this.data.length - firstIndexToGet);
        return array_get_head_tail_1.getTail(numItemsToGet, this.data);
    };
    ArrayPaginator.prototype.__isLastPage = function (pageNumber) {
        return (pageNumber === this.getTotalPages());
    };
    return ArrayPaginator;
}(public_array_container_1.PublicArrayContainer));
exports.ArrayPaginator = ArrayPaginator;
