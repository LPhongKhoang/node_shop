const app = require('./app');
// ****************** START SERVER =================
const port = process.env.PORT || 3009;
// start server
app.listen(port, ()=>{console.log(`Server starting at ${port}`)});
