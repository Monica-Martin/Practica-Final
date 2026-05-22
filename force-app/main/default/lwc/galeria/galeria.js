import { LightningElement } from 'lwc';

export default class Galeria extends LightningElement {

    selectedImage = '';
    selectedIndex = 0;
    isFading = false;

    images = [
        { id: 1, url: 'https://picsum.photos/id/1015/800/500', title: 'Montaña' },
        { id: 2, url: 'https://picsum.photos/id/1025/800/500', title: 'Perro' },
        { id: 3, url: 'https://picsum.photos/id/1035/800/500', title: 'Naturaleza' },
        { id: 4, url: 'https://picsum.photos/id/1045/800/500', title: 'Ciudad' }
    ];

    get fadeClass() {return this.isFading ? 'fade' : 'no-fade';}

    connectedCallback() {
        this.selectedImage = this.images[0].url;
    }

    selectImage(index) {
        this.triggerFade();

        setTimeout(() => {
            this.selectedIndex = index;
            this.selectedImage = this.images[index].url;
        }, 150);
    }

    handleSelect(event) {
        const id = parseInt(event.currentTarget.dataset.id);
        const index = this.images.findIndex(img => img.id === id);
        this.selectImage(index);
    }

    nextImage() {
        let newIndex = this.selectedIndex + 1;
        if (newIndex >= this.images.length) {
            newIndex = 0;
        }
        this.selectImage(newIndex);
    }

    prevImage() {
        let newIndex = this.selectedIndex - 1;
        if (newIndex < 0) {
            newIndex = this.images.length - 1;
        }
        this.selectImage(newIndex);
    }

    triggerFade() {
        this.isFading = true;
        setTimeout(() => {
            this.isFading = false;
        }, 300);
    }
}