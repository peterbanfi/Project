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


var belepesiKiserlet = 0;
var belepve = false;

function ellenoriz() {
    var userName;
    var passUser;


    if (belepesiKiserlet < 3) {
        userName = document.querySelector("#userK").value;
        passUser = document.querySelector("#passK").value;
        document.getElementById("successK").innerHTML = '';
        document.getElementById("errorK").innerHTML = '';
        document.getElementById("error2K").innerHTML = '';

        if (userName == '' || passUser == '') {
            document.getElementById("errorK").innerHTML = "Meg kell adnod a felhasználóneved és jelszavad. "
        } else {
            for (var i in users) {
                if (users[i].email == userName && users[i].password == passUser) {
                    document.getElementById("successK").innerHTML = `Belépve ${users[i].email}`;
                    belepve = true;
                    window.open("adminK.html", "_blank");
                }
            }
            if (belepve == false) {
                document.getElementById("error2K").innerHTML = `Hibás felhasználónév vagy jelszó.`
                document.querySelector("#userK").value = '';
                document.querySelector("#passK").value = '';
                belepesiKiserlet++
                if (belepesiKiserlet == 3) {
                    document.getElementById("error2K").innerHTML = '';
                    document.getElementById("errorK").innerHTML = "HÁromszor is elrontottad az adataidat, 24 órára kitiltottunk."

                }
            }

        }
    } else {
        document.getElementById("error2K").innerHTML = '';
        document.getElementById("errorK").innerHTML = "Háromszor is elrontottad az adataidat, 24 órára kitiltottunk."
    }
}

function remember() {
    var talalt = false;

    if (belepve == false) {
        var email = prompt("Kérm adja meg az e-mail címet:");
        for (var i in users) {
            if (users[i].email == email) {
                alert(`Az új jelszót elküldtük a ${users[i].email} címre`);
                talalt = true;
            }
        }
        if (!talalt) {
            alert(`Nicns ilyen regisztrált felhasználó.`);

        }
    } else {
        alert(`Ön már belépett!`);
    }
}