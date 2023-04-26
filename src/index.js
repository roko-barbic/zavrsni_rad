const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
var mysql = require('mysql2');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cookieSession({
    name:"session",
    keys:["secretkey"],
    maxAge: 60*60*1000
}))

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'korisnik',
  password : 'zavrsni',
  database : 'zavrsni'
});

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.post('/register', (req, res) => {
    console.log("POST register")
    console.log(req.body)
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if(!username || !email || !password){
        console.log("login info not complete")
        res.sendStatus(400)
        return
    }

    connection.query('INSERT INTO user(username, email, password) VALUES (?,?,?)', [username, email, password], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        // connected!
        res.sendStatus(200)
      });
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if(!username || !password){
        res.sendStatus(400)
        return
    }

    connection.query('SELECT ID, username, password FROM user WHERE username = ?', [username], function (error, results, fields) {
        if (error){
            res.sendStatus(500)
            return
        }
        
        if(results.length == 0 ||  results[0].password !== password){
            res.sendStatus(400)
            return
        }
        const user = {"id": results[0].ID,
                      "username": results[0].username}
        req.session.user = user
        res.sendStatus(200)
      });
})

app.get('/dvorana/:tjedan/:lokacija', (req, res) =>{
    const lokacija = req.params.lokacija
    const tjedan = req.params.tjedan
    connection.query('SELECT ID, name FROM dvorane where location = ? AND tjedan = ?', [lokacija, tjedan], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        // connected!
        res.json(results)
      });
})

app.get('/dvoranePriority/:p1/:p2/:p3', (req, res) =>{
    const p1 = req.params.p1
    const p2 = req.params.p2
    const p3 = req.params.p3
    result = {}
    const queryString = 'SELECT ID, name, times, location, tjedan FROM dvorane where ID = ?'
    connection.query(queryString, [p1], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        result.p1 = results[0]
        connection.query(queryString, [p2], function (error, results, fields) {
            if (error){
                console.log(error)
                res.sendStatus(500)
                return
            }
            result.p2 = results[0]
            connection.query(queryString, [p3], function (error, results, fields) {
                if (error){
                    console.log(error)
                    res.sendStatus(500)
                    return
                }
                // connected!
                result.p3 = results[0]
                res.json(result)
              });
          });
      });
})

app.post('/dvorana', (req, res) => {
    console.log("POST dvorana")
    console.log(req.body)
    const ime = req.body.name
    const tjedan = req.body.week
    const lokacija = req.body.location
    var vremena = req.body.times

    if(!ime || !tjedan || !lokacija || !vremena){
        console.log("dvorana info not complete")
        res.sendStatus(400)
        return
    }

    vremena = JSON.stringify(vremena)
    console.log(vremena.length)

    connection.query('INSERT INTO dvorane(name, location, times, tjedan) VALUES (?,?,?,?)', [ime, lokacija, vremena, tjedan], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        // connected!
        res.sendStatus(200)
      });

})

app.post('/updateDvorana', (req, res) => {
    console.log("POST updejtdvorane")
    console.log(req.body)
    const name = req.body.name
    let times = req.body.times
    times = JSON.stringify(times)

    if(!name || !times){
        console.log("login info not complete")
        res.sendStatus(400)
        return
    }

    connection.query('UPDATE zavrsni.dvorane SET times = ? WHERE name = ? ;', [times, name], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        // connected!
        res.sendStatus(200)
      });
})

app.get('/utakmica/:turnirId/:kolo', (req, res) => {
    console.log("GET utakmica")
    const turnirId = req.params.turnirId
    const kolo = req.params.kolo

    if(!turnirId || !kolo){
        console.log("dvorana info not complete")
        res.sendStatus(400)
        return
    }

    connection.query('SELECT * FROM utakmica WHERE turnir = ? AND kolo = ?', [turnirId, kolo], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        res.json(results)
    })

})

app.post('/utakmica', (req, res) => {
    console.log("POST utakmica")
    console.log(req.body)
    
    const name_ekipa1 = req.body.name_ekipa1
    const name_ekipa2 = req.body.name_ekipa2
    const time = req.body.time
    const turnir = req.body.turnir
    const dvorana = req.body.dvorana
    const kolo = req.body.kolo
    const pobjednik = req.body.pobjednik

    if(!name_ekipa1 || !name_ekipa2 || !time || !turnir || !dvorana || !kolo || !pobjednik){
        console.log("dvorana info not complete")
        res.sendStatus(400)
        return
    }

    connection.query('INSERT INTO utakmica(name_ekipa1, name_ekipa2, time, turnir, dvorana, kolo, pobjednik) VALUES (?,?,?,?)', [name_ekipa1, name_ekipa2, time, turnir, dvorana, kolo, pobjednik], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        // connected!
        res.sendStatus(200)
      });

})

