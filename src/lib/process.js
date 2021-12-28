const path = require('path');
var fs = require('fs')
module.exports={    
	calculateLight,
    saveFile
}
//Function to calculate.  char matrix parameters
function calculateLight(walls){
    let arrayWalls=walls.split("\r\n");
    arrayWalls=arrayWalls.map((v)=>Array.from(v));
    setLight(arrayWalls,0,0);
    return arrayWalls;

}
//Middleware to save file
function saveFile(req,res,next){
    let file=req.file;
    let ext=file.originalname.split('.');    
    ext=ext[ext.length-1];
    var fullNewPath = path.join(file.destination,"file.txt")
    fs.renameSync(file.path, fullNewPath)
    req.file=fullNewPath;
    next();
}

//This function check item by item

function setLight(walls,row,col){
    walls[row][col]
    let pos=walls[row][col];
    let right=walls[row][col+1];    
    let bottom=walls[row+1]?walls[row+1][col]:null;
    // if there are horizontal spaces to illuminate, those spaces are obtained
    let cR=checkRight(walls,row,col);
    let cL=checkLeft(walls,row,col-1);
    if((cL>0 || (row==0 && col==0)) && cR>0){
        // if there are vertical spaces to illuminate, those spaces are obtained
        let nD=setDown(walls,row+1,col,true);
        let nL=setTop(walls,row-1,col,true);
        if(nD || nL){
            //An L is inserted to designate a bulb
            if(pos=='0')walls[row][col]='L';
        }        
    }
    //Go to the next position
    if(!right && !!bottom) return setLight(walls,row+1,0);
    else if(!!right) return setLight(walls,row,col+1);
}

//Check to the left of the position
function checkLeft(walls,row,col){
    for(var i=col;walls[row][i];i--){
        let item=walls[row][i];
        if(item=='1') break;
        if(item=='L')return false;
    }
    return col-i;
}
//Check to the right of the position
function checkRight(walls,row,col){
    for(var i=col;walls[row][i];i++){
        if(walls[row][i]=='1' ) return i-col;
    }
    return i;
}
//Check to the top of the position and set + 
function setTop(walls,row,col,set){
    if(!!walls[row] && (walls[row][col]=='L' || walls[row][col]=='+'))return ;
    if(set && !!walls[row] && !!walls[row][col] && walls[row][col]==0){
        walls[row][col]='+';
        let cR=checkRight(walls,row,col);
    let cL=checkLeft(walls,row,col-1);
        return 1+setTop(walls,row-1,col,set);
    }
    return 0;
}
//Check to the bottom of the position and set + 
function setDown(walls,row,col,set){
    if(!!walls[row] && (walls[row][col]=='L' || walls[row][col]=='+'))return ;
    if(set && !!walls[row] && !!walls[row][col] && walls[row][col]==0){
        walls[row][col]='+';
        return 1+setDown(walls,row+1,col,set);
    }
    return 0;
}