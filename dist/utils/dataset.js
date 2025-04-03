export function isDatasetTypeMatch(datasetInfo, type) {
    return (('feature_type' in datasetInfo && datasetInfo['feature_type'] === type) ||
        ('dataset_type' in datasetInfo && datasetInfo['dataset_type'] === type));
}
export function truncateClimateDatasetSuffix(input) {
    const match = input.match(/Projection\s*(.+)/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return input;
}
export function truncateClimateDatasetPrefix(input) {
    var _a, _b;
    const match = input.match(/^(.*?\bProjection)/i);
    return (_b = (_a = match === null || match === void 0 ? void 0 : match[1]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : input;
}
