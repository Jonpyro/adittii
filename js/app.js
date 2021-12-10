class Feature {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0,
        }
        this.inventory = {
            item1: {
                id: 1,
                img: 'media/bag.png',
                alt: 'Bag',
                class: 'feature-item',
                price: 45.00,
                qty: 0,
                name: 'Bag',
                itemCode: '559H12'
            },
            item2: {
                id: 2,
                img: 'media/shoe.png',
                alt: 'Shoe',
                class: 'feature-item',
                price: 65.00,
                qty: 0,
                name: 'Shoes',
                itemCode: '559C13',
            },
            item3: {
                id: 3,
                img: 'media/socks.png',
                alt: 'Socks',
                class: 'feature-item',
                price: 15.00,
                qty: 0,
                name: 'Socks',
                itemCode: '000P34'
            },
            item4: {
                id: 4,
                img: 'media/sweat-pants.png',
                alt: 'Sweat Pants',
                class: 'feature-item',
                price: 25.00,
                qty: 0,
                name: 'Sweat Pants',
                itemCode: '889P03',
            },
            item5: {
                id: 5,
                img: 'media/shirt.png',
                alt: 'Shirt',
                class: 'feature-item',
                price: 60.00,
                qty: 0,
                name: 'Shirt',
                itemCode: '991I98'
            },
            item6: {
                id: 6,
                img: 'media/wallet.png',
                alt: 'Wallet',
                class: 'feature-item',
                price: 30.00,
                qty: 0,
                name: 'Wallet',
                itemCode: '765O00'
            }
        }
    }
    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
    }
    loadItems() {
        let count = 0;
        let products1 = document.getElementById('products1')
        let products2 = document.getElementById('products2')
        for (const key in this.inventory) {
            const item = this.inventory[key];
            const product = document.createElement('div')
            product.className = 'col-md-3 product';
            product.innerHTML = `
                <img src="${item.img}" alt="${item.alt}" class="${item.class}">
                    <h3 class="items">${item.name}</h3>
                    <p class="cost">$${item.price.toFixed(2)}</p>
                    <button class="btn btn-secondary add-button" data-id="${item.id}">Add to Cart</button>`;

            if (count < 3) {
                products1.append(product);
            } else {
                products2.append(product);
            }
            count++;
        }
    }
    addToCart(){
        let button = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartSubTotal');
        let itemCount = 0;
        let price = 0;
        for (const key in this.inventory){
            const item = this.inventory[key];
            button.forEach(button => {
                button.addEventListener('click', ()=>{
                    if(button.dataset['id'] == item.id){
                        itemCount++;
                        price += item.price;

                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subTotal = price;

                        item.qty++;
                    }
                    cartItems.innerText = itemCount;
                    cartSubTotal.innerText = price.toFixed(2);
                })
            })
        }
    }
    checkout(){
        let table = document.getElementById('tbody');
        let checkout = document.getElementById('cartBtn');
        let checkoutPage = document.querySelector('.checkout-page');
        let storePage = document.querySelector('.store-page');
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue');
        let shipping = 6.50;
        
        checkout.addEventListener('click', ()=> {
            console.log('click');
            checkoutPage.classList.remove('d-none');
            storePage.classList.add('d-none');
            
            for(const key in this.inventory){
                const item = this.inventory[key];
                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subTotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2);

                if(item.qty > 0){
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';
                    tableRow.innerHTML = `<td id="checkoutImg">
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img"> 
                    <div class="product-desc">
                        <p class="item-name">${item.name}</p>
                    </div>
                </td>
                <td id="productCode">${item.itemCode}</td>
                <td>
                    <p class="unit-price">${item.price.toFixed(2)}</p>
                </td>
                <td>
                    <div id="itemQuantity">
                        <p id="qtyInput">${item.qty}</p>
                    </div>
                </td>
                <td>
                    <div id="itemSubtotal">
                        <p>${subTimesQty}</p>
                    </div>
                </td>`
                table.append(tableRow);
                console.log(item.qty)
                }
            }
        })
    }

}
// dont forget to make css perfect



let activate = new Feature;

activate.init();