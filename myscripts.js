// This is one of those areas where faithfulness to the recreation trumps (imo) functionality.
// If I were to make this myself I'd probably just make the icons anchor elements natively.  As is this is basically the same but
// you can't middle or right click to open in new tab. 
const mintClick = document.getElementById('mint-icon');
mintClick.addEventListener('click', () => {
  window.open('https://www.mint.com');
});

const quickbooksClick = document.getElementById('quickbooks-icon');
quickbooksClick.addEventListener('click', () => {
  window.open('https://www.quickbooks.intuit.com');
});

const turbotaxClick = document.getElementById('turbotax-icon');
turbotaxClick.addEventListener('click', () => {
  window.open('https://www.turbotax.intuit.com');
});

const emailClick = document.getElementById('email-input');
const emailFocus = document.querySelectorAll('.email');

emailClick.addEventListener('focus', () => {
  for (let item of emailFocus) {
    // console.log(item);
    item.classList.add('visible');
  }
  emailValidate();
});

emailClick.addEventListener('blur', () => {
  for (let item of emailFocus) {
    // console.log(item);
    item.classList.remove('visible');
  }
  emailValidate();
});

//Figure out a better way to do this
const phoneClick = document.getElementById('phone-input');
const phoneFocus = document.querySelectorAll('.phone');

phoneClick.addEventListener('focus', () => {
  for (let item of phoneFocus) {
    // console.log(item);
    item.classList.add('visible');
  }
});

phoneClick.addEventListener('blur', () => {
  for (let item of phoneFocus) {
    // console.log(item);
    item.classList.remove('visible');
  }
});

const passwordClick = document.getElementById('password-input');
const passwordFocus = document.querySelectorAll('.password');

passwordClick.addEventListener('focus', () => {
  for (let item of passwordFocus) {
    // console.log(item);
    item.classList.add('visible');
  }
});

passwordClick.addEventListener('blur', () => {
  for (let item of passwordFocus) {
    // console.log(item);
    item.classList.remove('visible');
  }
});

function emailValidate() {
  const email = document.getElementById('email-input');
  console.log(email);
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,256})+$/
  if((email.value === '') || (email === document.activeElement)) {
    changeEmailStatus('email-none');
  } else if(email.value.match(mailFormat)) {
    changeEmailStatus('email-true');
    document.querySelector('#email-input').classList = '';
  } else {
    changeEmailStatus('email-false');
    document.querySelector('#email-input').classList = 'email-validation-failed';

  }

}

function changeEmailStatus(status) {
  document.querySelector('#email-validation-icon').className = status;
  if(status === 'email-false') {
    document.querySelector('#email-input').classList = 'email-validation-failed';
    document.querySelector('#email-error').classList = 'visible';
  } else {
    document.querySelector('#email-input').classList = '';
    document.querySelector('#email-error').classList = '';
  }
}