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
    item.classList.add('visible');
  }
  emailValidate();
});

emailClick.addEventListener('blur', () => {
  for (let item of emailFocus) {
    item.classList.remove('visible');
  }
  emailValidate();
});

const phoneClick = document.getElementById('phone-input');
const phoneFocus = document.querySelectorAll('.phone');

phoneClick.addEventListener('focus', () => {
  for (let item of phoneFocus) {
    item.classList.add('visible');
  }
  phoneValidate();
});

phoneClick.addEventListener('blur', () => {
  for (let item of phoneFocus) {
    item.classList.remove('visible');
  }
  const numberBox = document.getElementById('phone-input');
  numberBox.value = formatPhoneNumber(numberBox.value);
  phoneValidate();
});

const passwordClick = document.getElementById('password-input');
const passwordFocus = document.querySelectorAll('.password.popup');
const passwordHidden = document.getElementById('password-hidden');
const passwordWrapper = document.getElementById('password-wrapper');
const passwordFirstClick = document.querySelectorAll('.first-click');

passwordClick.addEventListener('focus', e => {
  for (let item of passwordFocus) {
    item.classList.add('visible');
  }
  if(!passwordWrapper.classList.contains('expanded')){
    passwordWrapper.classList.add('expanded');
  }
  passwordLockIconChangeSelect(e.type);
  const passwordConfirmation = document.getElementById('password-confirmation');
  if(passwordConfirmation.value.length > 0) {
    passwordConfirmationFocus();
  }
});

passwordWrapper.addEventListener('transitionend', () => {
  passwordHidden.classList.add('visible');
})

passwordClick.addEventListener('blur', e => {
  for (let item of passwordFocus) {
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

});

passwordClick.addEventListener('keyup', e => {
  passwordValidate(e);
});

function emailValidate() {
  const email = document.getElementById('email-input');
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,256})+$/
  if((email.value === '') || (email === document.activeElement)) {
    changeEmailStatus('verif-none');
  } else if(email.value.match(mailFormat)) {
    changeEmailStatus('verif-true');
  } else {
    changeEmailStatus('verif-false');
  }

}

