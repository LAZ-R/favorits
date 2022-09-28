import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Toutes les voitures';

const renderView = () => {

    const brandsList = document.createElement('div');
    brandsList.setAttribute('id', `brandsList`);
    brandsList.setAttribute('class', 'brands-list');

    const carsList = SERVICE_STORAGE.getCars();
    const brands = SERVICE_STORAGE.getBrands();

    const ListByBrand = [];

    brands.forEach(brand => {
        const carsFromBrand = [];
        carsList.forEach(car => {
            if (car.brandId == brand.id) {
                carsFromBrand.push(car);
            }
        });
        const brandDAO = {
            id: brand.id,
            brandName : brand.name,
            carsFromBrand: carsFromBrand
        }
        ListByBrand.push(brandDAO);
    });

    const compareBrandNames = (a, b) => {
        if ( a.brandName < b.brandName ){
          return -1;
        }
        if ( a.brandName > b.brandName ){
          return 1;
        }
        return 0;
      }

    ListByBrand.sort(compareBrandNames).forEach(brandDAO => {
        const brandDAOContainer = document.createElement('div');
        brandDAOContainer.setAttribute('id', `brandDAOContainer${brandDAO.id}`);
        brandDAOContainer.setAttribute('class', 'brand-DAO-container');

        const brandNameContainer = document.createElement('div');
        brandNameContainer.setAttribute('id', `brandNameContainer${brandDAO.id}`);
        brandNameContainer.setAttribute('class', 'brand-name-container');
        brandNameContainer.innerHTML = `<span class="brand-name">${brandDAO.brandName}</span>`;
        brandNameContainer.onclick = () => {
            const height = 75 + (brandDAO.carsFromBrand.length * 150);
            brandDAOContainer.style.setProperty('--h', `${height}px`);
            if (brandDAOContainer.classList.contains('open-brand')) {
                brandDAOContainer.classList.remove('open-brand');
                brandDAOContainer.classList.add('close-brand');
            } else {
                const openTiles = document.getElementsByClassName('open-brand');
                if (openTiles != null) {
                    for (let index = 0; index < openTiles.length; index++) {
                        openTiles.item(index).classList.replace('open-brand', 'close-brand');
                    }
                }
                brandDAOContainer.classList.remove('close-brand');
                brandDAOContainer.classList.add('open-brand');
            }
        }

        brandDAOContainer.appendChild(brandNameContainer);

        const compareCarYears = (a, b) => {
            if ( a.year < b.year ){
              return -1;
            }
            if ( a.year > b.year ){
              return 1;
            }
            return 0;
          }

        brandDAO.carsFromBrand.sort(compareCarYears).forEach(car => {
            const carTile = document.createElement('div');
            carTile.setAttribute('id', `carTile${car.id}`);
            carTile.setAttribute('class', 'car-tile');

            const filter = document.createElement('button');
            filter.setAttribute('class', 'black-filter');

            carTile.appendChild(filter);

            carTile.style.backgroundImage = `url(${car.images[0]})`;
            filter.innerHTML = car.model;
            filter.onclick = () => {
                window.location = `./singleCar.html?carId=${car.id}`;
            }

            brandDAOContainer.appendChild(carTile);
        });

        brandsList.appendChild(brandDAOContainer);

        

    });
    const blankBottom = document.createElement('div');
    blankBottom.setAttribute('id', `blankBottom`);
    blankBottom.setAttribute('class', 'blank-bottom');
    brandsList.appendChild(blankBottom);
    
    document.getElementById('main').appendChild(brandsList);

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();