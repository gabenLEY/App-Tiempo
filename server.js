const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');



app.get('/', (req, res) => {

    res.render('index',{msg:false,})
})

app.use('/', (req, res) => {
    var city = req.body.city;
    var lang = "fr";
    const appid = "54f6f88ba5133e315343f6416a582727";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&${lang}&appid=${appid}`;
    https.get(url,(response) => {

        if (response.statusCode == 200) {

            response.on('data', function (data) {
            const result = JSON.parse(data)
            var main = result.weather[0].main;
            var description = result.weather[0].description;
            var temp = result.main.temp;
            var iconcode = result.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

              const context = {
                tp:temp,
                ct:city,
                icon : iconurl,
                main : main,
                des: description
             }

             res.render('response', context);
              });

        } else {
          const msg = true;
          res.render('index',{msg:msg})
        }


    })

})


const port = 3000;
app.listen(port, () => {
    console.log(`Server Start on ${port}`)
})

