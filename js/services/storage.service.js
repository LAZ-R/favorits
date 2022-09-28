export const STORAGE = localStorage;

export const checkFirstTime = () => {
    let firstTime = STORAGE.getItem('favoritesFirstTime');

    if (firstTime === null) {
        STORAGE.setItem('favoritesFirstTime', '0');
        let user = {
            brands : [],
            cars : []
        };
        STORAGE.setItem('favoritesUser', JSON.stringify(user));
    }
}
/* ------------------------------------------------------------------------- */
export const getUser = () => {
    const user = JSON.parse(STORAGE.getItem('favoritesUser'));
    return user;
}

export const setUser = (newUser) => {
    STORAGE.setItem('favoritesUser', JSON.stringify(newUser));
}
/* ------------------------------------------------------------------------- */
export const getBrands = () => {
    let user = getUser();
    return user.brands;
}
export const getBrandNextId = () => {
    let user = getUser();
    let id = 0;
    user.brands.forEach(brand => {
        if (brand.id > id) {
            id = brand.id;
        }
    });
    return id + 1;
}
export const addBrand = (newBrand) => {
    let user = getUser();
    let tmpArray = [];
    user.brands.forEach(brand => {
        tmpArray.push(brand);
    });
    tmpArray.push(newBrand);
    user.brands = tmpArray;
    setUser(user);
}
export const getBrandNameFromId = (id) => {
    let name = 'unknown';
    getUser().brands.forEach(brand => {
        if (brand.id == id) {
            name = brand.name;
        }
    });
    return name;
}
/* ------------------------------------------------------------------------- */
export const getCars = () => {
    let user = getUser();
    return user.cars;
}
export const getCarNextId = () => {
    let user = getUser();
    let id = 0;
    user.cars.forEach(car => {
        if (car.id > id) {
            id = car.id;
        }
    });
    return id + 1;
}
export const addCar = (newcar) => {
    let user = getUser();
    let tmpArray = [];
    user.cars.forEach(car => {
        tmpArray.push(car);
    });
    tmpArray.push(newcar);
    user.cars = tmpArray;
    setUser(user);
}
export const editCar = (editedCar) => {
    let user = getUser();
    let tmpArray = [];
    user.cars.forEach(car => {
        tmpArray.push(car);
    });
    let indexToModify = 0;
    tmpArray.forEach((car,  index) => {
        if (car.id == editedCar.id) {
            indexToModify = index;
        }
    });
    console.log(`
    tmpArray car to modify : ${tmpArray[indexToModify].model}
    `);
    tmpArray.splice(indexToModify, 1);
    tmpArray.push(editedCar);
    console.log(`
    modified tmpArray car : ${tmpArray[tmpArray.length - 1].model}
    `);
    user.cars = tmpArray;
    setUser(user);
}