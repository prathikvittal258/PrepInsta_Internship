function convertMetersToFeet() {
    const meters = parseFloat(document.getElementById('metersInput').value);
    const feet = meters * 3.281;
    document.getElementById('metersResult').textContent = `${meters} meters is equal to ${feet.toFixed(2)} feet.`;
}

function convertFeetToMeters() {
    const feet = parseFloat(document.getElementById('feetInput').value);
    const meters = feet * 0.3048;
    document.getElementById('feetResult').textContent = `${feet} feet is equal to ${meters.toFixed(2)} meters.`;
}
