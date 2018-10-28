var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var fs = require('fs');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "*,content-type");
    resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    console.log("midleware allow all");
    next();
});
//get all users
app.get("/users/getall", function (req, res, next) {
    console.log("get all users");
    fs.readFile("./users.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        res.json({ result: obj });
         res.end();
    });
});

// Add New User 
app.post('/orders/createUser', function (req, res, next) {
    console.log("add user");
    fs.readFile("./users.json", "utf8", function (err, data) {
        var obj = data == "" ? [] : JSON.parse(data);

        if (obj.length > 0) {
            var maxid = Math.max.apply(Math, obj.map(function (o) { return o.ID; }))
            req.body.ID = maxid + 1;
        }

        obj.push(req.body);
        fs.writeFile("./users.json", JSON.stringify(obj), function (err) { });
    });
    res.json({ result: 'user added' });
    res.end();
});


// Add new order
app.post('/orders/createOrder', function (req, res, next) {
    console.log("add order");
    fs.readFile("./order.json", "utf8", function (err, data) {
        var obj = data == "" ? [] : JSON.parse(data);
        if (obj.length > 0) {
            var maxid = Math.max.apply(Math, obj.map(function (o) { return o.ID; }))
            req.body.ID = maxid + 1;
        }
        obj.push(req.body);
        fs.writeFile("./order.json", JSON.stringify(obj), function (err) { });
    });
    res.json({ result: 'order added' });
    res.end();
});


//get order
app.get("/orders/getall", function (req, res, next) {
    fs.readFile("./order.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        res.json({ result: obj });
        res.end();
    });
});

//add product
app.post('/products/add', function (req, res, next) {
    console.log("add product");
    fs.readFile("./products.json", "utf8", function (err, data) {
        var obj = data == "" ? [] : JSON.parse(data);
        if (obj.length > 0) {
            var maxid = Math.max.apply(Math, obj.map(function (o) { return o.id; }))
            req.body.id = maxid + 1;
        }
        obj.push(req.body);
        fs.writeFile("./products.json", JSON.stringify(obj), function (err) { });
    });
    res.json({ result: 'product added' });
    res.end();
});

//get all products
app.get("/products/getall", function (req, res, next) {
    console.log("get all products");
    fs.readFile("./products.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        res.json({ result: obj });
        res.end();
    });
});
//get product info
app.get('/products/get/:id', function (req, res) {
    console.log("get by id");
    fs.readFile("./products.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        console.log("Server " + req.params.id);
        var selectedProduct = obj.filter(function (o) {
            return o.id == req.params.id;
        });
        console.log(selectedProduct);
        res.json({ result: selectedProduct });
        res.end();
    });
});

//decrement product quantity
app.get('/products/decrement/:id', function (req, res, next) {
    console.log("decrement QNT");
    fs.readFile("./products.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        console.log("Server " + req.params.id);
        obj.filter(function (o) {
            return o.id == req.params.id;
        }).map(function (o) { return o.amountAvailable = o.amountAvailable - 1 });

        //check if the amount avaliable becomes 0
        if (obj.filter(function (o) { return o.amountAvailable == 0 }).length > 0) {
            console.log("in if")
            for (let i = 0; i < obj.length; i++) {
                console.log("in the for");
                if (obj[i].amountAvailable == 0) {
                    obj.splice(i, 1);
                    break;
                }
            }
        }
        fs.writeFile("./products.json", JSON.stringify(obj), function (err) { });
        console.log(obj);
        res.json({ result: obj });
        res.end();
    });
});


//get product in search
app.get('/products/search/:productName', function (req, res) {
    console.log("search for product");
    fs.readFile("./products.json", "utf8", function (err, data) {
        obj = data == "" ? [] : JSON.parse(data);
        var selectedProduct = obj.filter(function (o) {
            return o.name == req.params.productName;
        });
        console.log(selectedProduct);
        res.json({ result: selectedProduct });
        res.end();
    });
});


app.listen(9011,
    console.log("listening")
)


