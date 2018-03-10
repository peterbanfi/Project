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
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createTable(userDatas);
    bday(userDatas);
    document.getElementById('bN').addEventListener("click", function () {
        beforeNinety(userDatas);
    });
    document.getElementById('tO').addEventListener("click", function () {
        threeOldest(userDatas);
    });
    document.getElementById('s').addEventListener("click", function () {
        sort(userDatas);
    });
    document.getElementById('cOA').addEventListener("click", function () {
        cities(userDatas);
    });
    document.getElementById('y2k').addEventListener("click", function () {
        beforeY2K(userDatas);
    });
    document.getElementById('sort').addEventListener("click", function () {
        stat(userDatas);
    });
    document.getElementById('reset').addEventListener("click", function () {
        createTable(userDatas);
    });

}

getData('JS/adminP/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function bday(data) {
    var bdays = [];
    for (var i in data) {
        bdays.push(parseInt(data[i].birthdate.slice(0, 4)));
    }
    bdays.sort(function (a, b) {
        return a - b;
    });
}
//1990 előt születtek
function beforeNinety(data) {
    var elders = data.filter(function (i) {
        var bday = new Date(i.birthdate);
        if (bday.getFullYear() < 1990) {
            return true;
        }
        return false;
    });
    tableBnHead();
    tableBnCon(elders);
}
//Fejléc a 90 előtt szülötteknek
function tableBnHead() {
    var tableHead = '';
    tableHead += `
    <tr>
        <td>Felhasználónév</td>
    </tr>`
    tableHead += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = tableHead;
}
//username a 90 előtt szülötteknek
function tableBnCon(elders) {
    var table = '';
    for (var i = 0; i < elders.length; i++) {
        table += `
        <tr>
             <td>${elders[i].username}</td>
        </tr>`;
    }
    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
}
//tO
var evek = [];
var honapok = [];
var napok = [];

