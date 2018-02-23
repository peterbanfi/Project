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
    console.log(typeof userDatas.birthday);
}

getData('JS/adminP/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

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
             <td>${userDatas[i].birthday}</td>
             <td>${userDatas[i].email}</td>
             <td>${userDatas[i].phone}</td>
        </tr>`;

    }

    table += '</tbody>';
    document.querySelector('#tablazat').innerHTML = table;
    createHead()
}

function createHead() {
    var table = '';
    table += `

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

    table += '</thead>';
    document.querySelector('#tablazatHead').innerHTML = table;
}
//<td>${jsonContent[i]["FIFA ranking"]} </td>