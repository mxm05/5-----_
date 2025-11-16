// import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap justify-content-center align-items-center min-vh-100">
                </div>
            `
        )
    }
        
    // getData() {
    //     return [
    //         {
    //             id: 1,
    //             src: "https://www.purina.ru/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0111_german_shepherd.webp?itok=NHIE8Ac5",
    //             title: "Немецкая овчарка",
    //             text: "Пастушья порода"
    //         },
    //         {
    //             id: 2,
    //             src: "https://www.purina.ru/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0113_french_bulldog.webp?itok=IGCju2Mf",
    //             title: "Французский бульдог",
    //             text: "Компанейская порода"
    //         },
    //         {
    //             id: 3,
    //             src: "https://www.purina.ru/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0051_pomeranian.webp?itok=wOb8NUdV",
    //             title: "Померанский шпиц",
    //             text: "Декоративная порода"
    //         },
    //     ]
    // }
    
    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const title = e.target.dataset.title
        const productPage = new ProductPage(this.parent, cardId, title)
        productPage.render()
    } 

    // render() {
    //     this.parent.innerHTML = ''
    //     const html = this.getHTML()
    //     this.parent.insertAdjacentHTML('beforeend', html)
        
    //     const data = this.getData()
    //     data.forEach((item) => {
    //         const productCard = new ProductCardComponent(this.pageRoot)
    //         productCard.render(item, this.clickCard.bind(this))
    //     })
    // }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()
    }
}