function threeOldest(data) {
    var elders = data.filter(function (i) {
        var bday = new Date(i.birthdate);
        var year = bday.getFullYear();
        var month = bday.getMonth();
        switch (month) {
            case 0:
                honapok.push("Január");
                break;
            case 1:
                honapok.push("Február");
                break;
            case 2:
                honapok.push("Március");
                break;
            case 3:
                honapok.push("Április");
                break;
            case 4:
                honapok.push("Május");
                break;
            case 5:
                honapok.push("Június");
                break;
            case 6:
                honapok.push("Július");
                break;
            case 7:
                honapok.push("Augusztus");
                break;
            case 8:
                honapok.push("Szeptember");
                break;
            case 9:
                honapok.push("Október");
                break;
            case 10:
                honapok.push("November");
                break;
            case 11:
                honapok.push("December");
                break;
            default:
        }
        var day = bday.getDay();
        evek.push(year);
        napok.push(day);
    });
    evek.sort(function (a, b) {
        return a - b
    });
    tabletOHead()
    tabletOCon(data)
}
//Fejléc a tO-nak
function tabletOHead() {
    var tableHead = '';
    tableHead += `
    <tr>
        <td>Vezetéknév</td>
        <td>Keresztnév</td>
        <td>Születési dátum</td>
    </tr>`
    tableHead += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = tableHead;
}
// content a tO-nak
function tabletOCon(userDatas) {
    var table = '';
    for (var i = 0; i < 3; i++) {
        table += `
        <tr>
        <td>${userDatas[i].firstname}</td>
        <td>${userDatas[i].lastname}</td>
        <td>${evek[i]} ${honapok[i]} ${napok[i]}</td>
        </tr>`;
    }
    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
}
//Szűrt nevek
function sort(data) {
    var temp;
    var first;
    var second;
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            first = data[i].firstname;
            second = data[j].firstname;
            if (first > second) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    createHead()
    createTable(data);
}
//Minden város neve, amelyben legalább ketten laknak, és mellette a lakosok száma
function cities(data) {
    var cities = [];
    var count = 0;
    var theCity = '';
    for (var i in data) {
        cities.push(data[i].city);
    }
    for (var i in cities) {
        var l = 0;
        if (cities[i] === data[l].city) {
            count++
            l = l + 1;
        }
        theCity = cities[i];
    }

    var tableHead = '';
    tableHead += `
    <tr>
        <td>Városok</td>
        <td>Lakosok száma</td>
    </tr>`
    tableHead += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = tableHead;

    var table = '';
    table += `
        <tr>
             <td>${theCity}</td>
             <td>${count}</td>
        </tr>`;
    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
}
//Minden 2000 előtt született felhasználó, vagy nem Budapesti felhasználó vezeték-, kereszt- és felhasználóneve, email címe, telefonszáma. 
function beforeY2K(data) {
    var elders = data.filter(function (i) {
        var bday = new Date(i.birthdate);
        if (bday.getFullYear() < 2000 || data.city != 'Budapest') {
            return true;
        }
        return false;
    });
    tableY2KHead()
    tableY2KCon(elders)
}
//Fejléc y2k
function tableY2KHead() {
    var tableHead = '';
    tableHead += `
    <tr>
        <td>Vezetéknév</td>
        <td>Keresztnév</td>
        <td>Felhasználónév</td>
        <td>Email cím</td>
        <td>Telefonszám</td>
    </tr>`
    tableHead += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = tableHead;
}
//content y2k
function tableY2KCon(elders) {
    var table = '';
    for (var i = 0; i < elders.length; i++) {
        table += `
        <tr>
             <td>${elders[i].firstname}</td>
             <td>${elders[i].lastname}</td>
             <td>${elders[i].username}</td>
             <td>${elders[i].email}</td>
             <td>${elders[i].phone}</td>
        </tr>`;
    }
    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
}
//kiír minden contentet
function createTable(userDatas) {
    var table = '';
    for (var i = 0; i < userDatas.length; i++) {
        table += `

        <tr>
             <td>${userDatas[i].id}</td>
             <td>${userDatas[i].username}</td>
             <td>${userDatas[i].password}</td>
             <td>${userDatas[i].firstname}</td>
             <td>${userDatas[i].lastname}</td>
             <td>${userDatas[i].country}</td>
             <td>${userDatas[i].state}</td>
             <td>${userDatas[i].zipcode}</td>
             <td>${userDatas[i].city}</td>
             <td>${userDatas[i].address}</td>
             <td>${userDatas[i].sex}</td>
             <td>${userDatas[i].birthdate}</td>
             <td>${userDatas[i].email}</td>
             <td>${userDatas[i].phone}</td>
        </tr>`;

    }

    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
    createHead()
}
//kód a fejléchez
function createHead() {
    var tableHead = '';
    tableHead += `

    <tr>
        <td>Azonosító</td>
        <td>Felhasználónév</td>
        <td>Jelszó</td>
        <td>Vezetéknév</td>
        <td>Keresztnév</td>
        <td>Ország</td>
        <td>Állam / Megye</td>
        <td>Irányítószám</td>
        <td>Város</td>
        <td>Cím</td>
        <td>Nem</td>
        <td>Születési dátum</td>
        <td>E-mail cím</td>
        <td>Telefonszám</td>
    </tr>`

    tableHead += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = tableHead;
}
//statisztikai adatok
function stat(userDatas) {
    var date = new Date();
    var yearNow = date.getFullYear();
    var ossz = 0;
    document.getElementById("statsStyle").style.border = "1px solid #ffffff";
    userDatas.sort(function (first, second) {
        var korF = new Date(first.birthdate);
        var korS = new Date(second.birthdate);
        return korF - korS;
    });
    for (var i in userDatas) {
        kor = new Date(userDatas[i].birthdate);
        ossz += date.getFullYear() - kor.getFullYear();
    }
    var avg = ossz / userDatas.length;
    document.getElementById('first').innerHTML = `A legidősebb: ${userDatas[0].username}, ${userDatas[0].birthdate}`;
    document.getElementById('second').innerHTML = `A legfiatalabb: ${userDatas[userDatas.length - 1].username}, ${userDatas[userDatas.length - 1].birthdate}`;
    document.getElementById('third').innerHTML = `Az össz életkor: ${ossz}`;
    document.getElementById('fourth').innerHTML = `Az átlag életkor: ${avg}`;
}