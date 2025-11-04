export function getUserLocation(){
    let userLocation = "";

    while(userLocation.trim() === ""){
        userLocation = prompt("Unesite vaš grad");
    }

    return userLocation;
}

export function getSearchedLocation(){
    let location = document.getElementById("searchLocation").value;

    if(location.trim() === ""){
        alert("Upišite lokaciju");
    }

    return location;
}