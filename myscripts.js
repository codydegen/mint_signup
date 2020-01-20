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
  const numberBox = document.getElementById('phone-input');
  numberBox.value = formatPhoneNumber(numberBox.value);
  phoneValidate();
});

// phoneClick.addEventListener('keypress', function (e) {
//   return isNumberKey(e)});

const passwordClick = document.getElementById('password-input');
const passwordFocus = document.querySelectorAll('.password.popup');
const passwordHidden = document.getElementById('password-hidden');
const passwordWrapper = document.getElementById('password-wrapper');
const passwordFirstClick = document.querySelectorAll('.first-click');

passwordClick.addEventListener('focus', e => {
  for (let item of passwordFocus) {
    // console.log(item);
    item.classList.add('visible');
    // passwordHidden.classList.add('visible');
  }
  if(!passwordWrapper.classList.contains('expanded')){
    passwordWrapper.classList.add('expanded');
  }
  passwordLockIconChangeSelect(e.type);
  const passwordConfirmation = document.getElementById('password-confirmation');
  if(passwordConfirmation.value.length > 0) {
    passwordConfirmationFocus();
  }
  // passwordWrapper.classList.toggle('expanded');
  // passwordHidden.classList.toggle('visible');
});

passwordWrapper.addEventListener('transitionend', () => {
  passwordHidden.classList.add('visible');
  //console.log('ended event');
})

passwordClick.addEventListener('blur', e => {
  for (let item of passwordFocus) {
    // console.log(item);
    item.classList.remove('visible');
  }

  for (let item of passwordFirstClick) {
    item.classList.remove('first-click');
  }
  passwordLockIconChangeSelect(e.type);
  const passwordConfirmation = document.getElementById('password-confirmation');
  if(passwordConfirmation.value.length > 0) {
    passwordConfirmationBlur();
  }
  // passwordHidden.classList.toggle('visible');

});

passwordClick.addEventListener('keyup', e => {
  passwordValidate(e);
});

function emailValidate() {
  const email = document.getElementById('email-input');
  //console.log(email);
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
    //console.log('warning');
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
  //console.log('strippedNumber')
  let startPos = ctl.selectionStart;
  let endPos = ctl.selectionEnd;
  



  // console.log(charCode);
  // console.log(charThing);
  let numberBox = document.getElementById('phone-input');
  let number = numberBox.value;
  let newLength;
  let selectedString = number.slice(startPos,endPos);
  console.log(startPos + ", " + endPos);
  console.log('selected: '+number.slice(startPos,endPos));
  if(charCode === 'Backspace' || charCode === 'Delete'){
    newLength = -1;
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown') {
    newLength = 0;
  } else {
    newLength = 1;
  }
  if(newLength === -1){
    if(selectedString.length > 0){
    number = number.replace(selectedString, '');
    console.log('removed substring '+selectedString);
    //return false;
    }
  }
  let newNumber;
  let strippedNumber = number.replace(/[\(\)\s\-]/g, '');
  console.log(strippedNumber);
  if((charCode < 48 || charCode > 57)){
    if(strippedNumber.length < 3){
      numberBox.value = strippedNumber;
    }
    else if(strippedNumber.length === 3){
      numberBox.value = strippedNumber += '-';
    } else if(strippedNumber.length === 7) {
      numberBox.value = '('+strippedNumber.slice(0,3)+') '+strippedNumber.slice(3,6)+'-'+strippedNumber.slice(6);
    }
    return true;
  } else if(newLength === -1) {

    // if(strippedNumber.length )
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown'){
    return true;
  }
  return false;
  console.log(strippedNumber);
  // console.log(number.length);
  // console.log('e.which = ' + e.which + ' event.keyCode = '+event.keyCode);
  
  
  
  // if ((charCode < 48 || charCode > 57)){
  //   if(number.length === 3){
  //     numberBox.value += '-';
  //   } else if(number.length === 8){
  //     newNumber = '('+number.slice(0,3)+') '+number.slice(4,7)+'-'+number.slice(7);
  //     numberBox.value = newNumber; 
  //   }
  //   //numberBox.value += charCode;
  //   return true;
  // } else if(charCode === 'Backspace'||charCode === 'Delete'){
  //   //console.log('backspace');
  //   if(number.length === 5 && endPos === 5){
  //     newNumber = number.slice(0,4);
  //     numberBox.value = newNumber;
  //   } else if(number.length === 12){
  //     newNumber = number.slice(1,4)+'-'+number.slice(6,9)+number.slice(10);
  //     numberBox.value = newNumber;
  //   }
  //   return true;



//  /*}*/ else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown'){
    return true;
 // }
  // console.log('false');
  return false;
}


