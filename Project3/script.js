const tumbnail = document.querySelectorAll(".box");
const bag = document.querySelector(".bag");
const coverImage = document.querySelector("#cover-img");
const boxImage = document.querySelectorAll(".box");
const heart = document.querySelector("#heart");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const count = document.querySelector("#count");
const product_name = document.querySelector("#product-name").textContent;
const size = document.querySelectorAll(".size");
const colour = document.querySelectorAll(".color");
const price = document.querySelector("#product-price");
const AddtoCart = document.querySelector("#cart-button");
var CartCount = document.querySelector("#cart-count");
const cart_container = document.querySelector(".cart-container");
const cartMenu = document.querySelector(".cart-menu");
const total = document.querySelector("#total");
const wishlist = JSON.parse(localStorage.getItem("wishlist"));
const items = document.querySelectorAll(".item");

var Product = localStorage.getItem("product");
var cart_product;
if (Product && Product.length != 0) {
  cart_product = JSON.parse(Product);
} else {
  cart_product = [];
}


//close cart menu when click on outside of the div
window.addEventListener("click", (e) => {
  const trash = document.querySelector("#trash");

  if (
    !cartMenu.contains(e.target) &&
    !bag.contains(e.target) &&
    e.target != trash
  ) {
    cartMenu.classList.remove("class", "cart-menu-active");
  }
});

// check is product is already in wishlist
if (wishlist != null && wishlist.find((name) => name === `${product_name}`)) {
  heart.classList.replace("fa-regular", "fa-solid");
}else{
  heart.classList.replace('fa-solid','fa-regular')
}
//Fetching all products
window.onload = () => {
  FetchProduct();
};

// Check if product is already in cart
if (
  cart_product != null &&
  cart_product.find((cart) => cart.name === `${product_name}`)
) {
  AddtoCart.setAttribute("disabled", "true");
  AddtoCart.textContent = "Added to cart";
} else {
  AddtoCart.removeAttribute("disabled");
  AddtoCart.textContent = "Add to cart";
}

// Setting cart  count
cart_product != null
  ? (CartCount.textContent = cart_product.length)
  : (CartCount.textContent = 0);

//Thumbnail click event
tumbnail.forEach((box) => {
  box.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let imgurl = e.target.src;
    boxImage.forEach((ele) => {
      ele.classList.contains("active") &&
        ele.classList.remove("class", "active");
    });
    parent.classList.add("active");
    coverImage.removeAttribute("src");
    coverImage.setAttribute("src", `${imgurl}`);
  });
});

// recent view product click event

items.forEach((i) => {
  i.addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    const title = parent.children[1].children[0].textContent;
    const Price = parent.children[1].children[1].textContent;
    const imgUrl = e.target.src;
    coverImage.src = `${imgUrl}`;
    document.querySelector("#product-name").textContent = title;
    price.textContent = Price;
    boxImage.forEach((b) => {
      b.children[0].src = `${imgUrl}`;
    });

    if (
      cart_product != null &&
      cart_product.find((cart) => cart.name === `${title}`)
    ) {
      AddtoCart.setAttribute("disabled", "true");
      AddtoCart.textContent = "Added to cart";
    } else {
      AddtoCart.removeAttribute("disabled");
      AddtoCart.textContent = "Add to cart";
    }
    // check is product is already in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (
      wishlist != null &&
      wishlist.find((name) => name === document.querySelector('#product-name').textContent)
    ) {
      heart.classList.replace("fa-regular", "fa-solid");
    }else{
      heart.classList.replace('fa-solid','fa-regular')
    }
  });
});

// wishlist button click event
heart.addEventListener("click", (e) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist"));
  let product = e.target.parentElement.children[0].textContent;

  if (heart.classList.contains("fa-solid")) {
    heart.classList.replace("fa-solid", "fa-regular");
    localStorage.removeItem("wishlist", `${product}`);
  } else if (heart.classList.contains("fa-regular")) {
    heart.classList.replace("fa-regular", "fa-solid");
    wishlist.push(`${product}`);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
});

//item count handle event

// increment event
let itemCount = 1;

plus.addEventListener("click", () => {
  itemCount++;
  count.value = itemCount;
});
//decrement event
minus.addEventListener("click", () => {
  if (itemCount >= 2) {
    itemCount--;
    count.value = itemCount;
  }
});

// select size event handle
var selectedSize;

size.forEach((ele) => {
  ele.addEventListener("click", () => {
    size.forEach((box) => {
      if (box.classList.contains("active")) selectedSize = box;
    });
    selectedSize.classList.remove("class", "active");
    ele.classList.contains("active")
      ? ele.classList.remove("class", "active")
      : ele.classList.add("active");
  });
});

