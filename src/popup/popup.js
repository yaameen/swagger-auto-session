
document.addEventListener('DOMContentLoaded', function() {


    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        

        var tokenInput = document.getElementById('token')
        var saveButton = document.getElementById('saveButton')


        

        // preset the form with saved values
        useCredentials(function (token) {
            tokenInput.value = token
        })

        registerEventHandlers()

        /**
         * Register the event handlers.
         *
         * @return {void}
         */
        function registerEventHandlers () {
            saveButton.onclick = function () {
                chrome.storage.sync.set({
                    [tablink]: {
                        token: tokenInput.value,
                        path: tablink,
                    }
                })

                window.close()
            }
        }

        /**
         * Use the existing credentials and perform an action with them.
         *
         * @param  {Function} callback
         * @return {void}
         */
        function useCredentials (callback) {
            chrome.storage.sync.get(tablink, function (storage) {
                if (storage[tablink]) {
                    callback(storage[tablink].token, tablink)
                }
            })
        }
    });

})

