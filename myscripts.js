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
  phoneValidate();
});

phoneClick.addEventListener('blur', () => {
  for (let item of phoneFocus) {
    // console.log(item);
    item.classList.remove('visible');
  }
  phoneValidate();
});

// phoneClick.addEventListener('keypress', function (e) {
//   return isNumberKey(e)});

const passwordClick = document.getElementById('password-input');
const passwordFocus = document.querySelectorAll('.password');
const passwordHidden = document.getElementById('password-hidden');
const passwordWrapper = document.getElementById('password-wrapper');
const passwordFirstClick = document.querySelectorAll('.first-click');

passwordClick.addEventListener('focus', () => {
  for (let item of passwordFocus) {
    // console.log(item);
    item.classList.add('visible');
    passwordHidden.classList.add('visible');
  }
  // passwordWrapper.classList.toggle('expanded');
  // passwordHidden.classList.toggle('visible');
});

passwordWrapper.addEventListener('transitionend', () => {
  passwordHidden.classList.toggle('visible');
  console.log('ended event');
})

passwordClick.addEventListener('blur', () => {
  for (let item of passwordFocus) {
    // console.log(item);
    // item.classList.remove('visible');
  }

  for (let item of passwordFirstClick) {
    item.classList.remove('first-click');
  }
  // passwordHidden.classList.toggle('visible');

});

passwordClick.addEventListener('keyup', passwordValidate);

function emailValidate() {
  const email = document.getElementById('email-input');
  console.log(email);
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,256})+$/
  if((email.value === '') || (email === document.activeElement)) {
    changeEmailStatus('verif-none');
  } else if(email.value.match(mailFormat)) {
    changeEmailStatus('verif-true');
    // document.querySelector('#email-input').classList = '';
  } else {
    changeEmailStatus('verif-false');
    // document.querySelector('#email-input').classList = 'email-validation-failed';

  }

}

function changeEmailStatus(status) {
  document.querySelector('#email-validation-icon').className = 'validation-icon '+ status;
  if(status === 'verif-false') {
    document.querySelector('#email-input').classList.add('validation-border-change');
    document.querySelector('#email-error').classList.add('visible');
  } else {
    document.querySelector('#email-input').classList.remove('validation-border-change');
    document.querySelector('#email-error').classList.remove('visible');
  }
}

function phoneValidate() {
  const phone = document.getElementById('phone-input');
  const phoneIcon = document.getElementById('phone-validation-icon');
  let phoneFormat = /^\(\d{3}\) \d{3}\-\d{4}$/;
  if(phone === document.activeElement || phone.value.match(phoneFormat)) {
    //show standard text box and phone number verification
    changePhoneStatus('verif-none');
  } else if(phone.value === '') {
    changePhoneStatus('verif-warning');
  } else {
    //error
    changePhoneStatus('verif-false');
  }
}

function changePhoneStatus(status) {
  document.querySelector('#phone-validation-icon').className = 'validation-icon '+ status;
  if(status === 'verif-warning') {
    document.querySelector('#phone-info').classList = 'disp-none';
    document.querySelector('#phone-warning').classList = 'disp-block';
    document.querySelector('#phone-error').classList = 'disp-none';
    document.querySelector('#phone-verification-container').classList.remove('visible');
    document.querySelector('#phone-input').classList.remove('validation-border-change');
  } else if(status === 'verif-none') {
    document.querySelector('#phone-info').classList = 'disp-block';
    document.querySelector('#phone-warning').classList = 'disp-none';
    document.querySelector('#phone-error').classList = 'disp-none';
    document.querySelector('#phone-verification-container').classList.add('visible');
    document.querySelector('#phone-input').classList.remove('validation-border-change');
  } else {
    console.log('warning');
    document.querySelector('#phone-input').classList.add('validation-border-change');
    document.querySelector('#phone-info').classList = 'disp-none';
    document.querySelector('#phone-error').classList = 'disp-block';

  }
}

