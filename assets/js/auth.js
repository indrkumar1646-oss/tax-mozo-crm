// Simple auth (localStorage-backed)
document.addEventListener('DOMContentLoaded', ()=>{
  const signup = document.getElementById('signupForm');
  const login = document.getElementById('loginForm');

  if(signup){
    signup.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const users = JSON.parse(localStorage.getItem('tp_users')||'[]');
      users.push({name,email,password});
      localStorage.setItem('tp_users', JSON.stringify(users));
      localStorage.setItem('tp_currentUser', JSON.stringify({name,email}));
      window.location.href = 'dashboard.html';
    });
  }

  if(login){
    login.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const users = JSON.parse(localStorage.getItem('tp_users')||'[]');
      const user = users.find(u=>u.email===email && u.password===password);
      if(user){
        localStorage.setItem('tp_currentUser', JSON.stringify({name:user.name,email:user.email}));
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials. For demo, sign up first.');
      }
    });
  }
});
