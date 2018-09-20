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
var BaseObject_1 = require("../../BaseObject");
var OpenArrayItemGetter_1 = require("./OpenArrayContainer/OpenArrayItemGetter");
var ObjectFactory_1 = require("../../ObjectFactory/ObjectFactory");
var ArrayPaginator = /** @class */ (function (_super) {
    __extends(ArrayPaginator, _super);
    function ArrayPaginator(_itemGetter, // injected dependency
    data, // the actual array.
    itemsPerPage) {
        if (data === void 0) { data = []; }
        if (itemsPerPage === void 0) { itemsPerPage = 25; }
        var _this = _super.call(this) || this;
        _this._itemGetter = _itemGetter;
        _this.itemsPerPage = itemsPerPage;
        _this._itemGetter.data = data; // itemGetter checks data type to ensure it's array.
        return _this;
    }
    Object.defineProperty(ArrayPaginator.prototype, "data", {
        // gets the entire array:
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
    // the main feature of this class:
    ArrayPaginator.prototype.getPage = function (pageIndex) {
        var firstIndexToKeep = this.itemsPerPage * pageIndex;
        return this._itemGetter.adjacentItems(firstIndexToKeep, this.itemsPerPage);
    };
    return ArrayPaginator;
}(BaseObject_1.SelfIdentifiable));
exports.ArrayPaginator = ArrayPaginator;
ObjectFactory_1.ObjectFactory.register({ class: ArrayPaginator, dependencies: [OpenArrayItemGetter_1.OpenArrayItemGetter] });
