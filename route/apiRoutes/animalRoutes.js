const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

const router = require('express').Router();

// req.query is multifaceted, often combining multiple parameters
router.get('/animals', (req, res) => {
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
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);

    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be 
    // toString() turns the number ID to a string
    req.body.id = animals.length.toString()

    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
})

module.exports = router;