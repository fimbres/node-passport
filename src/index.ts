import app from "./app";

app.listen(app.get('port'), () => {
    console.log("Server listing on port", app.get('port'));
});
