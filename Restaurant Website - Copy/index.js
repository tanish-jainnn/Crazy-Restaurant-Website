document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements
    var modal = document.getElementById('menu-modal');
    var modalContent = document.querySelector('.modal-content');
    var modalClose = document.querySelector('.close');
    var prevButton = document.querySelector('.prev');
    var nextButton = document.querySelector('.next');

    // Get dish elements
    var dishes = document.querySelectorAll('.dish');
    var totalDishes = dishes.length;
    var currentDishIndex = 0;

    // Dish details
    var dishDetails = [
        {
            title: "Paneer Tikka",
            image: "paneer-tikka.png",
            price: "₹450",
            description: "A popular Indian appetizer made from marinated paneer cubes grilled to perfection."
        },
        {
            title: "Greek Salad",
            image: "salad (2).png",
            price: "₹600",
            description: "A fresh and healthy salad with cucumbers, tomatoes, olives, and feta cheese."
        },
        {
            title: "Minestrone Soup",
            image: "soup.png",
            price: "₹500",
            description: "A hearty Italian soup with vegetables, beans, and pasta."
        },
        {
            title: "Vegetable Biryani",
            image: "Vegetable Biryani.png",
            price: "₹1200",
            description: "A flavorful rice dish cooked with mixed vegetables and aromatic spices."
        },
        {
            title: "Chana Masala",
            image: "Chana Masala.png",
            price: "₹300",
            description: "A spicy and tangy chickpea curry cooked with Indian spices."
        },
        {
            title: "Garlic Naan",
            image: "Garlic Naan.png",
            price: "₹200",
            description: "Soft and fluffy naan bread flavored with garlic, perfect for accompanying any dish."
        }
    ];

    // Function to open the modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listeners for closing the modal
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Function to display dish details in the modal
    function displayDishDetails(index) {
        var dish = dishDetails[index];
        var dishImage = dish.image;
        var dishTitle = dish.title;
        var dishPrice = dish.price;
        var dishDescription = dish.description;

        // Update modal content with dish details
        document.getElementById('modal-dish-img').src = dishImage;
        document.getElementById('modal-dish-title').textContent = dishTitle;
        document.getElementById('modal-dish-price').textContent = "Price: " + dishPrice;
        document.getElementById('modal-dish-description').textContent = dishDescription;
    }

    // Event listeners for showing dish details and navigating through dishes
    dishes.forEach(function (dish, index) {
        dish.querySelector('.show-details').addEventListener('click', function () {
            openModal();
            displayDishDetails(index);
            currentDishIndex = index;
        });
    });

    // Next and Previous buttons functionality
    nextButton.addEventListener('click', function () {
        currentDishIndex = (currentDishIndex + 1) % totalDishes;
        displayDishDetails(currentDishIndex);
    });

    prevButton.addEventListener('click', function () {
        currentDishIndex = (currentDishIndex - 1 + totalDishes) % totalDishes;
        displayDishDetails(currentDishIndex);
    });

    // Keyboard navigation for modal (optional)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            nextButton.click();
        } else if (event.key === 'ArrowLeft') {
            prevButton.click();
        } else if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Photo gallery functionality
    var galleryImages = [
       "1a00e8b1-4f94-4f81-b363-d8f32b67131a.jpg",
        "download (1).jpg",
        "download.jpg",
        "Mughlai Mushroom Malai.jpg",
        "Indian Food.jpg",
        "Food photography.jpg",
        "download.jpg",
        "bf069635-33bb-4506-a93d-0cfcdde8cd72.jpg",
        "download (1).jpg",
        "Indian Food.jpg"
    ];
    var currentImageIndex = 0;

    function updateGalleryImage(index) {
        var galleryImg = document.getElementById('gallery-img');
        galleryImg.src = galleryImages[index];
    }

    document.querySelector('.prev-img').addEventListener('click', function () {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGalleryImage(currentImageIndex);
    });

    document.querySelector('.next-img').addEventListener('click', function () {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGalleryImage(currentImageIndex);
    });
});
// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// menu-section
document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.service-category');
    const categoryItems = document.querySelectorAll('.service-category-items');

    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryToShow = this.getAttribute('data-category');
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            categoryItems.forEach(item => {
                item.classList.remove('active');
                if (item.classList.contains(categoryToShow)) {
                    item.classList.add('active');
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const addItemBtn = document.getElementById('addItemBtn');
    const orderItemsContainer = document.getElementById('order-items');
    const orderForm = document.getElementById('orderForm');
    const orderMessage = document.getElementById('order-message');

    // Function to dynamically add order items
    function addItem() {
        const newItemHtml = `
            <div class="order-item">
                <input type="text" name="item[]" placeholder="Item Name" required>
                <input type="number" name="quantity[]" placeholder="Quantity" min="1" required>
                <button type="button" class="remove-item">Remove</button>
            </div>
        `;
        orderItemsContainer.insertAdjacentHTML('beforeend', newItemHtml);

        // Attach event listener for remove button
        const removeButtons = orderItemsContainer.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                this.parentElement.remove();
            });
        });
    }

    addItemBtn.addEventListener('click', addItem);

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent actual form submission for demonstration
        sendEmail(); // Trigger the sendEmail function on form submission
    });
});

function sendEmail() {
    // Initialize emailjs
    emailjs.init("eufyW95_MFZW7cwnU"); // Replace with your User ID from email.js dashboard

    // Prepare email parameters
    var templateParams = {
        to_name: "Your Name", // Replace with a default name or leave empty
        from_name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        message_html: getOrderDetails()
    };

    // Send email
    emailjs.send('service_rykrwhc', 'template_vtss9r2', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            displayOrderDetails(getOrderDetails());
            displaySuccessMessage();
            document.getElementById('orderForm').reset();
            document.getElementById('order-items').innerHTML = ''; // Clear order items
        }, function(error) {
            console.error('Email sending failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong and we could not send your order.',
            });
        });
}

// Function to get order details
function getOrderDetails() {
    const orderItems = document.querySelectorAll('.order-item');
    let orderDetails = '';
    orderItems.forEach(item => {
        const itemName = item.querySelector('input[name="item[]"]').value;
        const itemQuantity = item.querySelector('input[name="quantity[]"]').value;
        orderDetails += `${itemName}: ${itemQuantity} pieces\n`;
    });
    return orderDetails;
}

// Function to display order details within the form
function displayOrderDetails(details) {
    const orderItemsContainer = document.getElementById('order-items');
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'order-details';
    detailsDiv.textContent = details;
    orderItemsContainer.appendChild(detailsDiv);
}

// Function to display a success message
function displaySuccessMessage() {
    const orderMessage = document.getElementById('order-message');
    orderMessage.textContent = "Your order has been submitted successfully!";
    orderMessage.style.display = 'block';
    setTimeout(() => {
        orderMessage.style.display = 'none';
    }, 5000); // Hide the message after 5 seconds
}
