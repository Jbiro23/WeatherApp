export function setupMyLocationButton(buttonId, getGeolocationForCoords, updateLocationStorage) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener("click", async () => {
        if (!navigator.geolocation) {
            alert("Vaš browser ne podržava geolokaciju");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            const coords = await getGeolocationForCoords(lat, lng);
            let city = coords.data?.[0]?.name || "";

            if (city.includes("Municipality")) city = city.replace("Municipality", "");
            updateLocationStorage(city.trim());
            window.location.reload();
        });
    });
}
