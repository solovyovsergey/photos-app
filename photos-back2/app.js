const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};
function taskDelay(task, time) {
    setTimeout(task, time);
};


const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("photosdb").collection("photos");
    app.listen(3002, function () {
        console.log("Сервер ожидает подключения...")
    })
})

app.get("/api/photosId", function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");

    const limit = parseInt(request.query['count'] || 0);
    const collection = request.app.locals.collection;

    collection.find().limit(limit).toArray(function (err, res) {
        if (err) return console.log(err)

        const newRes = res.map(obj => {
            const { _id: id, name, path } = obj;
            return ({ id, name, path });
        });

        const data = JSON.stringify({ count: newRes.length, data: newRes })
        //response.send(res);
        taskDelay(() => { response.send(data); }, getRandomIntInclusive(3000, 7000));
    });
});

app.get("/api/photos/:id", function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");

    const id = parseInt(request.params['id']);

    const collection = request.app.locals.collection;
    collection.findOne({ _id: id }, (err, res) => {
        if (err) return console.log(err)

        const { _id: id, name, path } = res;
        const data = JSON.stringify({ id, name, path })
        //response.send(res);
        taskDelay(() => { response.send(data); }, getRandomIntInclusive(3000, 7000));
    })
});


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});