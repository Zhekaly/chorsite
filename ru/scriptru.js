// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Плавная прокрутка для навигации
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Функциональность алфавитного указателя
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            const clickedLetter = this.textContent.trim();
            // Показываем только уведомление
            showNotification('Система фильтрации еще не подключена');
        });

        // Подсветка только при наведении
        letter.addEventListener('mouseenter', function() {
            this.style.color = '#ffcc00';
            this.style.transform = 'scale(1.2)';
            this.style.textShadow = '0 0 10px #ffcc00';
        });

        letter.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    });


    // Функция фильтрации контента по букве
    function filterContentByLetter(letter) {
        // Пример фильтрации - можно расширить в зависимости от структуры данных
        console.log(`Фильтрация по букве: ${letter}`);
        
        // Здесь можно добавить логику поиска элементов, начинающихся с выбранной буквы
        const allContent = document.querySelectorAll('main h3, main li');
        allContent.forEach(item => {
            const text = item.textContent.trim();
            if (text.charAt(0).toLowerCase() === letter.toLowerCase()) {
                item.style.backgroundColor = '#fffacd';
                item.style.transition = 'background-color 0.3s ease';
                
                // Убираем выделение через 2 секунды
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Функция показа уведомлений
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a1a1a;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Удаление через 3 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Анимация при прокрутке
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
    });
    animatedElements.forEach(el => observer.observe(el));

    // Анимация для изображений при прокрутке
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.9)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100);
                
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Добавляем интерактивность к изображениям
    images.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this);
        });
        
        // Добавляем эффект при наведении
        img.style.cursor = 'pointer';
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Модальное окно для изображений
    function openImageModal(img) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-modal">&times;</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const modalOverlay = modal.querySelector('.modal-overlay');
        modalOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        `;
        
        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
        `;
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Закрытие модального окна
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Закрытие по ESC
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }


    // Добавляем кнопку "Вверх"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1a1a1a;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateY(100px);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Показываем/скрываем кнопку в зависимости от прокрутки
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(100px)';
        }
    });

    // Добавляем CSS стили для активной буквы
    const style = document.createElement('style');
    style.textContent = `        
        .back-to-top:hover {
            background: #ffcc00;
            color: #1a1a1a;
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);

    console.log('Сайт хореографии Казахстана загружен успешно!');
});
