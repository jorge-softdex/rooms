if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express =require('express');
//globals
const app=require("./routes");
//Configuraciones
app.set('port',process.env.PORT || 5000);
app.use(express.static('./static'));
// middleware
// Iniciando servicor
app.listen(app.get('port'),async()=>{
    console.log('server on port ',app.get('port'));   
    
});
