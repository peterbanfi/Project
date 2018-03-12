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
var proba = 0;

function login() {
    document.querySelector('#Oerror').innerHTML = '';
    document.querySelector('#user').innerHTML = '';
    var user = document.querySelector('#user').value;
    var pass = document.querySelector('#pass').value;
    if ((user == '' || pass == '') && proba <= 3) {
        document.querySelector('#Oerror').innerHTML = 'Meg kell adnod a felhasználóneved és jelszavad.';

    } else if (proba <= 3) {
        var talalat = false;
        for (var i in users) {
            if (users[i].email == user && users[i].password == pass) {
                var talalat = true;
                document.querySelector('#Osuccess').innerHTML = `Belépve: ${users[i].email}`;
                window.location.href = 'adminO.html';
            }
        }
        if (!talalat) {
            document.querySelector('#Oerror').innerHTML = 'Hibás felhasználónév vagy jelszó.';
            proba++;
        }
        if (proba >= 3) {
            document.querySelector('#Osuccess').innerHTML = '';
            document.querySelector('#Oerror').innerHTML = 'Háromszor is elrontottad az adataidat, 24 órára kitiltottunk.';
        }
    }
}

function forgot() {
    var email = prompt('Add emg az e-mail címedet!');
    for (var i in users) {
        if (users[i].email == email) {
            alert(`Új jelszó el lett küldve az email címre: ${email}`);
        }
    }

}