function isNumberKeyNew(e) {
  // Identify whether characters are being added or subtracted or just moved
  let charCode = e.key;
  //console.log(charCode);
  let ctl = document.getElementById('phone-input');
  let startPos = ctl.selectionStart;
  let endPos = ctl.selectionEnd;
  let locUpdate = 1;
  const numberBox = document.getElementById('phone-input');
  let previousNumber = numberBox.value;
  let rawNumber = numberBox.value;
  //let input = String.fromCharCode(charCode);
  let charsAdded;
  let selectedString = rawNumber.slice(startPos,endPos);
  let deletedString;
  let outputNumber;
  if(charCode === ' ') return false;
  if(charCode === 'Backspace' || charCode === 'Delete'){
    charsAdded = false;
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown' || charCode === 'Tab'){
    return true;
  } else {
    if((charCode < 10)){
      //console.log(charCode)
      charsAdded = true;
    } else {
      return false;
    }
    // charsAdded = 1;
  }
  //console.log(charCode);
  //Handle selected string replacement

  if(selectedString.length > 0) {
    if(charsAdded === true){
      rawNumber = rawNumber.slice(0, startPos)+charCode+rawNumber.slice(endPos);
    } else {
      rawNumber = rawNumber.replace(selectedString,'');
    }
  } else {
    if(charsAdded === true){
      if(startPos === rawNumber.length){
      rawNumber += charCode;
      } else {
        rawNumber = rawNumber.slice(0,startPos) + charCode + rawNumber.slice(startPos);
      }
    } else if (charCode === 'Backspace') {
      if(startPos !== 0){  
        deletedString = selectedString.length === 0 ? rawNumber.charAt(startPos-1) : selectedString;
        rawNumber = rawNumber.slice(0,startPos-1)+rawNumber.slice(startPos);
      }
    } else if (charCode === 'Delete') {
      if(startPos !== rawNumber.length){
        deletedString = selectedString.length === 0 ? rawNumber.charAt(startPos) : selectedString;
        rawNumber = rawNumber.slice(0,startPos) + rawNumber.slice(startPos+1);
      }
    }
  }
  //console.log('rawNumber '+rawNumber);
  // Place raw number
  let strippedNumber = rawNumber.replace(/[\(\)\s\-]/g, '');
  //formatPhoneNumber(strippedNumber);
  // format stripped number
  //formatPhoneNumber(strippedNumber, charCode, deleteString, outputNumber, rawNumber)
  //console.log('strippedNumber '+strippedNumber);


  if((charCode === 'Backspace' || charCode === 'Delete') && (isNaN(deletedString) || deletedString === ' ')){
    //console.log('deleted String = '+deletedString);
    outputNumber = rawNumber;
  } else {
    outputNumber = formatPhoneNumber(strippedNumber);
  }
  locUpdate = 1;
  let preString = previousNumber.slice(0,startPos);
  let preStringLen = numbersInString(preString);
  let postString = previousNumber.slice(endPos);
  let postStringLen = numbersInString(postString);
  let charPos = startPos;
  let snLen = strippedNumber.length;
  if(snLen < 3){
    charPos = startPos;
  } else if(snLen === 3) {
    console.log('len = 3')
    if(startPos === 2) {
      console.log('len = 3 and startPos = 2');
      charPos = 3;
    } else if (startPos === 3) {
      console.log('len = 3 and startPos = 3');
      charPos = 5;
    }
  } else if(snLen < 8) {
    if (preStringLen >= 3 && charCode !== 'Backspace') {
      //charPos++;
    }
  } else if (snLen <= 10) {
    if (startPos === 0) {
      console.log('before bracket');
      charPos = 0;
    } else if (preStringLen > 0 && preStringLen <= 3) {
      console.log("in brackets");
      charPos = startPos + 1;
    } else if (preStringLen > 3 && preStringLen <= 6) {
      console.log('in first part');
      charPos = startPos + 4;
    } else {
      console.log('in last part');
      charPos = startPos + 5;
    }
  } else {
    console.log('greater than 10 chars, single');
    charPos = preStringLen;
    if(charCode === 'Backspace' && selectedString.length === 0) {
      console.log('greater than 10 chars, single backspace');
      //charPos--;
    }
  }
  // console.log('pre: '+preString+', post: '+postString);
  // console.log(startPos, endPos);
  // console.log('preStringNonNums '+preStringLen+ ' postStringNonNums '+ postStringLen);
  charsAdded ? charPos++ : null;
  charCode === 'Backspace' && selectedString.length === 0 ? charPos-- : null;
  if (charPos < 0) charPos = 0
  //console.log('outputNumber '+outputNumber);
  numberBox.value = outputNumber;
  setCaretPosition('phone-input', charPos);
  console.log(previousNumber+' to '+outputNumber+'\n'+charCode+'\nsnLen '+snLen+'\ncharPos '+charPos+'\nstartPos '+startPos+'\npreStringLen '+preStringLen);

  return false;
}

