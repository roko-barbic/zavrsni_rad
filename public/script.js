class Korisnik{
    constructor(ime, email, zaporka){
        this.ime=ime;
        this.email = email;
        this.zaporka = zaporka;
    }
}
class Lokacija{
    constructor(ime, dvorane){
        this.ime = ime;
        this.dvorane = dvorane;
    }
}

class Ekipa{

    constructor(times, name, IsScedualed){
        this.times = times;
        this.name = name;
        this.IsScedualed = IsScedualed;
    }

    CanPlay(i){
        if (this.times[i]==1)
            {
                return true;
            }
        return false;
    }

    SetTime(time){
        this.times = time;
    }

    CopyEkipa(ekipa){
        this.name = ekipa.name;
        this.times = ekipa.times;
        this.IsScedualed = ekipa.IsScedualed;
    }
    ClearEkipa(){
        this.times=null;
        this.name=null;
        this.IsScedualed= 0;
    }
}

class Dvorana{
    constructor(times, name, location, week){
        this.times = times;
        this.name = name;
        this.location = location;
        this.week = week;
    }
    SetTime(time){
        this.times = time;
    }
    CopyDvorana(dvorana)
    {
        this.times=dvorana.times;
        this.name = dvorana.name;
        this.location = dvorana.location;
    }
    ClearDvorana(){
        this.times=null;
        this.name=null;
        this.location = null;
    }
}

class Utakmica{

    constructor(ekipa1, ekipa2, dvorana, vrijemeInt){
        this.ekipa1 = ekipa1;
        this.ekipa2= ekipa2;
        this.dvorana = dvorana;
        this.VrijemeInt = vrijemeInt;
        this.Vrijeme = "";
        this.VrijemH=0;
    }
    ClearUtakmica(){
        ekipa1.ClearEkipa();
        ekipa2.ClearEkipa();
        dvorana.ClearDvorana();
        Vrijeme = null;
        VrijemeH = 0;
        VrijemeInt = 0;
    }

}

