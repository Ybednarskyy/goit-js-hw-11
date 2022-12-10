const KEY = '31582122';
const q = 'watermelon';

fetch(
  `https://pixabay.com/api/?key=${KEY}-c0bce89aa4307e5dda7d53da1&q=${q}&image_type=photo&pretty=true`
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        // console.table(
        //   webformatURL,
        //   largeImageURL,
        //   tags,
        //   likes,
        //   views,
        //   comments,
        //   downloads
        // );

        const representation = `<img src=${webformatURL} alt=${tags}/>`;
        const bodyRef = document.querySelector('body');
        bodyRef.insertAdjacentHTML('beforeend', representation);
      }
    );
    // console.log(data.hits);
  });