// function formatPhoneNumber(strippedNumber, charCode, deletedString, outputNumber, rawNumber) {
function formatPhoneNumber(phoneNumber) {
  const numberBox = document.getElementById('phone-input');
  let strippedNumber = phoneNumber.replace(/[\(\)\s\-]/g, '');
  let outputNumber;
  let locUpdate;
  //console.log(strippedNumber.length);
  if(strippedNumber.length < 3) {
    outputNumber = strippedNumber;
  } else if(strippedNumber.length === 3){
    outputNumber = strippedNumber + '-';
    locUpdate++;
  } else if(strippedNumber.length < 8){
    outputNumber = strippedNumber.slice(0,3)+'-'+strippedNumber.slice(3);
    locUpdate++;
  } else if(strippedNumber.length <= 10) {
    outputNumber = '('+strippedNumber.slice(0,3)+') '+strippedNumber.slice(3,6)+'-'+strippedNumber.slice(6);
    // switch (true) {
    //   case (startPos === 0):
    //     locUpdate = 0;
    //     break;
    //   case (startPos < 4):
    //     locUpdate = 1;
    //     break;
    //   case (startPos < 6):
    //     locUpdate = 2;
    //     break;
    //   case (startPos < 10):
    //     locUpdate = 4;
    //     break;
    //   default:
    //     locUpdate = 5;
    //     break;
    // }
  } else {
    outputNumber = strippedNumber;
  }
  return outputNumber;
}

function nonNumbersInString(str) {
  return str.replace(/\d+/g,"").length;
}

function numbersInString(str) {
  return str.replace(/\D+/g,"").length;
}
//   return outputNumber;
// }

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


