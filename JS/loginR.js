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


setTimeout(function () {
    $('#loginR').modal('show')
}, 2000);

checkIn();

let loginAttempt = 0;

function checkIn() {

    $('.btn').click(function () {
        let email = $('#userName').val();
        let pass = $('#password').val();
        //let findEmail = users[k].email;
        //let foundPassword = users[k].password;


        if (email == '' || pass == '') {

            $('.btn').before('<span id="error" style="color:red">Meg kell adnod a felhasználóneved és jelszavad</span>');
        }


        let found = users.find(function (elem) {
            return elem.email === email && elem.password === pass;

        });
        (users[k])

        for (let k in users) {

            if (!found && loginAttempts < 4) {
                loginAttempt += 1;
                $('.btn').before('<span id="error" style="color:red">Hibás felhasználónév vagy jelszó</span>');
                //$('#error').after(`Próbálkozások száma: ${loginAttempt}`); //document.querySelector(''#error).innerHTML = `Próbálkozások száma: ${loginAttempt}`;
                $('#error').remove();

            } else if (!found && loginAttempt > 3) {
                $('#error').remove();
                $('.btn').before('<span id="error" style="color:red">Háromszor is elrontottad az adataidat, 24 órára kitiltottunk</span>');
                $('.btn').attr('class', 'disabled');

            } else {
                $('#error').remove();
                $('.btn').before(`<span id="success" style="color:green">Belépve: ${users[i].email}</span>`); //document.querySelector('.form-group').innerHTML = `Belépve: ${users[i].email}`;
                loginAttempt = 0;
                window.location.href = 'adminR.html';
            }

        }
    });
}

/*

function checkIn() {
    $('.btn').click(function () {

        let username = $('#userName').val();
        let password = $('#password').val();
        let spanElem = $('#error').text('');
        let spanElem2 = $('#success').text('');
        //let found = (users[i].email === username && users[i].password === password);
        let loginAttempt = 0;



        if (username == '' || password == '') {

            $('.btn').before('<span id="error" style="color:red">Meg kell adnod a felhasználóneved és jelszavad</span>');
            // spanElem += 'Meg kell adnod a felhasználóneved és jelszavad';

        } else {
            for (let i = 0; i < users.length; i++) {
                // if (users[i].email !== username && users[i].password !== password) {

                    $('.btn').before('<span id="error" style="color:red">Hibás felhasználónév vagy jelszó</span>'); //létrehozom az error idjú elemet, amit a spanElem változóba mentek el
                    //spanElem += 'Hibás felhasználónév vagy jelszó';
                    $('#error').after(`Próbálkozások száma: ${loginAttempt}`);
                    $('#error').remove();
                    loginAttempt += 1;

                if (!found && loginAttempt > 3) {
                    //spanElem = '';
                    $('#error').remove();
                    // spanElem += 'Háromszor is elrontottad az adataidat, 24 órára kitiltottunk';
                    $('.btn').before('<span id="error" style="color:red">Háromszor is elrontottad az adataidat, 24 órára kitiltottunk</span>');
                    $('.btn').attr('class', 'disabled');
                    //$('.btn').off('click');
                }
                }

                //if (users[i].email === username && users[i].password === password) {
                else if (found) {
                    $('#error').remove();
                    $('.btn').before(`<span id="success" style="color:green">Belépve: ${users[i].email}</span>`);
                    loginAttempt = 0;
                    // spanElem2 += `Belépve: ${users[i].email}`;
                    //window.open("adminR.html");
                }
            }
        }
    });
}
*/

$('#forgot').click(function () {
    let email = prompt('Kérem, adja meg e-mail címét: ');

    for (let k in users) {
        let found = users.find(function (elem) {
            return elem.email === email;
        });
        if (!found) {
            alert('Nincs ilyen regisztrált felhasználó');
            break;
        } else {
            alert(`Az új jelszót elküldtük a ${users[k].email} címre`);
            break;
        }

    }
});