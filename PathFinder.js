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

//***************************************display one single path list**************************************

function DisplayPath(list)
{var output="";
try{for(var i=0;i<list.length;i++)
{x=list[i][1];y=list[i][0];
output+="x="+x+",y="+y+"\r\n";}}
catch(e){return("no possible path");}
return(output);}

//*****************************display all paths in separated in lists*************************

function DisplayPaths(list)
{var output="";
for(var i=0;i<list.length;i++)
{output+="\r\nPath="+i+"\r\n";
for(var i2=0;i2<list[i].length;i2++)
{x=list[i][i2][1];y=list[i][i2][0];
output+="x="+x+",y="+y+",";}}
return(output);}

//****************************************check visited pionts****************************************

function NotVisited(vp,cmp)
{
for(var i=0;i<vp.length;i++)
{
if(vp[i][1]==cmp[1]&vp[i][0]==cmp[0])
{
return(false);
}
}
return(true);
}

//*************************************run path finding algoritham************************************

function FindPath(x1,y1,x2,y2)
{

//**************************store all points traveled an an fast to read list*************************

var PointsVisited=new Array();

//******************************************new and old paths*****************************************

var original=new Array();
var newpaths=new Array();

//*****************************************load start point in****************************************

original[original.length]=[[x1,y1]];

//***********************************main loop ends when all paths fail*******************************

while(original.length>0|newpaths.length>0)
{

//****extract each paths final point and expand foreword into all positions remove the original path****

while(original.length>0)
{
//****************************get x and y of an path and continue path forward************************

x1=original[0][original[0].length-1][1];
y1=original[0][original[0].length-1][0];

if(x1==x2&y1==y2){return(original[0]);} //*******if point to goal is found return the x,y points******

//***********************************check if no wall move down one***********************************

if(y1<map.length-1){if(map[y1+1][x1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1+1,x1]))
{

//*****************************add this to an new path and as visited point***************************

PointsVisited[PointsVisited.length]=[y1+1,x1];
newpaths[newpaths.length]=original[0].concat([[y1+1,x1]]);

}

}}

//**********************************check if no wall move up one**************************************

if(y1!=0){if(map[y1-1][x1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1-1,x1]))
{

//*****************************add this to an new path and as visited point***************************

PointsVisited[PointsVisited.length]=[y1-1,x1];
newpaths[newpaths.length]=original[0].concat([[y1-1,x1]]);

}

}}

//*********************************check if no wall move across one***********************************

if(x1<map[y1].length){if(map[y1][x1+1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1,x1+1]))
{

//*****************************add this to an new path and as visited point***************************

PointsVisited[PointsVisited.length]=[y1,x1+1];
newpaths[newpaths.length]=original[0].concat([[y1,x1+1]]);

}

}}

//***********************************check if no wall move back one***********************************

if(x1!=0)
{
if(map[y1][x1-1]==0)
{
//**********************check if the point has been previusly visited by another**********************

if(NotVisited(PointsVisited,[y1,x1-1]))
{

//*****************************add this to an new path and as visited point***************************

PointsVisited[PointsVisited.length]=[y1,x1-1];
newpaths[newpaths.length]=original[0].concat([[y1,x1-1]]);

}

}}

//****************************************remove extended path****************************************

original.splice(0,1);} //******************************end of while loop******************************

//*****************************************************************************************************
//copy the new paths to the original paths and reset the new paths then start expanding the paths again
//*****************************************************************************************************

original=new Array();original=original.concat(newpaths);newpaths=new Array();

//*************************************display the different paths************************************

WScript.echo("new paths after exstend"+DisplayPaths(original)+"");

} //***************************************end of main loop*******************************************

//***************************return null all paths gone though no way to goal*************************

return(null);}

//******************************************call path finder******************************************

var path=FindPath(1,1,8,8);

WScript.echo("result\r\n"+DisplayPath(path)+"");
