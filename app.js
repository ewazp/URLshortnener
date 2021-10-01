const shortBtn = document.getElementById('btn-short');
const longLinkInput = document.getElementById('long-url');


let arrayHeader = ['ID', 'longLink'];

// alias for new short link
const generateID = () => {
  return Math.random().toString(32).substring(2, 5) + 
  (Math.floor(Math.random() * 10) + 10) +
  Math.random().toString(32).substring(2, 5); 
};


// my "database" -file where I store alias as ID and long link
function export_csv(arrayHeader, arrayData, separator, fileName) {
  let header = arrayHeader.join(separator) + '\n';
  let csv = header;
  arrayData.forEach( obj => {
      let row = [];
      for (key in obj) {
          if (obj.hasOwnProperty(key)) {
              row.push(obj[key]);
          }
      }
      csv += row.join(separator)+"\n";
  });

  let csvData = new Blob([csv], { type: 'text/csv;charset=utf-8' });  
  
  let csvUrl = URL.createObjectURL(csvData);

  let hiddenElement = document.createElement('a');
  hiddenElement.href = csvUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName + '.csv';
  hiddenElement.click();
}

// now I should read from file- my databese, but I stuck
// if I could read from file then I can get my long link and redirect to it

shortBtn.addEventListener('click', () => {

  let id = generateID();
  let arrayData = [];
  arrayData.push({ID: id, longLink: longLinkInput.value});
  export_csv(arrayHeader, arrayData, ',', 'urlBase' );

});

