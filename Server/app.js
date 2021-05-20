//import dataCleanUp from "./dataCleanUp.js" 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3001 //using 3001 since 3000 is taken by react app

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //only localhost:3000, which React app is running on, is allowed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  });

app.post('/api/submit', (req, res) => { //if api/submit is called to post
    console.log(req.body)
    res.end()
})

app.get('/api/supervisors', (req, res) => { //if get /api/supervisors is called
    const https = require('https')
    https.get('https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => { //data is collected in chunks
            data += chunk; //chunk is added to data
        });
        
        resp.on('end', () => { //runs when whole response has been received
            data = JSON.parse(data) //makes data into jason format
            data = removeNumericJurisdictions(data) //remove numerical jurisdictions
            alphabetizedData = alphabetize(data) //alphabetize the data
            formattedData = formatData(alphabetizedData) //makes array of strings that will be returned
            res.send(formattedData)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function removeNumericJurisdictions(data){ //removes numeric jurisdictions from get
    for (let i = 0; i < data.length; i++){
        if(!(isNaN(data[i].jurisdiction))){ //returns true if the jurisdiction is a number
            data.splice(i,1)
            i--
        }
    }
    return data
}

function alphabetize(data){
    const alphabetizedData = data.sort(function(a,b){
        const jurisdictionA = a.jurisdiction
        const jurisdictionB = b.jurisdiction
        if(jurisdictionA > jurisdictionB){ //first compare jurisdictions
            return 1
        } else if (jurisdictionA < jurisdictionB){
            return -1
        } else{ //if jurisdictions are the same then compare last name first char
            const lastNameA = a.lastName.charAt(0)
            const lastNameB = b.lastName.charAt(0)
            if (lastNameA > lastNameB) {
                return 1
            } else if (lastNameA < lastNameB) {
                return -1
            } else { //if last names first char are same then compare first name first char
                const firstNameA = a.firstName.charAt(0)
                const firstNameB = b.firstName.charAt(0)
                if(firstNameA > firstNameB) {
                    return 1
                } else if(firstNameA < firstNameB) {
                    return -1
                } else { //order does not change
                    return 0
                }
            }
        }
    })
    return alphabetizedData
}

function formatData(data){ //creates an array with formatted strings
    const formattedData = data.map(
        manager => manager.jurisdiction + " - " + manager.lastName + ", " + manager.firstName 
    )
    return formattedData
}