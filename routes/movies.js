var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const streamController = require('../controllers/streamController');



router.get('/', movieController.getAllMovies);
router.post('/create', movieController.createMovie);
router.get('/:id', movieController.getMovie);

router.delete('/:id', movieController.deleteMovie);
router.put('/:id', movieController.updateMovie);

router.post('/find', movieController.findMovies);


router.post('/create/streams', streamController.createStreams);

router.post('/create/downloads', streamController.createDownloads);






module.exports = router;
