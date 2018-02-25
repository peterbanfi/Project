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
    var userDatas = (JSON.parse(xhttp.responseText))[0].users;
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!



      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    
    var headData = {
        full: ['Azonosító', 'Felhasználónév', 'Jelszó', 'Vezetéknév', 'Keresztnév', 
        'Ország', 'Állam/Megye', 'Irányítószám', 'Város', 'Cím', 'Nem', 'Születési dátum', 
        'Email cím', 'Telefonszám'],
        b1990: ['Felhasználónév'],
        names: ['Vezetéknév', 'Keresztnév'],
        oldest: ['Vezetéknév', 'Keresztnév', 'Születési dátum'],
        city: ['Város', 'Felhasznlóink közül lakosok:'],
        b2000: ['Vezetéknév', 'Keresztnév', 'Felhasználónév', 'Születési dátum', 'Email cím', 'Telefonszám'], 
    };

    var dataProp = {
        full: ['id', 'username', 'password', 'firstname', 'lastname', 'country', 
        'state', 'zipcode', 'city', 'address', 'sex', 'birthdate', 'email', 'phone'],
        b1990: ['username'],
        names: ['firstname', 'lastname',],
        oldest: ['firstname', 'lastname', 'birthdate'],
        city: ['city', 'users'],
        b2000: ['firstname', 'lastname', 'username', 'birthdate', 'email', 'phone']
    };        

    //   console.log(dataProp);
    //  console.log(headData);

    createTable(userDatas,headData.full, dataProp.full);
    writeStat(userDatas);
    //console.log(document.getElementById("1990"));
    document.getElementById("full").addEventListener("click", function(){createTable(userDatas, headData.full, dataProp.full);});
    document.getElementById("1990").addEventListener("click", function(){createTable(sort1900(userDatas), headData.b1990, dataProp.b1990);});
    document.getElementById("oldests").addEventListener("click", function(){createTable(sortbyAge(addAge(userDatas)), headData.oldest, dataProp.oldest);});
    document.getElementById("names").addEventListener("click", function(){createTable(showNames(userDatas), headData.names, dataProp.names);});
    document.getElementById("city").addEventListener("click", function(){createTable(showCity(userDatas), headData.city, dataProp.city);});
    document.getElementById("2000").addEventListener("click", function(){createTable(show2000(userDatas), headData.b2000, dataProp.b2000);});

}



function sort1900(userData) {
    newUserData = [];
    var birthDate; 
    for (var i = 0; i < userData.length; i++) {
        birthDate = new Date(userData[i].birthdate);
        if (birthDate.getFullYear() < 1990){
            newUserData.push(userData[i]);
        }
    }
    return newUserData;
}

/*function showOldest(userData) {
    var newData = userData.slice();
    //console.log(newData);
    var birthDate1, birthDate2, temp; 
    for (var i = 0; i < newData.length; i++) {
        birthDate1 = new Date(newData[i].birthdate);
        for (var j = 1; j < newData.length; j++) {
            birthDate2 = new Date(newData[j].birthdate);
            console.log(birthDate2);
            if (birthDate1.getFullYear() < birthDate2.getFullYear() ) {
                temp = newData[j];
                newData[j] = newData[i];
                newData[i] = temp;
            }
        }
    }
    console.log(newData);
    return newData;
}*/


function addAge(userData) {
    var birthdate, months, age;
    var newData = userData.slice();
    var today = new Date();
    for (var i=0; i< userData.length; i++) {
            birthdate = new Date(userData[i].birthdate);
            age = today.getFullYear() - birthdate.getFullYear();
            if (age > 0 && age < 110) {
                months = today.getMonth() - birthdate.getMonth();
                if (months < 0) { 
                    age -=1;
                }
                newData[i].age = age;
            }
        }
return newData;
console.log(newData);
}

function sortbyAge(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 1; j < data.length; j++) {
            if (data[i].age > data[j].age ) {
                temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
        }
    }
    data = data.slice(0,3);
    //console.log(data);
    return data;
}

function showNames(userData) {
    newUserData = [];
    var birthDate; 
    for (var i = 0; i < userData.length; i++) {
        birthDate = new Date(userData[i].birthdate);
        if (birthDate.getFullYear() < 2000 && birthDate.getFullYear() > 1900 &&  userData[i].state !== ""){
            newUserData.push(userData[i]);
        }
    }
    return  sortByName(newUserData);
}

function sortByName(data) {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length; j++) {
        if (data[i].firstname > data[j].firstname) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            } else if (data[i].firstname == data[j].firstname) {
                if (data[i].lastname > data[j].lastname) {
                    temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
    }
    return data;
}

