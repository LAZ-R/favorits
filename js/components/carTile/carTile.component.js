import * as SERVICE_STORAGE from '../../services/storage.service.js';

/**
 * 
 * @param {Object} car 
 * @param {boolean} showBrand 
 * @param {boolean} showModel 
 * @param {boolean} showYear 
 * @param {boolean} isLoopingPictures 
 * @param {int} interval 
 * @returns 
 */
export const renderView = (car, showBrand, showModel, showYear, isLoopingPictures, interval) => {
    const tile = document.createElement('div');
    tile.setAttribute('class', 'car-tile');

    const tileCarsInfos = document.createElement('div');
    tileCarsInfos.setAttribute('id', 'tileCarsInfos');
    tileCarsInfos.setAttribute('class', 'car-tile-cars-infos')
    tileCarsInfos.innerHTML = `
            ${showBrand ? `<span>${SERVICE_STORAGE.getBrandNameFromId(car.brandId)}</span>` : ``}
            ${showModel ? `<span>${car.model}</span>` : ``}
            ${showYear ? `<span class="year-display"><i>(${car.year})</i></span>` : ``}
    `;
    tile.appendChild(tileCarsInfos);

    tile.style.backgroundImage = `url(${car.images[0]})`;
    tile.onclick = () => window.location = `./singleCar.html?carId=${car.id}`;

    if (car.images.length > 1 && isLoopingPictures) {
        let index = 0;
        const changeImage = () => {
            index += 1;
            if (index == car.images.length) {
                index = 0;
            }
            tileCarsInfos.style.backgroundColor = '#000000ff';
            setTimeout(() => {
                tile.style.backgroundImage = `url(${car.images[index]})`;
                tileCarsInfos.style.backgroundColor = '#000000d0';
                setTimeout(() => {
                    changeImage();
                }, interval);
            }, 400);
        }
        setTimeout(() => {
            changeImage();
        }, interval);
    }
    return tile;
}