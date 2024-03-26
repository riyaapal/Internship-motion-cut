const monthToggle = document.querySelector("input[name=month-year]");
const select = document.getElementById("currency");
const hamburger = document.querySelector('.hamburger-container')
const togglelist = document.querySelector('.options')
const menu = document.querySelector(".hamburger")
const cross = document.querySelector('.cross');
const newElement = document.createDocumentFragment();
const standard = document.querySelector(".st-price");
const ultimate = document.querySelector(".ul-price");
const free = document.querySelector(".price");
var stPrice = 50;
var prePrice = 100;
var currency ={};
var toggle = false;




select.addEventListener("change", (e) => {
  if(e.target.value==='INR'){
    monthToggle.checked = false;
    free.innerHTML = `&#8377 0`
    standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*82.93809997)} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*82.93809997)} <small>/ month </small>  </p>`;
    
    monthToggle.addEventListener("change", function () {
      if (this.checked) {
        standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*5.04*82.93809997)} <small>/ year </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*6.704*82.93809997)} <small>/ year </small>  </p>`;
      } else {
        standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*82.93809997)} <small>/ month </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*82.93809997)} <small>/ month </small>  </p>`;
      }
  
    })

  }else if(e.target.value === 'USD'){
    monthToggle.checked = false;
    free.innerHTML = `&#36 0`
    standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice)} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice)} <small>/ month </small>  </p>`;

    monthToggle.addEventListener("change", function () {
      if (this.checked) {
        standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice*5.04)} <small>/ year </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice*6.704)} <small>/ year </small>  </p>`;
      } else {
        standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice)} <small>/ month </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice)} <small>/ month </small>  </p>`;
      }
  
    })
  }
});

monthToggle.addEventListener("change", function () {
  if (this.checked) {
    standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice*5.04)} <small>/ year </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice*6.704)} <small>/ year </small>  </p>`;
  } else {
    standard.innerHTML = `<p class="ul-price">&#36 ${stPrice} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${prePrice} <small>/ month </small>  </p>`;
  }
});

hamburger.addEventListener('click',()=>{
   
    if(!toggle){
      togglelist.classList.replace('options','toggle')
      cross.style.display ='block';
      menu.style.display = 'none';
      toggle = true;

    }else{
      togglelist.classList.replace('toggle','options');
      menu.style.display = 'block';
      cross.style.display= 'none'
      toggle = false;
    }

})

window.addEventListener('mouseup',(e)=>{
  if(document.querySelector('.toggle')){
    if(!document.querySelector('.toggle').contains(e.target) && !hamburger.contains(e.target)){
    togglelist.classList.replace('toggle','options');
    menu.style.display = 'block';
    cross.style.display= 'none'
    toggle=false
  } 
  }
 
})