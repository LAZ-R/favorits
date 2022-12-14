import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'
import * as COMPONENT_CAR_TILE from '../../components/carTile/carTile.component.js'

const pageTitle = 'Toutes les voitures';

const renderView = () => {
    SERVICE_PWA.setHTMLTitle(pageTitle);

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

    ListByBrand.sort(compareBrandNames).forEach((brandDAO, index) => {
        const brandDAOContainer = document.createElement('div');
        brandDAOContainer.setAttribute('id', `brandDAOContainer${brandDAO.id}`);
        brandDAOContainer.setAttribute('class', 'brand-DAO-container');

        const brandNameContainer = document.createElement('div');
        brandNameContainer.setAttribute('id', `brandNameContainer${brandDAO.id}`);
        brandNameContainer.setAttribute('class', 'brand-name-container');
        brandNameContainer.innerHTML = `<span class="brand-name">${brandDAO.brandName}</span>`;
        brandNameContainer.onclick = () => {
            const height = 75 + (brandDAO.carsFromBrand.length * 175);
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
                brandsList.scrollTo({
                    top: index * 75,
                    left: 0,
                    behavior: 'smooth'
                  });
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
            const carTileContainer = document.createElement('div');
            carTileContainer.setAttribute('class', 'car-tile-container');
            const catTile = COMPONENT_CAR_TILE.renderView(car, false, true, true, false, 5000);
            carTileContainer.appendChild(catTile);
            brandDAOContainer.appendChild(carTileContainer);
        });

        brandsList.appendChild(brandDAOContainer);

        

    });
    /* const blankBottom = document.createElement('div');
    blankBottom.setAttribute('id', `blankBottom`);
    blankBottom.setAttribute('class', 'blank-bottom');
    brandsList.appendChild(blankBottom); */
    
    document.getElementById('main').appendChild(brandsList);

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();