const select1 = document.getElementById('dvorana1');
const select2 = document.getElementById('dvorana2');
const select3 = document.getElementById('dvorana3');
const ekipa1 = new Ekipa([0,0], " ", 0);
const ekipa2 = new Ekipa([0,0], " ", 0);
const ekipa3 = new Ekipa([0,0], " ", 0);
const ekipa4 = new Ekipa([0,0], " ", 0);
const ekipa5 = new Ekipa([0,0], " ", 0);
const ekipa6 = new Ekipa([0,0], " ", 0);
const ekipa7 = new Ekipa([0,0], " ", 0);
const ekipa8 = new Ekipa([0,0], " ", 0);
var ekipa1counter =0;
var ekipa2counter =0;
var ekipa3counter =0;
var ekipa4counter =0;
var ekipa5counter =0;
var ekipa6counter =0;
var ekipa7counter =0;
var ekipa8counter =0;
const ekipe = [];
var dvorane = [];
const utakmice = [];
const a = [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const b = [1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const dvorana1= new Dvorana(a, "Gradski vrt", "Osijek", 22);
const dvorana2=  new Dvorana(b, "Dvorana Zrinjevac", "Osijek", 22);
var noviTurnirId = undefined
//const LOsijek = new Lokacija("Osijek", dvorane);
/*
dvorane.push(dvorana1);
dvorane.push(dvorana2);

for (var i = 0; i<=dvorane.length; i++){
    var opt = document.createElement('option');
    //opt.value = dvorane[i].name.value;
    opt.innerHTML = dvorane[i].name;
    select1.appendChild(opt);
    
}
*/
const selectTjedan = document.getElementById('tjedan');
if(selectTjedan){
    for (let i = 0; i<=53; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        selectTjedan.appendChild(opt);
    }
}

function fetchDvorane(){
    const lokacija = document.getElementById('lokacija').value;
    const tjedan = document.getElementById('tjedan').value;

    if(!lokacija || !tjedan){
        return
    }

    
    fetch(`http://localhost:3000/dvorana/${tjedan}/${lokacija}`).then( (response) =>{
        if(response.status == 200){
            response.json().then(data =>{
                select1.innerHTML = ""
                select2.innerHTML = ""
                select3.innerHTML = ""

                data.forEach(dvorana =>{
                    console.log(dvorana)
                    const opt1 = document.createElement('option');
                    opt1.setAttribute("value", dvorana.ID)
                    opt1.innerHTML = dvorana.name;
                    select1.appendChild(opt1);

                    const opt2 = document.createElement('option');
                    opt2.setAttribute("value", dvorana.ID)
                    opt2.innerHTML = dvorana.name;
                    select2.appendChild(opt2);

                    const opt3 = document.createElement('option');
                    opt3.setAttribute("value", dvorana.ID)
                    opt3.innerHTML = dvorana.name;
                    select3.appendChild(opt3);
            })})
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}

selectTurnir = document.getElementById('turnir');
function fetchUserTournaments(){
    fetch(`http://localhost:3000/myTournaments`).then( (response) =>{
        if(response.status == 200){
            response.json().then(data =>{
                selectTurnir.innerHTML = ""

                console.log(data)
                data.forEach(turnir =>{
                    console.log(turnir)
                    const opt1 = document.createElement('option');
                    opt1.setAttribute("value", turnir.ID)
                    opt1.innerHTML = turnir.name;
                    selectTurnir.appendChild(opt1);
            })})
        } else if(response.status == 400) {
            console.log("fetchUserTournaments error")
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}

function fetchDvorane2(){
    fetch(`http://localhost:3000/turnir/${id}`).then( (response) =>{
        response.json().then(data =>{
            fetch(`http://localhost:3000/dvorana/${tjedan}/${lokacija}`).then( (response) =>{
                if(response.status == 200){
                    response.json().then(data =>{
                        select1.innerHTML = ""
                        select2.innerHTML = ""
                        select3.innerHTML = ""

                        data.forEach(dvorana =>{
                            console.log(dvorana)
                            const opt1 = document.createElement('option');
                            opt1.setAttribute("value", dvorana.ID)
                            opt1.innerHTML = dvorana.name;
                            select1.appendChild(opt1);

                            const opt2 = document.createElement('option');
                            opt2.setAttribute("value", dvorana.ID)
                            opt2.innerHTML = dvorana.name;
                            select2.appendChild(opt2);

                            const opt3 = document.createElement('option');
                            opt3.setAttribute("value", dvorana.ID)
                            opt3.innerHTML = dvorana.name;
                            select3.appendChild(opt3);
                    })})
                } else if(response.status == 400) {
                    //const error = document.getElementById('error')
                    //error.innerText = "Nisu uneseni svi podaci."
                }
            })
        })
    })
}

function IsEnoughEkipa(i){
    let counter = 0;
    
    for (const ekipa of ekipe) {
        if(ekipa.IsScedualed == 0 && ekipa.CanPlay(i))
        {
            counter++;
        }
    }
    if (counter >= 2)
    {
        return true;
    }
    return false;
}
function IsDvoranaFree(i, dvorane){
   
    for (const dvorana of dvorane) {
        if(dvorana.times[i]==1)
        {
            return true;
        }
    }
    return false;
}
function GetFreeDvorana(i, dvorane){
    let counter =0;
    for (const dvorana of dvorane) {
        if (dvorana.times[i] == 1 && counter == 0)
        {
            dvorana.times[i] = 0;
            counter ++;
            return dvorana;
        }
    }
    return dvorane[0];
}
function ConvertVrijemeIntToH(i){
    let text = "";
    if (i / 10 < 1)
    {
        text += "Pon";
    }
    else if ((i / 10) >= 1 && (i / 10)<2)
    {
        text += "Uto";
    }
    else if ((i / 10) >= 2 && (i / 10)<3)
    {
        text += "Sri";
    }
    else if ((i / 10) >= 3 && (i / 10)<4)
    {
        text += "Cet";
    }
    else if ((i / 10) >= 2 && (i / 10)<5)
    {
        text += "Pet";
    }
    else if ((i / 10) >= 5 && (i / 10)<6)
    {
        text += "Sub";
    }
    else if ((i / 10) >= 6 && (i / 10)<7)
    {
        text += "Ned";
    }



    if (i % 10 == 0)
    {
        text += " 8:00 h";
    }
    else if (i % 10 == 1)
    {
        text += " 9:30 h";
    }
    else  if (i % 10 == 2)
    {
        text += " 11:00 h";
    }
    else  if (i % 10 == 3)
    {
        text += " 12:30 h";
    }
    else  if (i % 10 == 4)
    {
        text += " 14:00 h";
    }
    else  if (i % 10 == 5)
    {
        text += " 15:30 h";
    }
    else  if (i % 10 == 6)
    {
        text += " 17:00 h";
    }
    else  if (i % 10 == 7)
    {
        text += " 18:30 h";
    }
    else  if (i % 10 == 8)
    {
        text += " 20:00 h";
    }
    else  if (i % 10 == 9)
    {
        text += " 21:30 h";
    }
    /*else
    {
        text = "Nema termina u tom vremenu!";
    }*/
    return text;
}

function funkcijaa1(p1){
    const ime = document.getElementById('Ime'+p1);
    var checkboxes = document.getElementsByClassName("ck"+p1);
    var ukupno = [];
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            ukupno.push(1);
        }
        else{
            ukupno.push(0);
        }
    }
    document.getElementById("rjesenje"+p1).innerHTML = "POPUNJENO";
    if(p1==1){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa1.CopyEkipa(ekipaP);
        if(ekipa1counter == 0){
            ekipe.push(ekipa1);
            ekipa1counter++;
        }
        
    }
    if(p1==2){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa2.CopyEkipa(ekipaP);
        if(ekipa2counter == 0){
            ekipe.push(ekipa2);
            ekipa2counter++;
        }
    }
    if(p1==3){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa3.CopyEkipa(ekipaP);
        if(ekipa3counter == 0){
            ekipe.push(ekipa3);
            ekipa3counter++;
        }
    }
    if(p1==4){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa4.CopyEkipa(ekipaP);
        if(ekipa4counter == 0){
            ekipe.push(ekipa4);
            ekipa4counter++;
        }
    }
    if(p1==5){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa5.CopyEkipa(ekipaP);
        if(ekipa5counter == 0){
            ekipe.push(ekipa5);
            ekipa5counter++;
        }
    }
    if(p1==6){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa6.CopyEkipa(ekipaP);
        if(ekipa6counter == 0){
            ekipe.push(ekipa6);
            ekipa6counter++;
        }
    }
    if(p1==7){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa7.CopyEkipa(ekipaP);
        if(ekipa7counter == 0){
            ekipe.push(ekipa7);
            ekipa7counter++;
        }
    }
    if(p1==8){
        const ekipaP = new Ekipa(ukupno, ime.value, 0);
        ekipa8.CopyEkipa(ekipaP);
        if(ekipa8counter == 0){
            ekipe.push(ekipa8);
            ekipa8counter++;
        }
    }
}

function algoritamRada(kolo){
    let numberOfUtakmica = 0;
    let text = "";
    let text2 = "";
    let out = document.getElementById("turnir");
    var ekipaa1 = new Ekipa(a, "lol", 0);
    var ekipaa2 = new Ekipa(a, "ne radi", 0);
    var Pdvorana = new Dvorana([0,0], " ");

    var counter=0;
    const algoritamRada_utakmice = []
    for (let i = 0; i < 70; i++) {
        text+="+";
        if(IsEnoughEkipa(i)){
            text+="-";
            for (const dvorana of dvorane) {
                text+=dvorana.name + " " +  dvorana.times[i];
                if(dvorana.times[i]==1)
                {
                    text+="-";
                    dvorana.times[i]=0;
                    for (const ekipa of ekipe) {
                        text+="e+" + ekipa.Is;
                        if (ekipa.IsScedualed == 0 && ekipa.times[i] == 1 && counter==0)
                        {
                            counter++;
                            ekipaa1.CopyEkipa(ekipa);                                    
                            ekipa.IsScedualed = 1;
                            ekipa.times[i]=0;
                            text+="prva = " + ekipa.name;
                            text2+=ekipa.name + " vs ";
                        } 
                        else if (ekipa.IsScedualed == 0 && ekipa.times[i] == 1 && ekipa.CanPlay(i) && counter == 1)
                        {
                            numberOfUtakmica++;
                            counter=0;
                            text+=" druga = " + ekipa.name;
                            ekipaa2.CopyEkipa(ekipa);
                            //Pdvorana.CopyDvorana(dvorana);                                    
                            let utakmica1 = new Utakmica(ekipa1, ekipa2, Pdvorana, i);
                            utakmice.push(utakmica1);                                
                            ekipa.IsScedualed = 1;
                            ekipa.times[i]=0;
                            text2+=ekipa.name + " -> " + dvorana.name + " u " + ConvertVrijemeIntToH(i) + ", \n";
                            let textVrijeme = ConvertVrijemeIntToH(i);
                            i--;
                            algoritamRada_utakmice.push({
                                "name_ekipa1": ekipaa1.name,
                                "name_ekipa2": ekipaa2.name,
                                "time": textVrijeme,
                                "dvorana": dvorana.name,
                                "kolo": kolo
                            })
                            
                            break;           
                        }
                       
                    } 
                    
                    
                    break;
                }
            }
           
        }
        ekipaa1.ClearEkipa();
        ekipaa2.ClearEkipa();
        Pdvorana.ClearDvorana();
        counter = 0;
        if(i == 69 && numberOfUtakmica<ekipe.length/2){
            text2 = "Nije moguce napraviti turnir, pokusajte ponovo!"
            return
        }

        /*else{
            CreateBracket(text2);
        }*/              
    }

    /*utakmice.forEach(utakmica => {
        text += utakmica.ekipa1.name + " " + utakmica.ekipa2.name + " " + utakmica.dvorana;
    });*/
    document.getElementById("prvaUtakmica").innerHTML = text2;

    //text = utakmice[1].ekipa1.name + " " + utakmice[1].ekipa2.name + utakmice[0].dvorana.name;
    //document.getElementById("drugaUtakmica").innerHTML = text;
    if(kolo === 1){
        //stvori turnir
        const imeTurnira = document.getElementById('Ime_turnira').value;
        const tjedan = document.getElementById('tjedan').value;
        const lokacija = document.getElementById('lokacija').value;
        fetch('http://localhost:3000/turnir', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "turnir": {
                    "ime":imeTurnira,
                    "kolo1": text2,
                    "lokacija": lokacija
                },
                "utakmice": algoritamRada_utakmice,
                "tjedan": tjedan
            })
        }).then( (response) =>{
            if(response.status == 200){
                dvorane.forEach(dvorana => {
                    UpdateDvorana(dvorana)
                });
                response.json().then(data => noviTurnirId = data.turnirId)
                //window.location = "pages/HomePage.html";
            } else if(response.status == 400) {
                //const error = document.getElementById('error')
                //error.innerText = "Nisu uneseni svi podaci."
            }
        })
    } else {
        //update turnir
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const turnirId = urlParams.get("turnir")

        fetch(`http://localhost:3000/turnir/${turnirId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "turnir": {
                    "koloText": text2,
                    "kolo": kolo
                },
                "utakmice": algoritamRada_utakmice
            })
        }).then( (response) =>{
            if(response.status == 200){
                /*dvorane.forEach(dvorana => {
                    UpdateDvorana(dvorana)
                });*/
                noviTurnirId = turnirId
                //window.location = "pages/HomePage.html";
            } else if(response.status == 400) {
                //const error = document.getElementById('error')
                //error.innerText = "Nisu uneseni svi podaci."
            }
        })

    }
    
}
var priorityDvoranaCounter = 1;
const PDvorane = [];
function AddPDvorana(){
    dvorane = []

    const id1 = select1.value
    const id2 = select2.value
    const id3 = select3.value

    fetch(`http://localhost:3000/dvoranePriority/${id1}/${id2}/${id3}`).then( (response) =>{
        if(response.status == 200){
            response.json().then(data =>{
                console.log(data)
                dvorane.push(new Dvorana(JSON.parse(data.p1.times), data.p1.name, data.p1.location, data.p1.tjedan))
                dvorane.push(new Dvorana(JSON.parse(data.p2.times), data.p2.name, data.p2.location, data.p2.tjedan))
                dvorane.push(new Dvorana(JSON.parse(data.p3.times), data.p3.name, data.p3.location, data.p3.tjedan))
                console.log(dvorane)
                document.getElementById("UneseneDvorane").innerHTML="UNESENO"
            })
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

    /*const PrevDvorana = document.getElementById('dvorana1');
    /*for (let i = 0; i < dvorane.length; i++) {
        if(PrevDvorana == dvorane[i].name){
            PDvorane.push(dvorane[i]);
            dvorane.splice(i, 1);
        }
    }
    priorityDvoranaCounter++;
    document.getElementById('buttonDvorana').textContent = priorityDvoranaCounter + ". dvorana" + PrevDvorana.value;*/
}



var dvoranacounter =0;
var dvorana = new Dvorana([0,0], "", "");
function funkcija(p1){
    const lokacija =document.getElementById('lokacija');
    const tjedan =document.getElementById('tjedan');
    const ime = document.getElementById('Ime'+p1);
    const out= document.getElementById('ImeDvorane');
    var checkboxes = document.getElementsByClassName("ck"+p1);
    var ukupno = [];
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            ukupno.push(1);
        }
        else{
            ukupno.push(0);
        }
    }
    document.getElementById("rjesenje").innerHTML = ukupno;
    const dvoranaP = new Dvorana(ukupno, ime.value, lokacija.value);
    dvorana.CopyDvorana(dvoranaP);
    out.innerHTML= dvorana.name + " "+ dvorana.location;
    dvorane.push(dvorana); //i ne funckionira

    //kod za dodavanje u bazu podataka
    console.log("Dvorana POST")
    fetch('http://localhost:3000/dvorana', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": dvorana.name,
            "week": tjedan.value,
            "location": dvorana.location,
            "times": dvorana.ukupno,
        })
    }).then( (response) =>{
        if(response.status == 200){
            //window.location = "pages/HomePage.html";
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}
function toastFunk(){
    let toast = document.getElementById('snackbar');
    toast.className = "show-bar";
    setTimeout(function () { toast.className = toast.className.replace("show-bar", ""); }, 5000);
}

function CreateBracket(text2){
    text2.forEach(text => {
        let li = document.createElement("li");
        li.innerHTML = text.value;
        document.getElementById("bracket").appendChild(li);
    });
}
function Prijava(){
    console.log("prijava")
    const ime = document.getElementById('ime').value;
    const lozinka = document.getElementById('lozinka').value;

    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": ime,
            "password": lozinka
        })
    }).then( (response) =>{
        if(response.status == 200){
            window.location = "pages/HomePage.html";
        } else if(response.status == 400) {
            const error = document.getElementById('error')
            error.innerText = "Nisu uneseni svi podaci."
        }
    })
}
function GoRegistriraj(){
    window.location = "pages/Registration.html";
}
function Registracija(){
    const ime = document.getElementById('ime').value;
    const email = document.getElementById('email').value;
    const lozinka = document.getElementById('lozinka').value;
    const potvrda_lozinke = document.getElementById('potvrda_lozinke').value;
    if(lozinka != potvrda_lozinke){
        const error = document.getElementById('error')
        error.innerText = "Potvrda lozinke nije ista kao i lozinka."
    }
    else{
        fetch('http://localhost:3000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": ime,
                "email": email,
                "password": lozinka
            })
        }).then( (response) =>{
            if(response.status == 200){
                window.location = "HomePage.html";
            } else if(response.status == 500){
                const error = document.getElementById('error')
                error.innerText = "Korisničko ime ili email već postoje."
            } else if(response.status == 400) {
                const error = document.getElementById('error')
                error.innerText = "Nisu uneseni svi podaci."
            }
        })
    }

    
}
function UpdateDvorana(dvorana){
    const ime = dvorana.name;
    const times = dvorana.times;
    fetch('http://localhost:3000/updateDvorana', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": ime,
            "times": times
        })
    }).then( (response) =>{
        if(response.status == 200){
            console.log("uspjesno updejtanje dvorane")
        } 
    })

    
}

