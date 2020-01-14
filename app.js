var gplay = require('google-play-scraper').memoized();
const express = require('express')
const app = express()
const localPort = 3000

app.get('/categories', (req, res) => {
    gplay.categories({throttle: 5, country: "in"}).then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    })
})

app.get('/', (req, res) => {
    gplay.list({throttle: 5, country: "in", category: req.query.category,
        collection: req.query.collection, start: req.query.start})
        .then(result => {
            res.send(result)
        }, error => {
            res.send(error)
        })
})

app.get('/apps/details', (req, res) => {
    gplay.app({appId: req.query.id, lang: 'en', country: 'in'})
    .then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    })
})

app.get('/apps/permissions', (req, res) => {
    gplay
    .permissions({appId: req.query.id, throttle: 5, country: "in"})
    .then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    })
})

app.get('/apps/reviews', (req, res) => {
    gplay
    .reviews({appId: req.query.id, throttle: 5, country: "in"})
    .then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    })
})

app.get('/apps/similar', (req, res) => {
    gplay
    .similar({appId: req.query.id, throttle: 5, country: "in"})
    .then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    });
})

app.get('/suggestions', (req, res) => {
    gplay.suggest({
        term: req.query.q,
        num: 15,
        country: "in",
        throttle: 5
    }).then(result => res.send(result), error => {
        res.send(error)
    });
})

app.get('/search', (req, res) => {
    gplay.search({
        term: req.query.q,
        num: 20,
        country: "in",
        throttle: 5
      }).then(result => res.send(result), error => {
        res.send(error)
    });
})

app.get('/dev', (req, res) => {
    gplay
    .developer({devId: req.query.id, throttle: 5, country: "in"})
    .then(result => {
        res.send(result)
    }, error => {
        res.send(error)
    });
})

var server = app.listen(process.env.PORT || localPort, () => {
    var port = server.address().port;
    console.log(`App listening on port ${port}!`)
})
