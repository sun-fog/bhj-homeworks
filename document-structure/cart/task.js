// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Находим корзину для товаров
    const cartProductsContainer = document.querySelector('.cart__products');
    // Находим все товары
    const products = document.querySelectorAll('.product');
    // Перебираем все товары и добавляем обработчики событий для каждого товара
    products.forEach(product => {
        // Находим счётчик выбранного товара
        const quantityValue = product.querySelector('.product__quantity-value'); 
        // Находим кнопку уменьшения счётчика
        const decreaseBtn = product.querySelector('.product__quantity-control_dec'); 
        // Находим кнопку увеличения счётчика
        const increaseBtn = product.querySelector('.product__quantity-control_inc'); 
        // Находим кнопку «Добавить в корзину»
        const addToCartBtn = product.querySelector('.product__add'); 

        // Добавляем обработчик кликов на кнопку уменьшения счётчика
        decreaseBtn.addEventListener('click', function() {
            // Преобразуем текущее значение счётчика в число
            let currentValue = parseInt(quantityValue.textContent); 
            // Если количество больше 1, то уменьшаем на 1
            if (currentValue > 1) {                 
                quantityValue.textContent = currentValue - 1; 
            }            
        });

        // Добавляем обработчик кликов на кнопку увеличения счётчика
        increaseBtn.addEventListener('click', function() {
            // Преобразуем текущее значение счётчика в число
            let currentValue = parseInt(quantityValue.textContent); 
            // Увеличиваем количество на 1
            quantityValue.textContent = currentValue + 1; 
        });

        // Добавляем обработчик кликов на кнопку «Добавить в корзину»
        addToCartBtn.addEventListener('click', function() {
            // Находим идентификатор товара
            const productId = product.getAttribute('data-id'); 
            // Находим выбранное количество товара
            const quantity = parseInt(quantityValue.textContent); 
            // Находим ссылку на изображение товара
            const imageSrc = product.querySelector('.product__image').getAttribute('src'); 
            // Находим название товара
            const productTitle = product.querySelector('.product__title').textContent; 
            // Проверяем по идентификатору наличие выбранного товара в корзине
            const existingProduct = cartProductsContainer.querySelector(`.cart__product[data-id="${productId}"]`);
            // Если товар уже есть в корзине, то 
            if (existingProduct) {
                // Находим счётчик товара в корзине
                const countElement = existingProduct.querySelector('.cart__product-count'); 
                // Получаем значение счётчика товара в корзине
                const currentCount = parseInt(countElement.textContent); 
                // Увеличиваем значение счётчика на выбранное количество товара
                countElement.textContent = currentCount + quantity; 
            // Если товара ещё нет в корзине, то 
            } else {       
                // Создаём контейнер для товара в корзине         
                const newProduct = document.createElement('div'); 
                // Назначаем класс 
                newProduct.className = 'cart__product'; 
                // Задаём идентификатор товара
                newProduct.setAttribute('data-id', productId); 
                // Формируем HTML-структуру товара в корзине:
                newProduct.innerHTML = `
                    <img class="cart__product-image" src="${imageSrc}" alt="${productTitle}">
                    <div class="cart__product-count">${quantity}</div>
                `;
                // Добавляем созданный элемент в контейнер корзины
                cartProductsContainer.appendChild(newProduct);
            }
            // После добавления в корзину сбрасываем счётчик выбранного товара до 1
            quantityValue.textContent = '1';
        });
    });
});
