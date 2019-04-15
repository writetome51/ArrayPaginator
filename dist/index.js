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
var public_array_container_1 = require("@writetome51/public-array-container");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(data, // the actual array, represented by inherited property this.data
    __itemsPerPage) {
        if (data === void 0) { data = []; }
        if (__itemsPerPage === void 0) { __itemsPerPage = 25; }
        var _this = _super.call(this, data) || this;
        _this.__itemsPerPage = __itemsPerPage;
        _this.itemsPerPage = _this.__itemsPerPage; // __itemsPerPage gets validated.
        return _this;
    }
    Object.defineProperty(ArrayPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__itemsPerPage;
        },
        set: function (value) {
            error_if_not_integer_1.errorIfNotInteger(value);
            if (value < 1)
                throw new Error('The number of items per page must be at least 1');
            this.__itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayPaginator.prototype, "totalPages", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.data.length / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this._currentPageNumber;
        },
        enumerable: true,
        configurable: true
    });
    // the main feature of this class:
    ArrayPaginator.prototype.getPage = function (pageIndex) {
        this.__errorIfRequestedPageDoesNotExist(pageIndex);
        this._currentPageNumber = (pageIndex + 1);
        var firstIndexToGet = this.itemsPerPage * pageIndex;
        if (this.__isLastPage(pageIndex)) {
            // ...only return the remaining items in array, not this.itemsPerPage:
            return array_get_head_tail_1.getTail((this.data.length - firstIndexToGet), this.data);
        }
        else
            return array_get_adjacent_at_1.getAdjacentAt(firstIndexToGet, this.itemsPerPage, this.data);
    };
    ArrayPaginator.prototype.__errorIfRequestedPageDoesNotExist = function (pageIndex) {
        var totalPages = this.totalPages; // So it only calls getter function once.
        if (totalPages === 0 || not_1.not(in_range_1.inRange([0, totalPages - 1], pageIndex))) {
            throw new Error('The requested page does not exist');
        }
    };
    ArrayPaginator.prototype.__isLastPage = function (pageIndex) {
        return (pageIndex === (this.totalPages - 1));
    };
    return ArrayPaginator;
}(public_array_container_1.PublicArrayContainer));
exports.ArrayPaginator = ArrayPaginator;