//select color event handle
var selectedColor;
colour.forEach((c) => {
  c.addEventListener("click", (e) => {
    colour.forEach((color) => {
      if (color.classList.contains("active")) selectedColor = color;
    });
    var Style = getComputedStyle(c);
    selectedColor.classList.remove("class", "active");
    selectedColor.style.boxShadow = null;

    if (c.classList.contains("active")) {
      c.classList.remove("class", "active");
    } else {
      c.classList.add("active");
      c.style.boxShadow = `0 0 15px 3px ${Style.backgroundColor}`;
    }
  });
});

//Add to cart event handle
AddtoCart.addEventListener("click", () => {
  let ItemCount = count.value;
  let ItemSize;
  let ItemColor;
  let ItemSyle;

  const newProduct = {
    id: Math.floor(Math.random() * 10) + 1,
    name: "",
    img: "",
    size: null,
    color: "",
    price: null,
    count: null,
  };

  size.forEach((s) => {
    if (s.classList.contains("active")) {
      ItemSize = s.textContent;
    }
  });
  colour.forEach((c) => {
    if (c.classList.contains("active")) {
      ItemSyle = getComputedStyle(c);
      ItemColor = ItemSyle.backgroundColor;
    }
  });

  newProduct.name = document.querySelector("#product-name").textContent;
  newProduct.price = document.querySelector("#product-price").textContent;
  newProduct.img = coverImage.src;
  newProduct.size = ItemSize;
  newProduct.color = ItemColor;
  newProduct.count = ItemCount;
  cart_product?.push(newProduct);
  localStorage.setItem("product", JSON.stringify(cart_product));
  AddtoCart.setAttribute("disabled", "true");
  AddtoCart.textContent = "Added to cart";
  CartCount.textContent = JSON.parse(localStorage.getItem("product")).length;
  FetchProduct();
});

// open cart menu event handle
bag.addEventListener("click", () => {
  cartMenu.classList.toggle("cart-menu-active");
});

// display cart items
bag.addEventListener("click", () => {
  if (cartMenu.classList.contains("cart-menu-active")) {
    CalculateTotal();
    const DeleteBtn = document.querySelectorAll("#trash");
    // Remove item from cart event handle
    DeleteBtn.forEach((ele) => {
      ele?.addEventListener("click", (e) => {
        const parent = e.target.parentElement;
        const produt_id = parent.children[3].value;
        //console.log(produt_id);
        for (let i = 0; i < cart_product.length; i++) {
          const element = cart_product[i];
          if (element.id == produt_id) {
            cart_product.splice(i, 1);
            localStorage.setItem("product", JSON.stringify(cart_product));
            document.querySelector(`.ci${produt_id}`).remove();
            CartCount.textContent = localStorage.getItem("product").length;
            AddtoCart.removeAttribute("disabled");
            AddtoCart.textContent = "Add to cart";
            CartCount.textContent = JSON.parse(
              localStorage.getItem("product")
            ).length;
            CalculateTotal();
          }
        }
      });
    });
  }
});

// fetch cart products
function FetchProduct() {
  const cartItems = document.querySelectorAll(".cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  if (cartItems) {
    cartItems.forEach((ele) => {
      ele.remove();
      console.log("remove");
    });
  }

  updated_cart = JSON.parse(localStorage.getItem("product")) || [];
  if (cartEmpty && updated_cart.length != 0) {
    cartEmpty.remove();
  }
  const newEle = document.createElement("h2");
  newEle.setAttribute("id", "cart-empty");
  if (updated_cart.length == 0) {
    newEle.textContent = "Your cart is empty!";
    cart_container.appendChild(newEle);
    cart_container.style.justifyContent = "center";
    cart_container.style.alignItems = "center";
  }
  updated_cart?.forEach((p) => {
    const newItem = document.createElement("div");
    newItem.setAttribute("class", `cart-items ci${p.id}`);
    newItem.innerHTML = ` <div class="cart-title">
          <a href ="#">
          <img id="cart-thumbnail" src="${p.img}" alt="item">
          </a>
          <a href="#"><h3>${p.name} <small>X(${p.count})</small></h3> </a>
         <i id='trash' class="fa-regular fa-trash-can"></i>
         <input  type="hidden" value=${p.id}>
        </div>
        <div class="cart-price">
         <p>Price: ${p.price}</p>
         <p>Size: ${p.size}</p>
         <div class='color-box'>
         <p>Color</p>
        <p id ='cart-product-color' style ='background-color: ${p.color};' ></p>
        </div>
        </div>`;
    cart_container.appendChild(newItem);
  });
}

// Adding total price into cart
function CalculateTotal() {
  const Cart_product = JSON.parse(localStorage.getItem("product")) || [];
  var totalPrice = 0;
  if (Cart_product.length != 0) {
    Cart_product?.forEach((p) => {
      ProductPrice = parseInt(p.price.slice(1).replace(/,/g, ""));
      totalPrice = totalPrice + ProductPrice * parseInt(p.count);
    });
    totalPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(totalPrice);
    total.innerHTML = `Total: ${totalPrice}`;
  } else {
    totalPrice = 0;
    total.innerHTML = `Total: ${totalPrice}`;
  }
}
