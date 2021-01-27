const readFile = file => {
  let responseText = null;
  let rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        responseText = rawFile.responseText;
        return responseText;
      } else {
        console.error('error');
      }
    }
  };
  rawFile.send(null);
  return responseText;
};

export default readFile;