document.addEventListener('DOMContentLoaded', () => {
  
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    
    const productData = {
        'skinny': {
            title: 'Skinny Jeans',
            price: '$79.900',
            description: 'Jeans ajustados de alta calidad con elasticidad perfecta para un ajuste cómodo. Diseño moderno y versátil que se adapta a cualquier ocasión.',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['#000000', '#1E40AF', '#374151']
        },
        'mom': {
            title: 'Mom Jeans',
            price: '$89.900',
            description: 'Mom jeans de cintura alta con un ajuste relajado en las piernas. Confeccionados con denim premium para mayor durabilidad y comodidad.',
            image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#1F2937', '#2563EB']
        },
        'boyfriend': {
            title: 'Boyfriend Jeans',
            price: '$99.900',
            description: 'Jeans de corte relajado con un toque masculino. Perfectos para un look casual y cómodo, confeccionados con denim de alta calidad.',
            image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#1F2937', '#4B5563', '#6B7280']
        },
        'vestido-casual': {
            title: 'Vestido Casual',
            price: '$129.900',
            description: 'Vestido casual perfecto para el día a día. Confeccionado con tela ligera y fresca, ideal para cualquier ocasión informal.',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
            sizes: ['XS', 'S', 'M', 'L'],
            colors: ['#DC2626', '#4F46E5', '#000000']
        },
        'vestido-elegante': {
            title: 'Vestido Elegante',
            price: '$159.900',
            description: 'Vestido elegante perfecto para ocasiones especiales. Diseño sofisticado con detalles únicos y tela de primera calidad.',
            image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03',
            sizes: ['XS', 'S', 'M', 'L'],
            colors: ['#000000', '#18181B', '#DC2626']
        },
        'blusa-mc': {
            title: 'Blusa Manga Corta',
            price: '$59.900',
            description: 'Blusa manga corta con diseño moderno y elegante. Perfecta para un look casual o formal, confeccionada con materiales de alta calidad.',
            image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6',
            sizes: ['S', 'M', 'L'],
            colors: ['#FFFFFF', '#F87171', '#000000']
        },
        'crop-top': {
            title: 'Crop Top Moderno',
            price: '$49.900',
            description: 'Crop top moderno y versátil. Perfecto para crear looks juveniles y frescos, ideal para la temporada de calor.',
            image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda',
            sizes: ['XS', 'S', 'M', 'L'],
            colors: ['#FFFFFF', '#F472B6', '#000000']
        },
        'collar': {
            title: 'Collar Elegante',
            price: '$45.900',
            description: 'Collar elegante bañado en oro de 18k. Diseño único que complementará perfectamente cualquier outfit.',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
            sizes: ['Único'],
            colors: ['#D4AF37']
        }
    };

    
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.nav-link-mobile');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
        });
    }

    
    const mobileAccordions = document.querySelectorAll('.mobile-accordion');

    mobileAccordions.forEach(accordion => {
        const button = accordion.querySelector('button');
        const content = accordion.querySelector('div[class*="hidden"]');
        const icon = button.querySelector('svg');

        button.addEventListener('click', () => {
            
            mobileAccordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion) {
                    const otherContent = otherAccordion.querySelector('div[class*="hidden"]');
                    const otherIcon = otherAccordion.querySelector('svg');
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });

          
            content.classList.toggle('hidden');
            icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    
    const categoryButtons = document.querySelectorAll('[data-category]');
    const subcategoryLinks = document.querySelectorAll('[data-subcategory]');
    const productCards = document.querySelectorAll('.product-card');
    let currentCategory = 'todos';
    let currentSubcategory = null;

   
    function filterProducts(category, subcategory = null) {
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardSubcategory = card.dataset.subcategory;
            
            const matchesCategory = category === 'todos' || cardCategory === category;
            const matchesSubcategory = !subcategory || cardSubcategory === subcategory;

            if (matchesCategory && matchesSubcategory) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });

        
        categoryButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        currentCategory = category;
        currentSubcategory = subcategory;
    }

    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterProducts(category);
        });
    });

    
    subcategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.closest('.group').querySelector('button').dataset.category;
            const subcategory = link.dataset.subcategory;
            filterProducts(category, subcategory);

            
            document.querySelector('#productos').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalSizes = document.getElementById('modalSizes');
    const modalColors = document.getElementById('modalColors');

   
    document.querySelectorAll('.product-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = productData[btn.dataset.product];
            if (product) {
                modalImage.src = product.image;
                modalImage.alt = product.title;
                modalTitle.textContent = product.title;
                modalPrice.textContent = product.price;
                modalDescription.textContent = product.description;

                
                modalSizes.innerHTML = product.sizes.map(size => `
                    <button class="w-10 h-10 border border-gray-300 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-colors">
                        ${size}
                    </button>
                `).join('');

              
                modalColors.innerHTML = product.colors.map(color => `
                    <button class="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                            style="background-color: ${color}">
                    </button>
                `).join('');

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    
    document.querySelectorAll('.coleccion-item button').forEach(btn => {
        btn.addEventListener('click', () => {
            
            const productTitle = btn.closest('.coleccion-item').querySelector('h3').textContent;
            let productKey = null;
            
            
            for (const key in productData) {
                if (productData[key].title === productTitle) {
                    productKey = key;
                    break;
                }
            }

            if (productKey && productData[productKey]) {
                const product = productData[productKey];
                
                modalImage.src = product.image;
                modalImage.alt = product.title;
                modalTitle.textContent = product.title;
                modalPrice.textContent = product.price;
                modalDescription.textContent = product.description;

                
                modalSizes.innerHTML = product.sizes.map(size => `
                    <button class="w-10 h-10 border border-gray-300 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-colors">
                        ${size}
                    </button>
                `).join('');

               
                modalColors.innerHTML = product.colors.map(color => `
                    <button class="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                            style="background-color: ${color}">
                    </button>
                `).join('');

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

   
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && menuBtn) {
                mobileMenu.classList.add('hidden');
                menuBtn.classList.remove('active');
                
               
                mobileAccordions.forEach(accordion => {
                    const content = accordion.querySelector('div[class*="hidden"]');
                    const icon = accordion.querySelector('svg');
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                });
            }
        });
    });

    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            if (mobileMenu && menuBtn) {
                mobileMenu.classList.add('hidden');
                menuBtn.classList.remove('active');
                
               
                mobileAccordions.forEach(accordion => {
                    const content = accordion.querySelector('div[class*="hidden"]');
                    const icon = accordion.querySelector('svg');
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                });
            }
        }
        lastScroll = currentScroll;
    });
});
