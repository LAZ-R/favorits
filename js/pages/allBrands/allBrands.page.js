import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Toutes les marques';

const renderView = () => {
    SERVICE_PWA.setHTMLTitle(pageTitle);

    const brandsList = document.createElement('div');
    brandsList.setAttribute('id', `brandsList`);
    brandsList.setAttribute('class', 'all-brands-list');

    const brands = SERVICE_STORAGE.getBrands();

    const compareBrands = (a, b) => {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }

    brands.sort(compareBrands).forEach(brand => {
      const brandTile = document.createElement('div');
      brandTile.setAttribute('id', `brandTile`);
      brandTile.setAttribute('class', 'brand-tile');

      const brandNameArea = document.createElement('div');
      brandNameArea.setAttribute('id', `brandNameArea`);
      brandNameArea.setAttribute('class', 'brand-tile-name-area');
      brandNameArea.innerHTML = `<span class="brand-tile-name">${brand.name}</span>`;

      brandTile.appendChild(brandNameArea);

      const brandButtonsArea = document.createElement('div');
      brandButtonsArea.setAttribute('id', `brandButtonsArea`);
      brandButtonsArea.setAttribute('class', 'brand-buttons-area');

      const editBrandButton = document.createElement('button');
      editBrandButton.setAttribute('id', `editBrandButton`);
      editBrandButton.setAttribute('class', 'edit-brand-button');
      editBrandButton.innerHTML = `edit`;
      editBrandButton.onclick = () => {
        window.location = `./editBrand.html?isEditing=true&brandId=${brand.id}&brandName=${brand.name}`;
      }
      brandButtonsArea.appendChild(editBrandButton);

      const deleteBrandButton = document.createElement('button');
      deleteBrandButton.setAttribute('id', `deleteBrandButton`);
      deleteBrandButton.setAttribute('class', 'delete-brand-button');
      deleteBrandButton.innerHTML = `delete`;
      deleteBrandButton.onclick = () => {
        if (window.confirm(`Voulez-vous vraiment supprimer la marque "${brand.name}" ?\nCela supprimera également tous les modèles associés à cette marque.\nCette action est irréversible.`)) {
          SERVICE_STORAGE.deleteBrand(brand.id);
          window.location = `./allBrands.html`;
        };
      }
      brandButtonsArea.appendChild(deleteBrandButton);

      brandTile.appendChild(brandButtonsArea);
      brandsList.appendChild(brandTile);
    });


    
    document.getElementById('main').appendChild(brandsList);

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();
