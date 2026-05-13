const handlers = new Set();
export function registerMapAccessHandler(fn) {
    handlers.add(fn);
}
export function unregisterMapAccessHandler(fn) {
    handlers.delete(fn);
}
export function provideMapInstanceToHandlers(map) {
    handlers.forEach((fn) => fn(map));
}
//# sourceMappingURL=MapAccessRegistery.js.map