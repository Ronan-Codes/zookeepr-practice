const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const { animals } = require('./data/animals.json');

// ctrl+c to stop server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})
// access by http://localhost:3001/api/

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save animalsArray as filteredResults here:
    let filteredResults = animalsArray; 

    // !!! REVIEW !!!
    if(query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits Array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it's initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so that at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// req.query is multifaceted, often combining multiple parameters
app.get('/api/animals', (req, res) => {
    // send() method from the res parameter to send the string Hello! to our client.
        // res.send('Hello!');
    // use res.json if sending lots of JSON

    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
})

// req.param is specific to a single property (retrieve 1)
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);

    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
})



// heroku links: https://zookeepr-practice-galvez.herokuapp.com/
//               https://git.heroku.com/zookeepr-practice-galvez.git