var runChild = require('child_process');

function createPDF(formData) {
  runChild.spawn('sh', ['deploy.sh'], {stdio: 'inherit'});
  return "";
}

createPDF();
