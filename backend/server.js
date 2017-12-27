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


function createTexInputFile(){
  var fs = require('fs');
  fs.writeFile("./dotgrid.tex", "\\documentclass[" + formData.paper_size + "]{article}\n\\pagenumbering{gobble}\n\\usepackage[" + formData.orientation + ", margin=" + formData.margin + "in]{geometry}\n\\usepackage{tikz}\n\\begin{document}\n    \\begin{tikzpicture}[scale=.5]\n        \\foreach \\x in {0,...,46}\n        \\foreach \\y in {0,...,55}\n    {\n     \\fill (\\x,\\y) circle (0.03cm);\n   }\n   \\end{tikzpicture}\n\\end{document}", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("Tex file was saved");
  });
}


function createPDF(formData) {
  createTexInputFile();
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
  createPDF();
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
