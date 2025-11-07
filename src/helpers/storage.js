export function updateLocationStorage(value) {
    localStorage.setItem("location", value);
}

export function loadOrSearchedLocation(searchFn) {
    return localStorage.getItem("location") || searchFn();
}
