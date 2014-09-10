//************************************list of Visited Path Points*************************************

var PointsVisited=new Array();

//**************************************define the map 2d matrix**************************************

var map=
[
[1,1,1,1,1,1,1,1,1,1],
[1,0,1,0,0,1,0,0,0,1],
[1,0,1,1,0,1,0,0,0,1],
[1,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,1,0,0,0,1],
[0,0,1,0,1,0,0,1,0,1],
[0,0,0,0,0,0,0,0,0,1],
[1,0,1,0,1,1,1,1,0,1],
[1,0,0,0,0,0,1,1,0,1],
[1,1,1,0,1,0,1,1,1,1]
]

//***********************************display one single path list*************************************

function DisplayPath(list){var output="";
try{for(var i=0;i<list.length;i++)
{x=list[i][1];y=list[i][0];
output+="x="+x+",y="+y+"\r\n";}}
catch(e){return("no possible path");}
return(output);}

//******************************display all paths in separated in lists*******************************

function DisplayPaths(list)
{var output="";
for(var i=0;i<list.length;i++)
{output+="\r\nPath="+i+"\r\n";
for(var i2=0;i2<list[i].length;i2++)
{x=list[i][i2][1];y=list[i][i2][0];
output+="x="+x+",y="+y+",";}}
return(output);}

//*******************************get new path points that can be moved to*****************************

function GetMoves(x1,y1)
{
var output=new Array();

//***********************************check if no wall move down one***********************************

if(y1<map.length-1){if(map[y1+1][x1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1+1,x1]))
{

//************************record this point as open move and set it as visited************************

PointsVisited[PointsVisited.length]=[y1+1,x1];
output[output.length]=[y1+1,x1];
}
}}

//**********************************check if no wall move up one**************************************

if(y1!=0){if(map[y1-1][x1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1-1,x1]))
{

//************************record this point as open move and set it as visited************************

PointsVisited[PointsVisited.length]=[y1-1,x1];
output[output.length]=[y1-1,x1];
}
}}

//*********************************check if no wall move across one***********************************

if(x1<map[y1].length){if(map[y1][x1+1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1,x1+1]))
{

//************************record this point as open move and set it as visited************************

PointsVisited[PointsVisited.length]=[y1,x1+1];
output[output.length]=[y1,x1+1];
}
}}

//***********************************check if no wall move back one***********************************

if(x1!=0){if(map[y1][x1-1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1,x1-1]))
{

//************************record this point as open move and set it as visited************************

PointsVisited[PointsVisited.length]=[y1,x1-1];
output[output.length]=[y1,x1-1];
}
}}

//******************************************return new moves******************************************

return(output);
}

//****************************************check visited pionts****************************************

function NotVisited(vp,cmp)
{
for(var i=0;i<vp.length;i++)
{
if(vp[i][1]==cmp[1]&vp[i][0]==cmp[0])
{return(false);}
}
return(true);
}

//*************************************run path finding algoritham************************************

function FindPath(x1,y1,x2,y2)
{

//*********************************************paths list*********************************************

var paths=new Array();

//*****************************************load start point in****************************************

paths[paths.length]=[[x1,y1]];

//***********************************main loop ends when all paths fail*******************************

while(paths.length>0)
{

//****extract each paths final point and expand foreword into all positions remove the original path****

x1=paths[0][paths[0].length-1][1];
y1=paths[0][paths[0].length-1][0];

//*****************************if point to goal is found return the x,y points************************

if(x1==x2&y1==y2){PointsVisited=new Array();return(paths[0]);}

//******check which directions this path can move to and then add new points into diffrent paths******

Moves=GetMoves(x1,y1);

for(var i=0;i<Moves.length;i++)
{
paths[paths.length]=paths[0].concat([Moves[i]]);
}

//************************************remove the exstended path***************************************

paths.splice(0,1);

//*************************************display the different paths************************************

WScript.echo("new paths after exstend"+DisplayPaths(paths)+"");

} //***************************************end of main loop*******************************************

//***************************return null all paths gone though no way to goal*************************

return(null);}

//******************************************call path finder******************************************

var path=FindPath(1,1,8,8);

WScript.echo("result\r\n"+DisplayPath(path)+"");
