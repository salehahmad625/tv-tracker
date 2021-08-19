function findShow(title, arr) {
  fetch("https://api.tvmaze.com/search/shows?q=" + title)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      response.forEach((show) => {
        if (show.show.image !== null) {
          arr.push({
            name: show.show.name,
            pic: show.show.image.medium,
          });
        }
      });
      return arr;
    })
    .catch(function (err) {
      return err;
    });
}

export {findShow}
