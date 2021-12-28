const {calculateLight}=require("../lib/process");
let fs = require('fs');
module.exports={    
	setFileRoom: async(req,res,next)=>{
		try {
            res.status(200).json({status:"ok"});
		} catch (error) {
			console.log(error);			
			res.status("400").json({error});
		}
    },
    readFile(req,res){
        fs.readFile('./static/rooms/file.txt', 'utf-8', (err, data) => {
            if(err) {
              console.log('error: ', err);
            } else {
                let lights=calculateLight(data);
                res.status(200).json(lights);
            }
        });
        
    }

}