app.get('/turnir/:id', (req, res) => {
    console.log("GET utakmica")
    const turnirId = req.params.id

    if(!turnirId){
        console.log("dvorana info not complete")
        res.sendStatus(400)
        return
    }

    connection.query('SELECT * FROM turnir WHERE ID = ?', [turnirId], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        res.json(results)
    })

})

app.post('/turnir', (req, res) => {
    console.log("POST turnir")
    console.log(req.body)
    const ime = req.body.turnir.ime
    const kolo1 = req.body.turnir.kolo1
    const lokacija = req.body.turnir.lokacija
    const utakmice = req.body.utakmice
    const tjedan = req.body.tjedan

    var turnirId = undefined;

    if(!ime || !kolo1 ){
        console.log("dvorana info not complete")
        res.sendStatus(400)
        return
    }

    //vremena = JSON.stringify(vremena)
    //console.log(vremena.length)

    connection.query('INSERT INTO turnir(name, kolo1, pocetniTjedan, location) VALUES (?,?,?,?)', [ime, kolo1, tjedan, lokacija], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        connection.query('SELECT id FROM turnir WHERE name = ?', [ime], function (error, results, fields) {
            if (error){
                console.log(error)
                res.sendStatus(500)
                return
            }
            turnirId = results[0].id
           
            utakmice.forEach(utakmica => {
                connection.query('SELECT id FROM dvorane WHERE name = ? AND tjedan = ?', [utakmica.dvorana, tjedan], function (error, results, fields) {
                    if (error){
                        console.log(error)
                        res.sendStatus(500)
                        return
                    }
                    console.log(results)
                    const dvoranaId = results[0].id
                    connection.query('INSERT INTO utakmica(name_ekipe_1, name_ekipe_2, time, turnir, dvorana, kolo) VALUES (?,?,?,?,?,?)', [utakmica.name_ekipa1, utakmica.name_ekipa2, utakmica.time, turnirId, dvoranaId, utakmica.kolo], function (error, results, fields) {
                        if (error){
                            console.log(error)
                            res.sendStatus(500)
                            return
                        }
                    });
                });  
            });
            connection.query('INSERT INTO user_turnir(userId, turnirId) VALUES (?,?)', [req.session.user.id, turnirId], function (error, results, fields) {
                if (error){
                    console.log(error)
                    res.sendStatus(500)
                    return
                }
            });
            res.json({"turnirId": turnirId})
        });
      });

})

app.post('/turnir/:id', (req, res) => {
    console.log("POST turnir")
    console.log(req.body)

    const utakmice = req.body.utakmice
    const turnirUpdate = req.body.turnir
    const turnirId = req.params.id
    connection.query('SELECT * FROM turnir WHERE ID = ?', [turnirId], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        const turnir = results[0]

        if(parseInt(turnirUpdate.kolo) > 0 && (turnirUpdate.kolo == 2 || turnirUpdate.kolo == 3)){
            connection.query(`UPDATE turnir SET kolo${turnirUpdate.kolo} = ? WHERE ID = ? ;`, [turnirUpdate.koloText, turnirId], function (error, results, fields) {
                if (error){
                    console.log(error)
                    res.sendStatus(500)
                    return
                }
                console.log(results)
            });


        } else {
            res.sendStatus(500)
            return
        }

        utakmice.forEach(utakmica => {
            connection.query('SELECT id FROM dvorane WHERE name = ? AND tjedan = ?', [utakmica.dvorana, parseInt(turnir.pocetniTjedan)+utakmica.kolo-1], function (error, results, fields) {
                if (error){
                    console.log(error)
                    res.sendStatus(500)
                    return
                }
                console.log(results)
                const dvoranaId = results[0].id
                connection.query('INSERT INTO utakmica(name_ekipe_1, name_ekipe_2, time, turnir, dvorana, kolo) VALUES (?,?,?,?,?,?)', [utakmica.name_ekipa1, utakmica.name_ekipa2, utakmica.time, turnirId, dvoranaId, utakmica.kolo], function (error, results, fields) {
                    if (error){
                        console.log(error)
                        res.sendStatus(500)
                        return
                    }
                });
            });  
        });

        res.json({})
    })

})

app.get('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200)
})
app.get('/myTournaments', (req, res) => {
    var user = req.session.user;
    connection.query('SELECT name, ID from turnir LEFT JOIN user_turnir ON turnir.ID = user_turnir.turnirId WHERE userId = ?', [user.id], function (error, results, fields) {
        if (error){
            console.log(error)
            res.sendStatus(500)
            return
        }
        res.json(results)
    })
})
app.listen(port)