function passwordLengthChange(str) {
  const pw = document.getElementById('password-length').childNodes;
  const pwMaxLength = document.getElementById('password-max-length');
  const passwordConfirmationLockIcon = document.getElementById('password-confirmation-lock-icon');
  if (str.length >= 8) {
    for(let item of pw) {
      item.classList.add('succeeded');
    }
    passwordConfirmationLockIcon.classList.add('succeeded');
    if (str.length >= 32) {
      //adjust max length thing
        pwMaxLength.classList.remove('hidden');
        document.getElementById('password-wrapper').classList.add('max-length');
        passwordConfirmationLockIcon.classList.add('max-length');
        passwordConfirmationLockIcon.classList.remove('succeeded');
    } else {
      passwordConfirmationLockIcon.classList.remove('succeeded');
      pwMaxLength.classList.add('hidden');
      document.getElementById('password-wrapper').classList.remove('max-length');
      passwordConfirmationLockIcon.classList.remove('max-length');
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

function passwordLockIconChangeKeyPress(status) {
  // if password is empty and focus exists, first icon
  // if password is empty and focus does not exist, fail
  // if password is inprogress and focus exists, turned lock
  // if password is inprogress and focus does not exist, fail
  // if password is true, success
  const passwordIcon = document.getElementById('password-lock-icon');
  const password = document.getElementById('password-input');
  const passwordSuccess = document.getElementById('password-validation-success');
  const passwordValidationList = document.querySelectorAll('.password-validation');
  const passwordConfirmationLockIcon = document.getElementById('password-confirmation-lock-icon');


  if(status) {
    passwordIcon.classList = 'success';
    password.classList.remove('validation-border-change');
    passwordSuccess.classList = 'disp-block';
    for(let item of passwordValidationList){
      item.classList.remove('disp-block');
      item.classList.add('disp-none');
    }
    passwordConfirmationLockIcon.classList.add('succeeded');
  } else {
    passwordConfirmationLockIcon.classList.remove('succeeded');
    passwordSuccess.classList = 'disp-none';
    for(let item of passwordValidationList){
      item.classList.add('disp-block');
      item.classList.remove('disp-none');
    }
    if (password.value.length === 0){
    passwordIcon.classList = '';
    } else {
      passwordIcon.classList = 'inprogress';
    }
  }
}

function passwordLockIconChangeSelect(event) {
  const passwordIcon = document.getElementById('password-lock-icon');
  const pwClassList = passwordIcon.classList;
  const passwordBorder = document.getElementById('password-input');
  //console.log(pwClassList);
  if(event === 'blur' && pwClassList.value !== 'success') {
    passwordIcon.classList = 'fail';
    passwordBorder.classList.add('validation-border-change');
  } else if(event === 'focus' && pwClassList.value !== 'success') {
    passwordIcon.classList = 'inprogress';
  }
  //console.log(pwClassList);
}
const passwordConfirmationClick = document.getElementById('password-confirmation');

passwordConfirmationClick.addEventListener('focus', () => {
  passwordConfirmationFocus();
});

passwordConfirmationClick.addEventListener('blur', () => {
  passwordConfirmationBlur();
});

passwordConfirmationClick.addEventListener('keyup', passwordValidate);

function passwordConfirmationFocus(){
  const passwordConfirmationIcon = document.getElementById('password-confirmation-lock-icon');
  const passwordConfirmationError = document.getElementById('password-confirmation-error');
  const passwordConfirmation = document.getElementById('password-confirmation');
  passwordConfirmation.classList.remove('validation-border-change');
  if (passwordConfirmationIcon.classList.contains('verif-true')) {
    //do nothing
  } else {
    passwordConfirmationError.classList = 'disp-none';
    passwordConfirmationIcon.classList.remove('verif-false');
  }
}

function passwordConfirmationBlur() {
  const passwordConfirmationIcon = document.getElementById('password-confirmation-lock-icon');
  const passwordConfirmationError = document.getElementById('password-confirmation-error');
  const passwordConfirmation = document.getElementById('password-confirmation');
  if (passwordConfirmationIcon.classList.contains('verif-true') || passwordConfirmation.value.length === 0) {
    
    //do nothing
  } else {
    passwordConfirmation.classList.add('validation-border-change');
    passwordConfirmationIcon.classList.add('verif-false');
    passwordConfirmationError.classList = 'disp-block';
  }
  // if(passwo)
}

function passwordValidate(e) {
  const passwordInput = document.getElementById('password-input');
  const passwordConfirmation = document.getElementById('password-confirmation');
  const passwordContents = passwordInput.value;
  const passwordConfirmationIcon = document.getElementById('password-confirmation-lock-icon');
  const passwordConfirmationError = document.getElementById('password-confirmation-error');
  console.log('passwordValidate');
  console.log(passwordContents, passwordConfirmation.value);
  //console.log(e);
  //console.log(e.srcElement);
  // console.log(e.srcElement.id);
  const sourceElement = e.srcElement.id;
  if (sourceElement === 'password-input'){
    let passwordStatus = {
      len: passwordLengthChange(passwordContents),
      case: passwordCaseChange(passwordContents),
      num: passwordNumChange(passwordContents),
      symbol: passwordSymbolChange(passwordContents),
      maxLen: passwordContents.length >= 32 ? false : true
    }
    let passwordCorrect = true;
    for (let prop in passwordStatus) {
      if (passwordStatus[prop] === false) {
        passwordCorrect = false;
      }
    }
    passwordLockIconChangeKeyPress(passwordCorrect);
    if(passwordCorrect) {
      const passwordWrapper = document.getElementById('password-wrapper');
      passwordWrapper.classList.add('validpw');
      passwordConfirmationIcon.classList.add('validpw');
      //change size of box
    } else {
      passwordWrapper.classList.remove('validpw');
      passwordConfirmationIcon.classList.remove('validpw');
    }
    if (passwordConfirmationIcon.classList.contains('verif-true') || passwordConfirmationIcon.classList.contains('verif-false')){

    }
  } 
  if (passwordConfirmation.value.length > 0 || sourceElement === 'password-confirmation') {
    // if password confirmation box is being used or has been activated
    if(passwordConfirmation.value.length === 0){}
    else if(passwordContents === passwordConfirmation.value) {
      passwordConfirmationIcon.classList.add('verif-true');
      passwordConfirmationIcon.classList.remove('verif-false');
      passwordConfirmationError.classList = 'disp-none';
      passwordConfirmation.classList.remove('validation-border-change');
  } else {
      passwordConfirmationIcon.classList.remove('verif-true');
      // passwordConfirmation.classList.add('validation-border-change');
    }
  }
}

function setCaretPosition(elemId, caretPos) {
  var elem = document.getElementById(elemId);

  if(elem != null) {
      if(elem.createTextRange) {
          var range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
      }
      else {
          if(elem.selectionStart) {
              elem.focus();
              elem.setSelectionRange(caretPos, caretPos);
          }
          else
              elem.focus();
      }
  }
}