var isSwaggerPage = document.getElementById('swagger-ui') != undefined

var token

// // get the saved auth credentials
chrome.storage.sync.get(location.href, function (storage) {
    token = storage[location.href].token
})

// // only inject the button to pages
// // which contain the swagger ui
if (isSwaggerPage) {
    waitForElementToDisplay('.btn.authorize', 1000)
}

function waitForElementToDisplay(selector, time) {
    if(document.querySelector(selector)!=null) {
        if(token && token.length > 10) {
            logIn()
        }
        else {
            alert('You might want to save the token to enable autologin! To do so click on the extension icon on the toolbar!')
        }
        return;
    }
    else {
        setTimeout(function() {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}


function logIn () {
    let authBtn = document.querySelector('.btn.authorize');
    var spinner = document.createElement('div')
    spinner.id = 'sal-spinner' 
    authBtn.prepend(spinner)
    if(authBtn) {
        authBtn.click()
        authBtn.nextElementSibling.style.opacity = 0
        setTimeout(() => {
            
            var event = new Event('input', { bubbles: true});
            event.simulated = true;
            var input = document.querySelector('input', '.auth-container')
            input.value = `Bearer ${token}`;
            input.defaultValue = `Bearer ${token}`;
            input.dispatchEvent(event);
            document.querySelector('button[type=submit]', '.auth-container').click()
            document.querySelector('button.btn-done', '.auth-container').click()
            document.querySelector('.btn.authorize span').innerHTML = "Logged In"
            spinner.remove();
        }, 10)

    }
}
