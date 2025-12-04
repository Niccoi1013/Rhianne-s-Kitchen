document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.querySelector('.settings-form');
    const saveButton = document.querySelector('.save-button');
    
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    
    if (settingsForm && saveButton) {
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                saveFormData();
                alert('Settings saved successfully!');
            }
        });
    }

    function validateForm() {
        const inputs = document.querySelectorAll('.settings-form .form-group input');
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            const label = input.previousElementSibling ? input.previousElementSibling.textContent : input.name;
            
            if (!value) {
                alert(`${label} is required`);
                isValid = false;
                return;
            }
            
            if (label.includes('First Name') || label.includes('Last Name')) {
                if (!nameRegex.test(value)) {
                    alert(`${label} must contain only letters, spaces, hyphens, or apostrophes`);
                    isValid = false;
                    return;
                }
            }
        });
        
        return isValid;
    }

    function saveFormData() {
        const inputs = document.querySelectorAll('.settings-form .form-group input');
        const userData = {};
        
        inputs.forEach(input => {
            const label = input.previousElementSibling ? input.previousElementSibling.textContent.toLowerCase().replace(/\s+/g, '') : input.name;
            userData[label] = input.value.trim();
        });
        
        localStorage.setItem('userSettings', JSON.stringify(userData));
        updateAccountLink();
    }

    function loadFormData() {
        const savedData = localStorage.getItem('userSettings');
        if (savedData) {
            const userData = JSON.parse(savedData);
            const inputs = document.querySelectorAll('.settings-form .form-group input');
            
            inputs.forEach(input => {
                const label = input.previousElementSibling ? input.previousElementSibling.textContent.toLowerCase().replace(/\s+/g, '') : input.name;
                if (userData[label]) {
                    input.value = userData[label];
                }
            });
        }
    }

    function updateAccountLink() {
        const allAccountLinks = document.querySelectorAll('a[href="../Login/Login.html"]');
        allAccountLinks.forEach(link => {
            link.href = '../Settings/Settings.html';
            link.textContent = 'Account';
        });
    }

    loadFormData();
    
    const userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
        updateAccountLink();
    }
});
