"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var public_array_container_1 = require("@writetome51/public-array-container");
var errorIfNotInteger_1 = require("basic-data-handling/errorIfNotInteger");
var array_get_adjacent_at_1 = require("@writetome51/array-get-adjacent-at");
var getTail_1 = require("@writetome51/array-get-head-tail/getTail");
var in_range_1 = require("@writetome51/in-range");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var not_1 = require("@writetome51/not");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(data, // the actual array, represented by inherited property this.data
    _itemsPerPage) {
        if (data === void 0) { data = []; }
        if (_itemsPerPage === void 0) { _itemsPerPage = 25; }
        var _this = _super.call(this, data) || this;
        _this._itemsPerPage = _itemsPerPage;
        _this.itemsPerPage = _this._itemsPerPage; // _itemsPerPage gets validated.
        return _this;
    }
    Object.defineProperty(ArrayPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (value) {
            errorIfNotInteger_1.errorIfNotInteger(value);
            if (value < 1)
                throw new Error('The number of items per page must be at least 1');
            this._itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayPaginator.prototype, "totalPages", {
        // read-only:
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.data.length / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    // the main feature of this class:
    ArrayPaginator.prototype.getPage = function (pageIndex) {
        var totalPages = this.totalPages;
        if (totalPages === 0 || not_1.not(in_range_1.inRange([0, totalPages - 1], pageIndex))) {
            throw new Error('The requested page does not exist');
        }
        var firstIndexToGet = this._itemsPerPage * pageIndex;
        if (this.__isLastPage(pageIndex)) {
            // ...only return the remaining items in array, not this.itemsPerPage:
            return getTail_1.getTail((this.data.length - firstIndexToGet), this.data);
        }
        else
            return array_get_adjacent_at_1.getAdjacentAt(firstIndexToGet, this._itemsPerPage, this.data);
    };
    ArrayPaginator.prototype.__isLastPage = function (pageIndex) {
        return (pageIndex === (this.totalPages - 1));
    };
    return ArrayPaginator;
}(public_array_container_1.PublicArrayContainer));
exports.ArrayPaginator = ArrayPaginator;
