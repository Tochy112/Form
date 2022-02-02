const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
const form = document.querySelector('#form')
const modal = document.querySelector('.modal')
const close = document.querySelector('#close-btn')
const modalContainer = document.querySelector('#modal-container')
const togglePassword1 = document.querySelector("#togglePassword")
const togglePassword2 = document.querySelector("#togglePassword2")
let uB = false;   //user box
let eB = false;  //error box
let p1B = false;  // password1 box
let p2B = false;  // password2 box

//Declaring our functions
function showSuccess(input){
    const formControl = input.parentElement
    formControl.classList.add('success')
}
function showError(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')
    small.innerText = message
    formControl.className = 'error'
}

// checking all conditions and applying the functions
function checkInput(){
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const password1Value = password1.value.trim()
    const password2Value = password2.value.trim()

    if (usernameValue === ''){
        showError(username, "Username can't be empty")
    }else{
        showSuccess(username)
        uB = true;
    }

    if(emailValue === ''){
        showError(email, "Email can't be empty")
    }else if(!checkEmail(emailValue)){
        showError(email, 'Email is not valid')//here we check if the email is equal to the standard email format
    } else{
        showSuccess(email)
        eB = true;
    }
   
    if(password1Value === ''){
        showError(password1, "password can't be empty")
    }else{
        showSuccess(password1)
        p1B = true;
    }

    if(password2Value === ''){
        showError(password2, "Confirm password")
    }else if (password1Value !== password2Value){
        showError(password2, "Wrong password")
    }else{
        showSuccess(password2);
        p2B = true;
    }   
    showModal(); //the function declared
}

function checkEmail(email){
    //here the value of return is the standard format every valid email should follow or adhere to
    //and we use .test() function to check if the email matches the standard format
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
           
}

//declearing the function for the modal to display if all our booleans are true
function showModal(){
    if(uB === true && eB === true && p1B === true && p2B === true){
        modalContainer.classList.add('show-modal');
        clearField(); //the decleared function should run after the show modal
    }
};

//function to clear all fields after submittion
function clearField(){
    username.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}

//to add a remove function on the close button on the modal
close.addEventListener('click', (e) =>{
    modalContainer.classList.remove('show-modal');
})

/*using the getAttribute method to get our input type and using the unary statement to 
check the conditions */
togglePassword1.addEventListener('click', (e)=>{
    e.preventDefault()
    const type = password1.getAttribute('type') === 'password' ? 'test' : 'password'
    //if the input type is password then convert to test else stay password
    password1.setAttribute('type', type);
    //here we set back our attribute to the initial type using the SetAttribute method with two arguments, the type and the variable name
})
togglePassword2.addEventListener('click', (e)=>{
    e.preventDefault()
    const type = password2.getAttribute('type') === 'password' ? 'test' : 'password'
    password2.setAttribute('type', type);
})


// adding the submit event to the form, with the checkInput and clearField functions in it
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    checkInput()
    clearField();
})