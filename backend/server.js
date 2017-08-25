var cors = require('cors')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var runChild = require('child_process');

var formData = new Object();
formData.paper_size = '';
formData.orientation = '';
formData.grid_style = '';
formData.margin = '';
formData.save = function () {
  return
};

function createPDF(formData) {
  runChild.spawn('sh', ['deploy.sh'], {stdio: 'inherit'});
  return "";
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8010;

var router = express.Router();

//API prefix
app.use('/api', router);

router.use(function(req, res, next) {
    console.log('Something touched the API ! D:');
    next(); // use next() to go to the next route without stopping here
});

//Single route
router.route('/form')

//Gets all data from form
.post(function(req, res) {
    formData.paper_size = req.body.paper_size;
    formData.orientation = req.body.orientation;
    formData.grid_style = req.body.grid_style;
    formData.margin = req.body.margin;

    console.log(formData.paper_size + ', ' + formData.orientation + ', ' + formData.grid_style + ', ' + formData.margin);

    //this function is broken
    formData.save(function(err) {
        if (err){
            res.send(err);
        }
        res.json({message: 'Data received ' });
    });
    res.json({message: "Saul Goodman ;)"});
})

//Server is started here
app.listen(port);
console.log('Port number for API is: ' + port);
