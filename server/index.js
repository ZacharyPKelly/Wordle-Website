//Importing modules and creating an instance of the Express application
const wordleData = require('./wordleAnswerDictionary.json');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/wordleFormInput', (req, res) => {

    const wordleFormData = req.body;

    console.log("\nRecieved Wordle Data: \n");

    let knownLetters = [wordleFormData.known1, wordleFormData.known2, wordleFormData.known3, wordleFormData.known4, wordleFormData.known5];
    let validLetters = [wordleFormData.valid1, wordleFormData.valid2, wordleFormData.valid3, wordleFormData.valid4, wordleFormData.valid5];
    let unusedLetters = wordleFormData.unusedLetters;

    var finalRegex = "";
    var knownRegex = "";
    var validRegex = "";
    var unusedRegex = "";

    console.log("Known Letters  : ", knownLetters);
    console.log("Valid Letters  : ", validLetters);
    console.log("Unused Letters : ", unusedLetters);
    console.log("\n")

    if(!knownLetters.some(Boolean) && !validLetters.some(Boolean) && !unusedLetters.some(Boolean)) {

        console.log("ALL EMPTY");

        res.status(201);

        return;

    }

    // Creating regex for known letters
    for(let index = 0; index < 5; index++) {

        if(knownLetters[index] === '') {

            knownRegex += ".";

        }
        else{

            knownRegex += knownLetters[index];

        }
    }

    // Creating regex for valid letters
    for(let index = 0; index < 5; index++) {

        if(validLetters[index] !== '') {

            validRegex += '(?=.*' + validLetters[index] + ')';

        }
    }

    // Creating regex for unused letters
    for(let index = 0; index < unusedLetters.length; index++) {

        unusedRegex += '(?!.*' + unusedLetters[index] + ')';
    }

    finalRegex += unusedRegex + validRegex + knownRegex;

    let regex = new RegExp(finalRegex);

    let matchingWords = wordleData.filter(word => regex.test(word));

    res.status(201).send(JSON.stringify([matchingWords,
                                        [wordleFormData.known1,
                                        wordleFormData.known2,
                                        wordleFormData.known3,
                                        wordleFormData.known4,
                                        wordleFormData.known5],
                                        [wordleFormData.valid1,
                                        wordleFormData.valid2,
                                        wordleFormData.valid3,
                                        wordleFormData.valid4,
                                        wordleFormData.valid5]]));

    console.log("Response sent\n");
    console.log("----------------------------------\n");
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//Starting Server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