// for cities
function showCity(userData) {
    var cityArr =[]; 
    for (var i = 0; i < userData.length; i++) {
        cityArr.push(userData[i].city);
    }
    cityArr.sort();
    return countCities(cityArr);
}

function countCities(array) {
    var newData = [];
    var temp;
    var moreCities;
    for (var i = 0; i < array.length; i++) {
        moreCities = false;
        var cityObj = {city: "", users: 0};
        for (var j = 1; j < array.length; j++) {
            if (array[i] == array[j]) {
                cityObj.city = array[i];
                cityObj.users ++
                temp = j;
                moreCities = true;
            } else {break;}
            i = temp;
            }
        if (moreCities == true) {
                newData.push(cityObj);
            }
return newData;
    }
}



function show2000(userData) {
    newUserData = [];
    var birthDate; 
    for (var i = 0; i < userData.length; i++) {
        birthDate = new Date(userData[i].birthdate);
        if (birthDate.getFullYear() < 2000 || userData[i].city !== 'Budapest'){
            newUserData.push(userData[i]);
        }
    }
    return newUserData;
}





// generates tabel for all
function generateHead(headData) {
    var tr = document.createElement('tr');
    headData.forEach(function (element) {
        var th = document.createElement('th');
        th.textContent = element;
        tr.appendChild(th);
    });
    return tr;
}

function generateRow(objElement, arrElement) {
    var td = document.createElement('td');
    var element = objElement[arrElement];
    td.textContent = element;
    return td;
}

function removeTable(element) {
    if (element.hasChildNodes()) {
        element.removeChild(element.childNodes[0]);
    }
}

function createTable(userData, head, props) {
    removeTable(document.getElementById('table'));
    document.querySelector('#table').innerHTML = '';
    var table = document.createElement('table');
    table.appendChild(generateHead(head));
    for (var i = 0; i < userData.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < props.length; j++) {
            tr.appendChild(generateRow(userData[i], props[j]));
            table.appendChild(tr);
        }
        document.querySelector('#table').appendChild(table);
    }
}




//for statsistics part:

function searchOldest(userData) {
    var birthDate;
    var firstBirth = new Date(userData[0].birthdate);
    var oldestUser = userData[0];
    for (var i=1; i< userData.length; i++) {
            birthDate = new Date(userData[i].birthdate);
            if (firstBirth > birthDate) {
                firstBirth = birthDate;
                oldestUser = userData[i];
            }
        }
return oldestUser.username +', ' + formatBirthDate(firstBirth);  
}

function searchYoungest(userData) {
    var birthDate;
    var lastBirth = new Date(userData[0].birthdate);
    var youngestUser = userData[0];
    for (var i=1; i< userData.length; i++) {
            birthDate = new Date(userData[i].birthdate);
            if (lastBirth < birthDate) {
                lastBirth = birthDate;
                youngestUser = userData[i];
            }
        }
return youngestUser.username +', ' + formatBirthDate(lastBirth);
}

function formatBirthDate(date) {
var year, month, day;
var monthNames = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 
'augusztus', 'szeptember', 'október', 'november', 'december']
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
return year +'. ' + monthNames[month] +'  '+ day +'.'
} 



function sumAge(userData) {
    var birthdate, months, age;
    var sumAge = 0;
    var today = new Date();
    for (var i=0; i< userData.length; i++) {
            birthdate = new Date(userData[i].birthdate);
            age = today.getFullYear() - birthdate.getFullYear();
            if (age > 0 && age < 110) {
                months = today.getMonth() - birthdate.getMonth();
                if (months < 0) { 
                    age -=1;
                }
                sumAge += age;
                userData.age = age;
            }
        }
return sumAge;
}

function avgAge(userData) {
    return sumAge(userData)/userData.length;
}

function myStatistic(userData) {
    return {
        'A legidősebb ember felhasználóneve, születési ideje': searchOldest(userData),
        'A legfiatalabb ember felhasználóneve, születési ideje': searchYoungest(userData),
        'Átlagéletkor': avgAge(userData),
        'Össz életkor': sumAge(userData),
    }
}

function writeStat(userData) {
    var divElem = document.getElementById('stat');
    var stat = myStatistic(userData);
   //console.log(stat);
    for (var i in stat) {
        var pElem = document.createElement('p');
        pElem.textContent = `${i}:`
        var spanElem = document.createElement('span'); 
        spanElem.textContent = ` ${stat[i]}`;
        pElem.appendChild(spanElem);
    divElem.appendChild(pElem);
    }
}



getData('js/adminK/users.json', successAjax);
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */