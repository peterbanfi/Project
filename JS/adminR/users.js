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
    userDatas = userDatas[0].users;



    createTable(userDatas);

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

getData('/js/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// th-k generálása

function generateHeaders(userDatas, headerData) {
    var tr = document.createElement('tr');
    headerData.forEach(function (element) {
        var th = document.createElement('th');
        th.textContent = element;
        tr.appendChild(th);
    });
    return tr;
}

// egy td legenerálása

function createTd(objElement, arrElement) {
    var td = document.createElement('td');
    var element = objElement[arrElement];
    if (arrElement == '') {
        td.textContent = 'nincs adat';
    } else {
        td.textContent = element;
    }
    return td;
}

// táblázat legenerálása

function createTable(userDatas) {
    document.querySelector('body').innerHTML = '';
    var theadDatas = ["id", "username", "password", "firstname", "lastname", "country", "state", "zipcode", "city", "address", "sex", "birthdate", "email", "phone"];
    var table = document.createElement('table');
    table.appendChild(generateHeaders(userDatas, theadDatas));
    for (var i = 0; i < userDatas.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < theadDatas.length; i++) {
            tr.appendChild(createTd(userDatas[i], theadDatas[j]));
            table.appendChild(tr);
        }
        document.querySelector('body').appendChild(table);
    }
}