function Odjava(){
    fetch('http://localhost:3000/logout').then( _ =>
        window.location = "/Login.html"
    )

}

function Unesi_pobjednike(kolo){
    if(kolo==2){
        document.getElementById("ekipa1").innerHTML=document.getElementById("pobjednik1").value;
        document.getElementById("ekipa2").innerHTML=document.getElementById("pobjednik2").value;
        document.getElementById("ekipa3").innerHTML=document.getElementById("pobjednik3").value;
        document.getElementById("ekipa4").innerHTML=document.getElementById("pobjednik4").value;
    }
    else if(kolo == 3){
        document.getElementById("ekipa1").innerHTML=document.getElementById("pobjednik1").value;
        document.getElementById("ekipa2").innerHTML=document.getElementById("pobjednik2").value;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    fetch(`http://localhost:3000/turnir/${urlParams.get("turnir")}`).then((response) =>{
        if(response.status == 200){
            response.json().then(turnirData => {
                console.log(turnirData[0])
                fetch(`http://localhost:3000/dvorana/${parseInt(turnirData[0].pocetniTjedan)+kolo-1}/${turnirData[0].location}`).then(response =>{
                    if(response.status == 200){
                        response.json().then(data =>{
                            select1.innerHTML = ""
                            select2.innerHTML = ""
                            select3.innerHTML = ""
                            console.log(select1)
                            console.log(data)
                            data.forEach(dvorana =>{
                                console.log(dvorana)
                                const opt1 = document.createElement('option');
                                opt1.setAttribute("value", dvorana.ID)
                                opt1.innerHTML = dvorana.name;
                                select1.appendChild(opt1);

                                const opt2 = document.createElement('option');
                                opt2.setAttribute("value", dvorana.ID)
                                opt2.innerHTML = dvorana.name;
                                select2.appendChild(opt2);

                                const opt3 = document.createElement('option');
                                opt3.setAttribute("value", dvorana.ID)
                                opt3.innerHTML = dvorana.name;
                                select3.appendChild(opt3);
                        })})
                    } else if(response.status == 400) {
                        //const error = document.getElementById('error')
                        //error.innerText = "Nisu uneseni svi podaci."
                        console.log("fetch dvorane error")
                    }
                })
            })
            //window.location = "pages/HomePage.html";
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}
const turnirOdabir = document.getElementById("turnir");
function Unesi_turnir(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    fetch(`http://localhost:3000/turnir/${urlParams.get("turnir")}`).then((response) =>{
        if(response.status == 200){
            response.json().then(turnirData => {
                console.log(turnirData[0])
                fetch(`http://localhost:3000/dvorana/${parseInt(turnirData[0].pocetniTjedan)+kolo-1}/${turnirData[0].location}`).then(response =>{
                    if(response.status == 200){
                        response.json().then(data =>{
                            select1.innerHTML = ""
                            select2.innerHTML = ""
                            select3.innerHTML = ""
                            console.log(select1)
                            console.log(data)
                            data.forEach(dvorana =>{
                                console.log(dvorana)
                                const opt1 = document.createElement('option');
                                opt1.setAttribute("value", dvorana.ID)
                                opt1.innerHTML = dvorana.name;
                                select1.appendChild(opt1);

                                const opt2 = document.createElement('option');
                                opt2.setAttribute("value", dvorana.ID)
                                opt2.innerHTML = dvorana.name;
                                select2.appendChild(opt2);

                                const opt3 = document.createElement('option');
                                opt3.setAttribute("value", dvorana.ID)
                                opt3.innerHTML = dvorana.name;
                                select3.appendChild(opt3);
                        })})
                    } else if(response.status == 400) {
                        //const error = document.getElementById('error')
                        //error.innerText = "Nisu uneseni svi podaci."
                        console.log("fetch dvorane error")
                    }
                })
            })
            //window.location = "pages/HomePage.html";
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}
function Get_turnir(){
    const id = selectTurnir.value
    fetch(`http://localhost:3000/turnir/${id}`).then((response) =>{
        if(response.status == 200){
            response.json().then(turnirData => {
                document.getElementById('kolo1p').innerHTML=turnirData[0].kolo1;
                document.getElementById('PKolo1').innerHTML="Prvo kolo:"
                document.getElementById('kolo2p').innerHTML=turnirData[0].kolo2;
                document.getElementById('PKolo2').innerHTML="Drugo kolo:"
                document.getElementById('kolo3p').innerHTML=turnirData[0].kolo3;
                document.getElementById('PKolo3').innerHTML="FINALE:"
            })
            //window.location = "pages/HomePage.html";
        } else if(response.status == 400) {
            //const error = document.getElementById('error')
            //error.innerText = "Nisu uneseni svi podaci."
        }
    })

}

