function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText)
    userDatas = userDatas[0].users;

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!
    
      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createHead(head, icons);
    createContent(userDatas, headline);
    stat(userDatas);
    $('input').animate({
        height: '40px',
        width: '10%',
        margin: '1%'
    }, 6500);
    $('p').animate({
        fontSize: '30px',
        width: '50%',
        marginLeft: '25%'
    }, 3000);
    $('table').slideDown(1000);
    $('form').fadeIn(5000);

    document.querySelectorAll('input')[0].addEventListener('click', function () {
        button1(userDatas)
    });
    document.querySelectorAll('input')[1].addEventListener('click', function () {
        button2(userDatas)
    });
    document.querySelectorAll('input')[2].addEventListener('click', function () {
        button3(userDatas)
    });
    document.querySelectorAll('input')[3].addEventListener('click', function () {
        button4(userDatas)
    });
    document.querySelectorAll('input')[4].addEventListener('click', function () {
        button5(userDatas)
    });
}

getData('js/adminO/js/users.json', successAjax);
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
var head = ["Azonosító", "Felhasználónév", "Jelszó", "Vezetéknév", "Keresztnév", "Ország", "Állam/Megye",
    "Irányítószám", "Város", "Cím", "Nem", "Születési dátum", "Email cím", "Telefonszám"
];
var headline = ["id", "username", "password", "firstname", "lastname", "country", "state", "zipcode",
    "city", "address", "sex", "birthdate", "email", "phone"
];
var icons = ["recent_actors", "perm_identity", "vpn_key", "donut_large", "donut_small", "room", "gps_fixed", "gps_not_fixed",
    "business", "home", "face", "date_range", "contact_mail", "contact_phone"
];

function createHead(headdata, icons) {
    var th;
    for (var i in headdata) {
        th = document.createElement('th');
        th.innerHTML = `<i class="material-icons">${icons[i]}</i><br>` + headdata[i];
        document.querySelector('thead').appendChild(th);
    }
    $('th').animate({
        opacity: 1
    }, 1500);
}

function createContent(data, headline) {
    var tr;
    var td;
    for (var i = 0; i < data.length; i++) {
        tr = document.createElement('tr');
        document.querySelector('tbody').appendChild(tr);
        for (var j in headline) {
            td = document.createElement('td');
            td.textContent = data[i][headline[j]];
            tr.appendChild(td);
        }

    }

}

function resetTable() {
    document.querySelector('thead').innerHTML = '';
    document.querySelector('tbody').innerHTML = '';
}

function button1(data) {
    resetTable();
    var head1 = ["Felhasználónév"];
    var headline1 = ["username"];
    var icon = ["perm_identity"];
    var fiatal = data.filter(function (item) {
        var date1 = new Date(item.birthdate);
        if (date1.getFullYear() < 1990) {
            return true;
        }
        return false;

    });
    createHead(head1, icon);
    createContent(fiatal, headline1);
}

function button2(data) {
    resetTable();
    var head1 = ["Vezetéknév", "Keresztnév", "Születési dátum"];
    var headline1 = ["firstname", "lastname", "birthdate"];
    var icon = ["donut_large", "donut_small", "date_range"];
    data.sort(function (a, b) {
        var date1 = new Date(a.birthdate);
        var date2 = new Date(b.birthdate);
        return date2 - date1;
    });
    data = data.filter(function (item, index) {
        if (index < 3) {
            return true;
        }
        return false;
    })
    createHead(head1, icon);
    createContent(data, headline1);
}

function button3(data) {
    resetTable();
    var head1 = ["Vezetéknév", "Keresztnév"];
    var headline1 = ["firstname", "lastname"];
    var icon = ["donut_large", "donut_small"];
    data = data.filter(function (item) {
        var date1 = new Date(item.birthdate);
        if (date1.getFullYear() >= 1990 && date1.getFullYear() <= 2000 && item.sex == "férfi" && item.city == "Budapest" && item.state != "") {
            return true;
        }
        return false;
    });
    data = data.sort(function (a, b) {
        if (a.lastname > b.lastname) {
            return 1;
        }
        return -1;
    });
    data = data.sort(function (a, b) {
        if (a.firstname > b.firstname) {
            return 1;
        }
        return -1;
    });
    createHead(head1, icon);
    createContent(data, headline1);
}

function button4(data) {
    resetTable();
    var head1 = ["Város", "Lakosok"];
    var headline1 = ["city", "lakos"];
    var icon = ["business", "accessibility"];
    var data1 = [];
    var datavaros = [];
    for (var i in data) {
        if (!data1.includes(data[i].city)) {
            data1.push(data[i].city);
            datavaros.push({
                city: data[i].city,
                lakos: 0
            });
        }
        for (var j in datavaros) {
            if (datavaros[j].city == data[i].city) {
                datavaros[j].lakos++;
            }
        }
    }
    createHead(head1, icon);
    createContent(datavaros, headline1);
}

function button5(data) {
    resetTable();
    var head1 = ["Vezetéknév", "Keresztnév", "Felhasználónév", "E-mail cím", "Telefonszám"];
    var headline1 = ["firstname", "lastname", "username", "email", "phone"];
    var icon = ["donut_large", "donut_small", "perm_identity", "contact_mail", "contact_phone"];
    data = data.filter(function (item) {
        var date1 = new Date(item.birthdate);
        if (date1.getFullYear() < 2000 || item.city != "Budapest") {
            return true;
        }
        return false;

    });
    createHead(head1, icon);
    createContent(data, headline1);
}

function stat(data) {
    var text = document.createElement('p');
    var sum = 0;
    var now = new Date();
    data.sort(function (a, b) {
        var date1 = new Date(a.birthdate);
        var date2 = new Date(b.birthdate);
        return date1 - date2;
    });
    for (var i in data) {
        date1 = new Date(data[i].birthdate);
        sum += now.getFullYear() - date1.getFullYear();
    }
    legido = data[0];
    legfia = data[data.length - 1];
    var avg = Math.round((sum / data.length * 100)) / 100;
    text.innerHTML = `A legidősebb: ${legido.username} Születési idő:  ${legido.birthdate} <br>
                    A legfiatalabb: ${legfia.username} Születési idő:  ${legfia.birthdate} <br>
                    Átlagéletkor: ${avg} <br>
                    Összegzett életkor: ${sum}
    `;
    document.querySelector('#stat').appendChild(text);
}
/* 	A legidősebb ember felhasználóneve, mellé a dátum a következő formában: 1990. március 10.
	A legfiatalabb ember felhasználóneve mellé a dátum a következő formában: 1990. március 10.
	Az átlagéletkort két tizedes jegyre kerekítve.
	Az összegzett életkort. */