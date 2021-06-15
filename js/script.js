const enquire = [...document.getElementsByClassName('enquire')];
const body = document.querySelector('body');
const main = document.querySelector('main');
console.log(main);


// adds a form whenever a enquiery button is clicked
enquire.forEach(btn =>{
    btn.addEventListener('click', e =>{
        createformDiv('div');
        
        const formDiv = main.querySelector('.formdiv');
        formDiv.innerHTML = ' <svg class = "nav_logo"> <use xlink:href = "#close_form"> </use>  </svg>';
    });

});




function createformDiv (element){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    body.style.overflow = "hidden"
    const formDiv = document.createElement(element);
    formDiv.className = "formdiv";
    formDiv.style.height = "100vh";
    formDiv.style.backgroundColor = "green"; 
    formDiv.style.width = "100vw";
    formDiv.style.top = "0";
    formDiv.style.position = "absolute";
    main.appendChild(formDiv);

    return true
}

if(createformDiv){
    const closeform = document.querySelector("#close_form");
    closeform.addEventListener('click',e =>{
        body.style.overflow = "auto"
        main.removeChild(main.lastElementChild);
    })
}