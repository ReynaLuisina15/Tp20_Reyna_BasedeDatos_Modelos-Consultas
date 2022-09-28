const { render } = require("ejs");
const db = require("../database/models");

module.exports = {
  list: (req, res) => {
    db.Movie.findAll()
      .then((movies) => {
        /* TODA RESPUESTA TIENE QUE ESTAR DENTRO DEL THEN CUANDO HAY CONSULTA A LA BASE DE DATOS */
        return res.render("moviesList", {
          movies
        })
      })
      .catch(error => console.log(error))
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id)
      .then(movie => {
        return res.render("moviesDetail", {
          movie
        })
      })
      .catch(error => console.log(error))
  },
  new : (req,res) => {
    db.Movie.findAll({
        order : [
            ['release_date', 'DESC'],
        ]
    })
    .then(movies => {
        return render.render('newestMovies', {
            movies
        })
    })
    .catch(error => console.log(error))
  },
  recomended : (req,res) => {
    db.Movie.findAll({
        order : [
            ['rating', 'DESC']
        ],
        limit : 5
    })
    .then(movies => {
        return render.render('recommendedMovies', {
            movies
        })
    })
  }
}