const KEY = '31582122';
const q = 'yellow+flowers';

fetch(
  `https://pixabay.com/api/?key=${KEY}-c0bce89aa4307e5dda7d53da1&q=${q}&image_type=photo&pretty=true`
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });
