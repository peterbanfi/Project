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


// Mi okból használtál tömböket? A későbbiekben nincs szerepük
var count = 0;

function login() {
    var mail = document.getElementById("username").value;
    var code = document.getElementById("password").value;

    if (code == '' || mail == '') {
        document.getElementById("error").innerHTML = 'Meg kell adnod a felhasználóneved és jelszavad!';
    } else {
        for (var i in users) {
            if (users[i].email === mail && users[i].password === code) {
                var zold = document.querySelector('#success');
                zold.style.color = '#00FF55';
                document.getElementById("success").innerHTML = 'Belépve: ' + mail;
                document.getElementById("error").innerHTML = '';
                window.open("adminP.html", "_self");
                break;

            } else if (count == (users.length) * 2) {
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("error").innerHTML = 'Háromszor is elrontottad az adataidat, 24 órára kitiltottunk!';
            } else {

                document.getElementById("error").innerHTML = 'Hibás felhasználónév vagy jelszó!';
                count = count + 1;
            }

        }
    }

}

function forgot() {
    var elfelejtett = prompt('Kérem az e-mail címét!');
    var count = 0;
    for (var i in users) {
        if (elfelejtett === users[i].email) {
            alert('Az új jelszó el lett küldve a megadott e-mail címre!');
            break;
        } else if (count == users.length - 1) {
            alert('Nincs ilyen e-mail az adatbázisban!');

        }
        count = count + 1;
    }
}

function home() {
    window.open("index.html", "_self");
}