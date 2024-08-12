document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');    
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    function clearForm(){
        email='';
    }
    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm();

    })
    email.addEventListener('blur', function(){
        clearError(emailError);
    })
    password.addEventListener('change', function(){
        clearError(passwordError);
    })
    confirmPassword.addEventListener('change', function(){
        clearError(confirmPasswordError);
    })
    showHideButton.addEventListener('click', function(){
        if(password.type=='password'){
            password.type='text';
            confirmPassword.type='text';
        }else{
            password.type='password';
            confirmPassword.type='password';
        }
    })
    function validateForm(){
        const isValidateEmail = validateEmail();
        const isValidatePassword = validatePassword();
        const isMatchPassword = validatePasswordMatch();
        if(isValidateEmail && isValidatePassword && isMatchPassword){
            saveToLocalStorage();
            alert(' registrado  con exito');
            clearError(emailError);
            clearError(passwordError);
            clearError(confirmPasswordError);
           // clearForm();
        }
    }
    function validateEmail(){
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = email.value.trim();
        if(!emailRegex.test(emailValue)){
            showError(emailError, 'Ingresa un email valido');
            return false;
        }
        return true;
    }
    function validatePassword(){
        const passwordValue = password.value.trim();
        if(passwordValue.length<6){
            showError(passwordError,'ingresa un pass mayor a 6 caracteres');
            return false;
        }
        return true;
    }
    function validatePasswordMatch(){
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'los password no son iguales');
            return false;

        }
        return true;
    }

    function showError(errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display ='block';
    }
    function clearError(errorElement){
        errorElement.innerHTML = '';
        errorElement.style.display ='none';
    }

    function saveToLocalStorage(){
        const emailValue = email.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }
    function bodyBuilderJSON(){
        return{
            "email": email.value,
            "password": password.value
        }
    }



})