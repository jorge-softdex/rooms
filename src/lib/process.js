const path = require('path');
var fs = require('fs')
module.exports={    
	calculateLight,
    saveFile
}
function calculateLight(walls){
    let arrayWalls=walls.split("\r\n");
    arrayWalls=arrayWalls.map((v)=>Array.from(v));
    setLight(arrayWalls,0,0);
    return arrayWalls;

}
function saveFile(req,res,next){
    let file=req.file;
    let ext=file.originalname.split('.');    
    ext=ext[ext.length-1];
    var fullNewPath = path.join(file.destination,"file.txt")
    fs.renameSync(file.path, fullNewPath)
    req.file=fullNewPath;
    next();
}

function setLight(walls,row,col){
    walls[row][col]
    let pos=walls[row][col];
    let right=walls[row][col+1];    
    let bottom=walls[row+1]?walls[row+1][col]:null;
    let cR=checkRight(walls,row,col);
    let cL=checkLeft(walls,row,col-1);
    if((cL>0 || (row==0 && col==0)) && cR>0){
        let nD=setDown(walls,row+1,col,true);
        let nL=setTop(walls,row-1,col,true);
        if(nD || nL){
            if(pos=='0')walls[row][col]='L';
        }        
    } 
    if(!right && !!bottom) return setLight(walls,row+1,0);
    else if(!!right) return setLight(walls,row,col+1);
}
function checkLeft(walls,row,col){
    for(var i=col;walls[row][i];i--){
        let item=walls[row][i];
        if(item=='1') break;
        if(item=='L')return false;
    }
    return col-i;
}
function checkRight(walls,row,col){
    for(var i=col;walls[row][i];i++){
        if(walls[row][i]=='1' ) return i-col;
    }
    return i;
}
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
function setDown(walls,row,col,set){
    if(!!walls[row] && (walls[row][col]=='L' || walls[row][col]=='+'))return ;
    if(set && !!walls[row] && !!walls[row][col] && walls[row][col]==0){
        walls[row][col]='+';
        return 1+setDown(walls,row+1,col,set);
    }
    return 0;
}