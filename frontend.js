let token = '';

function display(data) {
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}

function register() {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json())
  .then(data => display(data))
  .catch(err => console.error(err));
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      display({ message: 'Login successful', token });
    } else {
      display(data);
    }
  })
  .catch(err => console.error(err));
}

function getMe() {
  fetch('http://localhost:3000/me', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => display(data));
}

function getStats() {
  fetch('http://localhost:3000/stats', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => display(data));
}

function getProfile() {
  fetch('http://localhost:3000/profile', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => display(data));
}

function getPreferences() {
  fetch('http://localhost:3000/preferences', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => display(data));
}
