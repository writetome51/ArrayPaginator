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
var SelfIdentifiable_1 = require("self-identifiable/SelfIdentifiable");
var ObjectFactory_1 = require("@writetome51/object-factory/ObjectFactory");
var OpenArrayItemGetter_1 = require("@writetome51/open-array/OpenArrayItemGetter");
var getRounded_getRoundedDown_getRoundedUp_1 = require("intuitive-number-handlers/get/getRounded_getRoundedDown_getRoundedUp");
var inRange_1 = require("intuitive-number-handlers/return_boolean/inRange");
var errorIfNotInteger_1 = require("basic-data-handling/errorIfNotInteger");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(_itemGetter, // injected dependency
    data, // the actual array.
    _itemsPerPage) {
        if (data === void 0) { data = []; }
        if (_itemsPerPage === void 0) { _itemsPerPage = 25; }
        var _this = _super.call(this) || this;
        _this._itemGetter = _itemGetter;
        _this._itemsPerPage = _itemsPerPage;
        _this._itemGetter.data = data; // itemGetter checks data type to ensure it's array.
        _this.itemsPerPage = _this._itemsPerPage; // _itemsPerPage gets validated.
        return _this;
    }
    Object.defineProperty(ArrayPaginator.prototype, "data", {
        get: function () {
            return this._itemGetter.data;
        },
        // this.data will hold the actual array:
        set: function (value) {
            this._itemGetter.data = value;
        },
        enumerable: true,
        configurable: true
    });
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
        // read-only property:
        get: function () {
            return getRounded_getRoundedDown_getRoundedUp_1.getRoundedUp(this.data.length / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    // the main feature of this class:
    ArrayPaginator.prototype.getPage = function (pageIndex) {
        if (!(inRange_1.inRange([0, this.totalPages - 1], pageIndex))) {
            throw new Error('The requested page does not exist');
        }
        var firstIndexToKeep = this._itemsPerPage * pageIndex;
        return this._itemGetter.adjacentItems(firstIndexToKeep, this._itemsPerPage);
    };
    return ArrayPaginator;
}(SelfIdentifiable_1.SelfIdentifiable));
exports.ArrayPaginator = ArrayPaginator;
ObjectFactory_1.ObjectFactory.register({ class: ArrayPaginator, dependencies: [OpenArrayItemGetter_1.OpenArrayItemGetter] });
