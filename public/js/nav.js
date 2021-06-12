let x = document.querySelector(".navi");

let y = {
    "height": "320px",
    "width": "70px",
    "top": "30vh",
    "border-radius": "30px",
    "padding": "15px",
    
    }

let old_sty = {
    "height": "60px",
    "width": "60px",
    "top": "40vh",
    "border-radius": "50%",
    "padding": "10px",
    
}

let z = document.querySelector(".nav__opened");

let navbt = document.querySelector(".nav__button");
function navOpen(){
    Object.assign(x.style, y);
    navbt.style.display = "none";
    z.style.display = "block"; 
}

function navClose(){
    Object.assign(x.style, old_sty);
    navbt.style.display = "block";
    z.style.display = "none"; 
}