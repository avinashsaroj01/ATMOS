const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

// const price = require('./plans.js');
// document.getElementById('plan').innerHTML = price;

const circles = document.querySelectorAll('.circle');

let currentActive = 1;

const page1= document.getElementById('page1');
const page2= document.getElementById('page2');
const page3= document.getElementById('page3');


next.addEventListener('click', () => {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    if(currentActive === 2) {
        validateForm1();
    }
    if(currentActive === 4) {
        validateForm3();
        registerUser();
    }
    update();
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateForm3() {
   const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;

    let valid = true;
    if(firstname==='') {
        document.getElementById('firstname').style.borderColor = 'red';
        document.getElementById('firstname').style.borderWidth = '2px';
        document.getElementById('firstname').style.borderStyle = 'solid';
        document.getElementById('firstname').value = '';
        document.getElementById('firstname').style.backgroundColor = '#ffdddd';
        document.getElementById('firstname').placeholder = 'Firstname is required';
        valid = false;
    }
    if(lastname==='') {
        document.getElementById('lastname').style.borderColor = 'red';
        document.getElementById('lastname').style.borderWidth = '2px';
        document.getElementById('lastname').style.borderStyle = 'solid';
        document.getElementById('lastname').value = '';
        document.getElementById('lastname').style.backgroundColor = '#ffdddd';
        document.getElementById('lastname').placeholder = 'Lastname is required';
        valid = false;
    }
    if(phone==='') {
        document.getElementById('phone').style.borderColor = 'red';
        document.getElementById('phone').style.borderWidth = '2px';
        document.getElementById('phone').style.borderStyle = 'solid';
        document.getElementById('phone').value = '';
        document.getElementById('phone').style.backgroundColor = '#ffdddd';
        document.getElementById('phone').placeholder = 'Phone is required';
        valid = false;
    }
    else if(phone.length < 10) {
        document.getElementById('phone').style.borderColor = 'red';
        document.getElementById('phone').style.borderWidth = '2px';
        document.getElementById('phone').style.borderStyle = 'solid';
        document.getElementById('phone').value = '';
        document.getElementById('phone').style.backgroundColor = '#ffdddd';
        document.getElementById('phone').placeholder = 'Phone less than 10 digits';
        valid = false;
    }
    if(valid===false) 
    currentActive--;

    return valid;
}

function validateForm1() {
    const password = document.getElementById('pass').value;
    const cpassword = document.getElementById('cpass').value;
    const email = document.getElementById('email').value;
    let valid = true;

    if(email==='') {
        document.getElementById('email').style.borderColor = 'red';
        document.getElementById('email').style.borderWidth = '2px';
        document.getElementById('email').style.borderStyle = 'solid';
        document.getElementById('email').value = '';
        document.getElementById('email').placeholder = 'Email is required';
        valid = false;
    }
    else
    if(!isValidEmail(email)) {
        document.getElementById('email').style.borderColor = 'red';
        document.getElementById('email').style.borderWidth = '2px';
        document.getElementById('email').style.borderStyle = 'solid';
        document.getElementById('email').value = '';
        document.getElementById('email').style.backgroundColor = '#ffdddd';
        document.getElementById('email').placeholder = 'Invalid email';
        valid = false;
    }
    if(password !== cpassword){
        document.getElementById('pass').style.borderColor = 'red';
        document.getElementById('pass').style.borderWidth = '2px';
        document.getElementById('pass').style.borderStyle = 'solid';
        document.getElementById('cpass').style.borderColor = 'red';
        document.getElementById('cpass').style.borderWidth = '2px';
        document.getElementById('cpass').style.borderStyle = 'solid';
        document.getElementById('cpass').value = '';
        document.getElementById('pass').value = '';
        document.getElementById('cpass').style.backgroundColor = '#ffdddd';
        document.getElementById('pass').style.backgroundColor = '#ffdddd';
        document.getElementById('pass').placeholder = 'Password does not match';
        document.getElementById('cpass').placeholder = 'Password does not match';
        valid = false;
    }
    else
    if(password.length < 8){
        document.getElementById('pass').style.borderColor = 'red';
        document.getElementById('pass').style.borderWidth = '2px';
        document.getElementById('pass').style.borderStyle = 'solid';
        document.getElementById('cpass').style.borderColor = 'red';
        document.getElementById('cpass').style.borderWidth = '2px';
        document.getElementById('cpass').style.borderStyle = 'solid';
        document.getElementById('cpass').style.backgroundColor = '#ffdddd';
        document.getElementById('pass').style.backgroundColor = '#ffdddd';
        document.getElementById('pass').value = '';
        document.getElementById('cpass').value = '';
        document.getElementById('pass').placeholder = 'Password must be 8 characters or more';
        document.getElementById('cpass').placeholder = 'Password must be 8 characters or more';
        valid = false;
    }
    if(valid===false)
    currentActive--;

    return valid;
}

async function registerUser() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const password = document.getElementById('pass').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const data = {
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        phone: phone,
    }

    console.log(data);

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        if(data) {
            localStorage.setItem('user-info', JSON.stringify(data));
            console.log(data);
            window.location.replace('/home');
        }
    }).catch(err => {
        console.log(err);
    }
    );
}   

prev.addEventListener('click', () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update();
});

function update() {
    circles.forEach((circle, index) => {
        if(index < currentActive) {
            circle.classList.add('active');
        }
        else {
            circle.classList.remove('active');
        }

    });
    const actives = document.querySelectorAll('.active');
    progress.style.width = `${(actives.length-1) * 35}%`;
    // page.style.left= `${(actives.length-1) * -25}%`;
    const page = document.getElementsByClassName('page');
    for(let i = 0; i < page.length; i++) {
        page[i].style.left = `${(actives.length-1) * -25}%`;
    }

    if (currentActive === circles.length) {
        next.disabled=true;
    }
    else 
    if(currentActive === 1) {
        prev.disabled=true;
    }
    else{
        next.disabled=false;
        prev.disabled=false;
    }

}

function onlyNumberKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
