const enquire = [...document.getElementsByClassName('enquiry')];
const body = document.querySelector('body');
const main = document.querySelector('main');
const countries = []; // will be filled via api



// adds a form whenever a enquiery button is clicked
enquire.forEach(btn =>{
    btn.addEventListener('click', e =>{
        createformDiv('div');
        
        const formDiv = main.querySelector('.formdiv');
        formDiv.innerHTML = ` 
        <div class = "content-container">
            <div class = "svg-container">
                <svg class = "closeform"> 
                    <use xlink:href = "#close_form"> 
                    </use>  
                </svg>
            </div>
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

        countries.forEach(country =>{
            document.querySelector('form select').innerHTML += `
            <option value="${country}">${country}</option>
            `
        });

        const input = document.querySelector('#hero-enquiry');
        const emailInput = document.querySelector('#mail');
        
        if(input.value !== ""){
            emailInput.value = input.value
        } 


    });

});


// function that creates a formDiv
function createformDiv (element){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    body.style.overflow = "hidden"
    const formDiv = document.createElement(element);
    formDiv.classList = "formdiv grid__row";
    formDiv.style.height = "100vh";
    formDiv.style.backgroundColor = "white"; 
    formDiv.style.width = "100vw";
    formDiv.style.top = "0";
    formDiv.style.position = "absolute";
    formDiv.style.overflow = "auto";
    main.appendChild(formDiv);

    return true
}

// removes form div when X is clicked
if(createformDiv){
    const closeform = document.querySelector("#close_form");
    closeform.addEventListener('click',e =>{
        body.style.overflow = "auto"
        main.removeChild(main.lastElementChild);
    })
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