function isNumberKey(e) {
  // let charCode = (e.which) ? e.which : event.keyCode;
  let charCode = e.key;
  let charThing = e.code;

  // let selectedChar = caret_get_position(e);
  // console.log(selectedChar)

  let ctl = document.getElementById('phone-input');
  let startPos = ctl.selectionStart;
  let endPos = ctl.selectionEnd;
  console.log(startPos + ", " + endPos);



  // console.log(charCode);
  // console.log(charThing);
  let numberBox = document.getElementById('phone-input');
  let number = numberBox.value;
  let newNumber;
  // console.log(number.length);
  // console.log('e.which = ' + e.which + ' event.keyCode = '+event.keyCode);
  if ((charCode < 48 || charCode > 57)){
    if(number.length === 3){
      numberBox.value += '-';
    } else if(number.length === 8){
      newNumber = '('+number.slice(0,3)+') '+number.slice(4,7)+'-'+number.slice(7);
      numberBox.value = newNumber; 
    }
    //numberBox.value += charCode;
    return true;
  } else if(charCode === 'Backspace'||charCode === 'Delete'){
    console.log('backspace');
    if(number.length === 5 && endPos === 5){
      newNumber = number.slice(0,4);
      numberBox.value = newNumber;
    } else if(number.length === 12){
      newNumber = number.slice(1,4)+'-'+number.slice(6,9)+number.slice(10);
      numberBox.value = newNumber;
    }
    return true;
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown'){
    return true;
  }
  // console.log('false');
  return false;
}

// var caret_get_position = function(element){
//   var pos    = 0;
//   var posEnd = 0;
//   if('selectionStart' in element){
//       pos    = element.selectionStart;
//       posEnd = element.selectionEnd;
//   }else if('selection' in document){
//       element.focus();
//       var Sel       = document.selection.createRange();
//       var SelLength = document.selection.createRange().text.length;
//       Sel.moveStart('character', -element.value.length);
//       pos    = Sel.text.length-SelLength;
//       posEnd = Sel.text.length;
//   }
//   // return both selection start and end;
//   return [pos, posEnd];
// };



// function addPhoneSyntax() {
//   const phoneInput = document.querySelector('#phone-input');
//   console.log(phoneInput.value.length);
// }

function passwordValidate(e) {
  const passwordInput = document.getElementById('password-input');
  const passwordContents = passwordInput.value;
  let passwordStatus = {
    len: passwordLengthChange(passwordContents),
    case: passwordCaseChange(passwordContents),
    num: passwordNumChange(passwordContents),
    symbol: passwordSymbolChange(passwordContents),
    maxLen: passwordContents.length >= 32 ? false : true
  }
  console.log(passwordStatus);
  // };
  //console.log(passwordCharacteristics);

}

function passwordLengthChange(str) {
  const pw = document.getElementById('password-length').childNodes;
  const pwMaxLength = document.getElementById('password-max-length');
  if (str.length >= 8) {
    for(let item of pw) {
      item.classList.add('succeeded');
    }
    if (str.length >= 32) {
      //adjust max length thing
        pwMaxLength.classList.remove('hidden');
    } else {
      pwMaxLength.classList.add('hidden');
    }
    return true;
  } else {
    for(let item of pw){
      item.classList.remove('succeeded');
    }
    return false;
  }

}

function passwordCaseChange(str) {
  const pw = document.getElementById('password-upper-lower').childNodes;
  if (/[a-z]/.test(str) && /[A-Z]/.test(str)) {
    for(let item of pw){
      item.classList.add('succeeded');
    }
    return true;
  } else {
    for (let item of pw) {
      item.classList.remove('succeeded');
    }
    return false;
  }
}

function passwordNumChange(str) {
  const pw = document.getElementById('password-number').childNodes;
  if (/[0-9]/.test(str)) {
    for(let item of pw){
    item.classList.add('succeeded');
    }
    return true;
  } else {
    for (let item of pw) {
      item.classList.remove('succeeded');
    }
    return false;
  }
}

function passwordSymbolChange(str) {
  const pw = document.getElementById('password-symbol').childNodes;
  if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str)) {
    for(let item of pw){
      item.classList.add('succeeded');
    }
    return true;
  } else {
    for (let item of pw) {
      item.classList.remove('succeeded');
    }
    return false;
  }
}