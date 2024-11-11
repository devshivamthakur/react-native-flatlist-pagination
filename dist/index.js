var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, ActivityIndicator, Animated } from 'react-native';
var PaginatedFlatList = function (_a) {
    var data = _a.data, _b = _a.isPagination, isPagination = _b === void 0 ? true : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c, _d = _a.currentPage, currentPage = _d === void 0 ? 1 : _d, onPageChange = _a.onPageChange, fetchMoreData = _a.fetchMoreData, _e = _a.isAnimated, isAnimated = _e === void 0 ? false : _e, FlatListProps = __rest(_a, ["data", "isPagination", "perPage", "currentPage", "onPageChange", "fetchMoreData", "isAnimated"]);
    var _f = useState(currentPage), page = _f[0], setPage = _f[1];
    var _g = useState(false), isLoading = _g[0], setIsLoading = _g[1];
    // Memoize the sliced data to avoid recalculating unless data or page changes
    var displayData = useMemo(function () { return data.slice(0, page * perPage); }, [data, page, perPage]);
    var loadMore = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading || page * perPage >= data.length)
                        return [2 /*return*/];
                    setIsLoading(true);
                    if (!fetchMoreData) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchMoreData()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    setIsLoading(false);
                    setPage(function (prevPage) {
                        var newPage = prevPage + 1;
                        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(newPage);
                        return newPage;
                    });
                    return [2 /*return*/];
            }
        });
    }); }, [isLoading, page, perPage, data.length, fetchMoreData, onPageChange]);
    // Memoize the animated render function
    var renderAnimatedItem = useMemo(function () { return function (_a) {
        var item = _a.item, index = _a.index, separators = _a.separators;
        if (!FlatListProps.renderItem)
            return null;
        // Empty functions to satisfy separator requirements
        var separatorsImplementation = {
            highlight: function () { },
            unhighlight: function () { },
            updateProps: function (select, newProps) { },
        };
        var fadeAnim = new Animated.Value(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        return (React.createElement(Animated.View, { style: { opacity: isAnimated ? fadeAnim : 1 } }, FlatListProps.renderItem({ item: item, index: index, separators: separatorsImplementation })));
    }; }, [isAnimated, FlatListProps.renderItem]);
    return (React.createElement(FlatList, __assign({}, FlatListProps, { data: displayData, renderItem: isAnimated ? renderAnimatedItem : FlatListProps.renderItem, onEndReached: isPagination ? loadMore : undefined, onEndReachedThreshold: 0.5, ListFooterComponent: isLoading ? React.createElement(ActivityIndicator, { size: "small", color: "#0000ff" }) : null })));
};
export default PaginatedFlatList;
