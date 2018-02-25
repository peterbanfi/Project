var users = [{
        email: 'baratheon@got.com',
        password: 'baratheon'
    },
    {
        email: 'bolton@got.com',
        password: 'bolton'
    },
    {
        email: 'florent@got.com',
        password: 'florent'
    },
    {
        email: 'lennister@got.com',
        password: 'lennister'
    },
    {
        email: 'martell@got.com',
        password: 'martell'
    },
    {
        email: 'redwyne@got.com',
        password: 'redwyne'
    },
    {
        email: 'stark@got.com',
        password: 'stark'
    },
    {
        email: 'umber@got.com',
        password: 'umber'
    },
    {
        email: 'tully@got.com',
        password: 'tully'
    },
    {
        email: 'targaryen@got.com',
        password: 'targaryen'
    }
];


var button = document.querySelector('#button').value;

var userName = document.querySelector('#userName').value;

var password = document.querySelector('#password').value;

var error = "Meg kell adnod a felhasználóneved és jelszavad!";

var forgot = document.querySelector('#forgotPassword');

var attempt = 0;

button.addEventListener('click', function () {
    if (userName == 0 || password == 0) {
        document.querySelector('#error').innerHTML = error;
    } else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === userName && users[i].password === password) {
                document.querySelector('#success').innerHTML = "Belépve: " + user[i].email;
                window.location.href = 'adminR.html';
            } else if (attempt > 4) {
                document.querySelector('#error').innerHTML = "Háromszor is elrontottad az adataidat, 24 órára kitiltottunk!"
                button.disabled = true;
            } else {
                error.innerHTML = "Hibás felhasználónév vagy jelszó";
                attempt++;
            }
        }
    }
});

forgot.addEventListener('click', function () {
    var prompt = prompt('Adja meg e-mail címét');
    if (prompt != "" && users.indexof(prompt) > -1) {
        alert('Az új jelszó el lett küldve az e-mail címére');
    } else {
        alert('Nincs ilyen regisztrált felhasználó!');
    }
});