const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.login-form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const passwordToggle = document.getElementById('passwordToggle');

  if (passwordToggle) {
    passwordToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('active');
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      emailInput.focus();
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must contain at least:\n- 1 capital letter\n- 1 lowercase letter\n- 1 number\n- 1 special character (@$!%*?&)\n- Minimum 6 characters');
      passwordInput.focus();
      return;
    }

    alert('Login successful!');
    window.location.href = '../Settings/Settings.html';
  });
});