function changeEmailStatus(status) {
  document.querySelector('#email-validation-icon').className = 'validation-icon '+ status;
  const emailInput = document.querySelector('#email-input');
  const emailError = document.querySelector('#email-error');
  if(status === 'verif-false') {
    emailInput.classList.add('validation-border-change');
    emailError.classList.add('visible');
  } else {
    emailInput.classList.remove('validation-border-change');
    emailError.classList.remove('visible');
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
  isNumberKeyNew(e);
  // this function can be re-factored considerably. An issue I had which 
  // I'm sure could be solved is that I wasn't sure how to limit inputs to just numbers
  // without having the event listener be directly in the HTML. If I would've been capable of doing this,
  // this function would probably look much different.

  // Identify whether characters are being added or subtracted or just moved
  let charCode = e.key;
  let pn = {};
  //console.log(charCode);
  const numberBox = document.getElementById('phone-input');
  pn.startPos = numberBox.selectionStart;
  pn.endPos = numberBox.selectionEnd;
  pn.charPos = pn.startPos;
  pn.previousNumber = numberBox.value;
  pn.rawNumber = numberBox.value;
  pn.charCode = charCode;
  pn.selectedString = pn.rawNumber.slice(pn.startPos,pn.endPos);
  pn.startPosRaw = numbersInStringLength(pn.previousNumber.slice(0,pn.startPos));
  pn.endPosRaw = numbersInStringLength(pn.previousNumber.slice(pn.endPos));
  pn.deletedString = null;
  pn.outputNumber = null;
  if(charCode === ' ') return false;
  if(charCode === 'Backspace' || charCode === 'Delete'){
    pn.charsAdded = false;
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown' || charCode === 'Tab'){
    return true;
  } else {
    if((charCode < 10)){
      pn.charsAdded = true;
    } else {
      return false;
    }
  }
  //Handle selected string replacement

  if(pn.selectedString.length > 0) {
    if(pn.charsAdded){
      pn.rawNumber = pn.rawNumber.slice(0, pn.startPos)+charCode+pn.rawNumber.slice(endPos);
    } else {
      pn.rawNumber = pn.rawNumber.replace(pn.selectedString,'');
    }
  } else {
    if(pn.charsAdded === true){
      if(pn.startPos === pn.rawNumber.length){
        pn.rawNumber += charCode;
      } else {
        pn.rawNumber = pn.rawNumber.slice(0,pn.startPos) + charCode + pn.rawNumber.slice(pn.startPos);
      }
    } else if (charCode === 'Backspace') {
      if(pn.startPos !== 0){  
        pn.deletedString = pn.selectedString.length === 0 ? pn.rawNumber.charAt(pn.startPos-1) : pn.selectedString;
        pn.rawNumber = pn.rawNumber.slice(0,pn.startPos-1)+pn.rawNumber.slice(pn.startPos);
      }
    } else if (charCode === 'Delete') {
      if(startPos !== rawNumber.length){
        pn.deletedString = pn.selectedString.length === 0 ? rawNumber.charAt(pn.startPos) : pn.selectedString;
        pn.rawNumber = pn.rawNumber.slice(0,pn.startPos) + pn.rawNumber.slice(pn.startPos+1);
      }
    }
  }
  // Place raw number
  pn.strippedNumber = pn.rawNumber.replace(/[\(\)\s\-]/g, '');

  if((pn.charCode === 'Backspace' || pn.charCode === 'Delete') && (isNaN(pn.deletedString) || pn.deletedString === ' ')){
    //console.log('deleted String = '+pn.deletedString);
    pn.outputNumber = pn.rawNumber;
    pn.newCharPos = pn.charPos;
    if(pn.charCode === 'Backspace') pn.newCharPos--;
  } else {
  pn = formatPhoneNumber(pn);
  }
  locUpdate = 1;
  let preString = pn.previousNumber.slice(0,pn.startPos);
  let preStringLen = numbersInStringLength(preString);
  let postString = pn.previousNumber.slice(pn.endPos);
  let postStringLen = numbersInStringLength(postString);
  let charPos = pn.startPos;
  let snLen = pn.strippedNumber.length;
  if(snLen < 3){
    charPos = pn.startPos;
  } else if(snLen === 3) {
    console.log('len = 3')
    if(pn.startPos === 2) {
      console.log('len = 3 and startPos = 2');
      charPos = 3;
    } else if (pn.startPos === 3) {
      console.log('len = 3 and startPos = 3');
      charPos = 5;
    }
  } else if(snLen < 8) {
    if (preStringLen >= 3 && charCode !== 'Backspace') {
    }
  } else if (snLen <= 10) {
    if (pn.startPos === 0) {
      console.log('before bracket');
      charPos = 0;
    } else if (preStringLen > 0 && preStringLen <= 3) {
      console.log("in brackets");
      charPos = pn.startPos + 1;
    } else if (preStringLen > 3 && preStringLen <= 6) {
      console.log('in first part');
      charPos = pn.startPos + 4;
    } else {
      console.log('in last part');
      charPos = pn.startPos + 5;
    }
  } else {
    console.log('greater than 10 chars, single');
    charPos = preStringLen;
    if(charCode === 'Backspace' && pn.selectedString.length === 0) {
      console.log('greater than 10 chars, single backspace');
    }
  }
  //charsAdded ? charPos++ : null;
  charCode === 'Backspace' && pn.selectedString.length === 0 ? charPos-- : null;
  if (charPos < 0) charPos = 0;
  numberBox.value = pn.outputNumber;
  setCaretPosition('phone-input', pn.newCharPos);
  checkFormat(numberBox.value);
  
  //console.log(previousNumber+' to '+pn.outputNumber+'\n'+charCode+'\nsnLen '+snLen+'\ncharPos '+charPos+'\nstartPos '+pn.startPos+'\npreStringLen '+preStringLen);
  //console.log(pn);
  return false;
}

function isNumberKeyNew(e) {
  let charCode = e.key;
  let pn = {};
  //console.log(charCode);
  const numberBox = document.getElementById('phone-input');
  const rawNumber = numberBox.value;

  const currentFormat = checkFormat(rawNumber);
  // handle various inputs. Only allow inputs if they are numbers, navigation keys, or delete or backspace.
  if(charCode === ' ') return false;
  if(charCode === 'Backspace' || charCode === 'Delete'){
    pn.charsAdded = false;
  } else if(charCode === 'ArrowLeft' || charCode === 'ArrowRight' || charCode === 'ArrowUp' || charCode === 'ArrowDown' || charCode === 'Tab'){
    return true;
  } else {
    if((charCode < 10)){
      pn.charsAdded = true;
    } else {
      return false;
    }
  }

  const startPosition = numberBox.selectionStart;
  const rawStartPosition = numbersInStringLength(rawNumber.slice(0,startPosition));
  const endPosition = numberBox.selectionEnd;
  const rawEndPosition = numbersInStringLength(rawNumber.slice(endPosition));
  const selectedString = rawNumber.slice(startPosition,endPosition);

  //Handle selected string replacement
  let newNumber;
  if(selectedString.length > 0) {
    if(pn.charsAdded){
      newNumber = rawNumber.slice(0, startPosition)+charCode+rawNumber.slice(endPosition);
    } else {
      newNumber = rawNumber.replace(selectedString,'');
    }
  } else {
    if(pn.charsAdded === true){
      if(startPosition === rawNumber.length){
        newNumber = rawNumber + charCode;
      } else {
        newNumber = rawNumber.slice(0,startPosition) + charCode + rawNumber.slice(startPosition);
      }
    } else if (charCode === 'Backspace') {
      if(startPosition !== 0){  
        deletedString = selectedString.length === 0 ? rawNumber.charAt(startPosition-1) : selectedString;
        newNumber = rawNumber.slice(0,startPosition-1)+rawNumber.slice(startPosition);
      }
    } else if (charCode === 'Delete') {
      if(startPosition !== rawNumber.length){
        deletedString = selectedString.length === 0 ? rawNumber.charAt(startPosition) : selectedString;
        newNumber = rawNumber.slice(0,startPosition) + rawNumber.slice(startPosition+1);
      }
    }
  }
  const newFormat = checkFormat(newNumber);
  console.log(currentFormat, newFormat);
  numberBox.value = newNumber;
  if(currentFormat === newFormat) {
    let inputAdjustment;
    if(pn.charsAdded) {
      inputAdjustment = 1;
    } else {
      if(charCode === 'Delete') {
        inputAdjustment = 0;
      } else {
        inputAdjustment = -1;
      }
    }
    setCaretPosition('phone-input', startPosition + inputAdjustment);
  } else {
    console.log('format change');
  }
  return false;
};

function checkFormat(phoneNumber) {
  const rawPhoneNumber = numbersInString(phoneNumber);
  const numLength = rawPhoneNumber.length;
  let form = '';
  switch (true) {
    case (numLength <= 2):
      form = 'rawShort';
      break;
    case (numLength <= 7):
      form = 'sevenDigits';
      break;
    case (numLength <= 10):
      form = 'areaCode';
      break;
    case (numLength > 10):
      form = 'rawLong';
      break;
    default: 
    console.log(` error in format detected. phone number is "${rawPhoneNumber}"`);
      break;
  }
  // console.log(form);
  return form;
};

function formatPhoneNumberNew() {
  
}

function formatPhoneNumber(phoneObj) {
  let phoneNumber;
  let charPos = 0;
  let charCode = '';
  let selectedString = 'ph';
  let deletedString = null;
  if(typeof phoneObj === 'object') {
    // console.log('obj');
    phoneNumber = phoneObj.strippedNumber;
    charPos = phoneObj.startPosRaw;
    charCode = phoneObj.charCode;
    selectedString = phoneObj.selectedString;
    deletedString = phoneObj.deletedString;
  } else {
    phoneNumber = phoneObj;
    // console.log('other');
  }
  // const numberBox = document.getElementById('phone-input');
  let strippedNumber = phoneNumber.replace(/[\(\)\s\-]/g, '');
  let outputNumber;
  // let locUpdate;
  if((charCode === 'Backspace' || charCode === 'Delete') && (isNaN(deletedString) || deletedString === ' ')) return phoneNumber;
  if(true){
    if(strippedNumber.length < 3) {
      outputNumber = strippedNumber;
    } else if(strippedNumber.length === 3){
      outputNumber = strippedNumber + '-';
      if (charPos >= 2) {
        charPos = 4;
      }
    } else if(strippedNumber.length < 8){
      outputNumber = strippedNumber.slice(0,3)+'-'+strippedNumber.slice(3);
      if (charPos >= 3) {
        charPos++;
      }
    } else if(strippedNumber.length <= 10) {
      outputNumber = '('+strippedNumber.slice(0,3)+') '+strippedNumber.slice(3,6)+'-'+strippedNumber.slice(6);
      if (charPos <= 2) {
        charPos++;
      } else if (charPos <= 5) {
        charPos+=3;
      } else {
        charPos+=4;
      }
    } else {
      outputNumber = strippedNumber;
    }
  }
  if(charCode === 'Backspace') {
    charPos--;
    if(phoneObj.selectedString.length > 0) charPos++;
    if(phoneObj.strippedNumber.length < 3){
      //thing
    } else if(phoneObj.strippedNumber.length === 3) {
      charPos++;
      if(phoneObj.startPos === 3) {}
      else if(phoneObj.startPos === 4) charPos++;
      else if(phoneObj.startPos === 5) charPos++;
      //remove later
      charPos = phoneObj.startPosRaw-1;
      if(phoneObj.startPos === 5) charPos++;
    } else if(strippedNumber.length < 8) {
      if(phoneObj.startPos <= 3) {
        charPos = phoneObj.startPosRaw-1;
      }
      if (charPos >=2) {
        charPos++;
        if(phoneObj.startPos === 3) {charPos--;}
        charPos = phoneObj.startPosRaw;
      } 
    }else if(strippedNumber.length < 10) {
        charPos = phoneObj.startPos;
        if (charPos <= 2) {
          charPos++;
        } else if (charPos <= 5) {
          charPos+=3;
        } else {
          charPos+=4;
        }
      charPos = phoneObj.startPos-1;
      //  if(phoneObj.startPos === 9)charPos++;
      } else if(strippedNumber.length === 10) {
        charPos = phoneObj.startPos;
        if (charPos === 1 || charPos <= 3 ){
          charPos = charPos;
        } else if (charPos <= 2) {
          charPos++;
        } else if (charPos <= 6) {
          charPos+=2;
        } else {
          charPos+=3;
        }
        //unstructured
      }
    }
  //}
   
  if(typeof phoneObj === 'object'){
    if(phoneObj.charCode !== 'Backspace' && phoneObj.charCode !== 'Delete') {
      charPos++;
    } else {
      //outputNumber = phoneObj.rawNumber;
    }
    if(phoneObj.selectedString.length > 0 && charCode === 'Backspace') charPos++;
    phoneObj.newCharPos = charPos;
    phoneObj.outputNumber = outputNumber;
    phoneObj.strippedNumberLength = strippedNumber.length;
    return phoneObj;
  }
  return outputNumber;
}

function nonNumbersInString(str) {
  return str.replace(/\d+/g,"");
}

function nonNumbersInStringLength(str) {
  return nonNumbersInString(str).length;
}

function numbersInString(str) {
  if (str === undefined) return '';
  return str.replace(/\D+/g,"");
}

function numbersInStringLength(str) {
  return numbersInString(str).length;
}

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
  if(event === 'blur' && pwClassList.value !== 'success') {
    passwordIcon.classList = 'fail';
    passwordBorder.classList.add('validation-border-change');
  } else if(event === 'focus' && pwClassList.value !== 'success') {
    passwordIcon.classList = 'inprogress';
  }
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
}

function passwordValidate(e) {
  const passwordInput = document.getElementById('password-input');
  const passwordConfirmation = document.getElementById('password-confirmation');
  const passwordContents = passwordInput.value;
  const passwordConfirmationIcon = document.getElementById('password-confirmation-lock-icon');
  const passwordConfirmationError = document.getElementById('password-confirmation-error');
  // console.log('passwordValidate');
  // console.log(passwordContents, passwordConfirmation.value);
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