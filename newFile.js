const { app, port } = require("./server");

app.listen(port);
console.log('server started ' + port);