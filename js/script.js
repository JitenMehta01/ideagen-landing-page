
/***
 * Variables
 */
const enquire = [...document.getElementsByClassName('enquiry')];
const body = document.querySelector('body');
const main = document.querySelector('main');
const countries = []; // will be filled via api
const navBtn = document.querySelector("header button");
const logo = document.querySelector('.logo');

/****
 * Form
 */

// adds a form whenever a enquiery button is clicked
if(navBtn.textContent === "Enquire Now"){
    console.log(true);
        enquire.forEach(btn =>{
            btn.addEventListener('click',  function formhandler(){
                createformDiv('div');
                
                const formDiv = main.querySelector('.formdiv');
                formDiv.innerHTML = ` 
                <div class = "content-container">
                    <div class = "form_container">    
                        <form href="/" method="post" novalidate>
                        
                        <div class = "form_logos">
                        <svg> <use xlink:href = '#ideagen_logo'> </use>  </svg>
                        <svg> <use xlink:href = '#pentanaauditlogo'> </use>  </svg>
                        </div>

                        <fieldset id = 'personal-details'>         
                            <legend>Leave your details and we will get back to you shortly</legend>
                            
                            <label for="fname"><b>First Name </b><i>(required)</i></label>
                            <input type="text" id="fname" fname="user-fname" required>

                            <label for="lname"><b>Last Name </b><i>(required)</i></label>
                            <input type="text" id="lname" lname="user-lname" required>

                            <label for="mail"><b>Email </b>(required)</label>
                            <input type="email" id="mail" name="user-email" required>
                            
                            <label for="company"><b>Company </b></label>
                            <input type="text" id="company" name="user-company" required>

                            <label for="jobtitle"><b>Job Title </b></label>
                            <input type="text" id="jobtitle" name="user-jobtitle">

                            <label for="phone"><b>Phone Number </b></label>
                            <input type="text" id="phone" name="user-phonenumber">

                            <label for="country"><b>Country </b></label>
                            <select id="country" name="user-country" autocomplete="off">  		          
                            </select>     
                            <button class = "btn--pink" type="submit">Register</button>
                        </form>
                    </div>    
                </div>`;

                // adds select options via api
                countries.forEach(country =>{
                    document.querySelector('form select').innerHTML += `
                    <option value="${country}">${country}</option>
                    `
                });
                const input = document.querySelector('#hero-enquiry');
                const emailInput = document.querySelector('#mail');
                // auto fills email input in form
                if(input.value !== ""){
                    emailInput.value = input.value
                } 
                // changes the nav btn so it closes form
                if(main.lastElementChild.id === "formdiv"){
                    this.removeEventListener('click', formhandler);
                    navBtn.textContent = "Close form?";
                    navBtn.addEventListener('click',e =>{
                        location.reload();
                })
                } 
            });
        });
}


/**
 * reloads page after logo is clicked
 */



/***
 * function to create a form Div
 */
// function that creates a formDiv
function createformDiv (element){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    body.style.overflow = "hidden"
    const formDiv = document.createElement(element);
    formDiv.classList = "formdiv grid__row";
    formDiv.id = "formdiv";
    formDiv.style.height = "100vh";
    formDiv.style.backgroundColor = "white"; 
    formDiv.style.width = "100vw";
    formDiv.style.top = "0";
    formDiv.style.position = "absolute";
    formDiv.style.overflow = "auto";
    main.appendChild(formDiv);

    return true
}



/**************
 * COUNTRY API FOR FORM
 */

const apiUrl = 'https://restcountries.eu/rest/v2/all';

async function getJSON(url){
    try {
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        throw error;
    }
    }
    
// waits for a resolved response and returns all data parsed to JSON
async function grabData(url){
    const response = await getJSON(url);
    return Promise.all(response);
}

function generatCountryList(data){
    const country = data.map(country =>{
        countries.push(country.name);
    });

}

grabData(apiUrl)
.then(generatCountryList)
.catch(e =>{
    main.innerHTML = `
    Oh no! Something went wrong.
    `
    console.error(e);
    });

