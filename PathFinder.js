//**************************************define the map 2d matrix**************************************

var map=
[
[1,1,1,1,1,1,1,1,1,1],
[1,0,1,0,0,1,0,0,0,1],
[1,0,1,1,0,1,0,0,0,1],
[1,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,1,0,0,0,1],
[1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,0,0,0,1],
[1,0,1,0,1,1,1,1,0,1],
[1,0,0,0,0,0,1,1,0,1],
[1,1,1,1,1,1,1,1,1,1]
]

//***************************************display one single path list**************************************

function DisplayPath(list)
{var output="";
for(var i=0;i<list.length;i++)
{x=list[i][1];y=list[i][0];
output+="x="+x+",y="+y+"\r\n";}
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

//************************************check for non progressing paths**********************************

function CheckLoopBack(points)
{var cmpX=0,cmpY=0;
for(var pointC1=points.length-1;pointC1>0;pointC1--)
{cmpX=points[pointC1][1];cmpY=points[pointC1][0];
for(var pointC2=points.length-1;pointC2>0;pointC2--)
{if((cmpX==points[pointC2][1]&cmpY==points[pointC2][0])&pointC2!=pointC1)
{return(true);}}};return(false);
}

//*************************************run path finding algoritham************************************

function FindPath(x1,y1,x2,y2)
{
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

if(y1<map.length){if(map[y1+1][x1]==0)
{
//***************************************add this to an new path**************************************

newpaths[newpaths.length]=original[0].concat([[y1+1,x1]]);

//******************************************************************************************************
//if it loops back to an older point in the path delete this move in new copied path from originals path
//******************************************************************************************************

if(CheckLoopBack(newpaths[newpaths.length-1])){newpaths.splice(newpaths.length-1,1);}}}

//**********************************check if no wall move up one**************************************

if(y1!=0){if(map[y1-1][x1]==0)
{
//*************************************add this to an new path****************************************

newpaths[newpaths.length]=original[0].concat([[y1-1,x1]]);

//******************************************************************************************************
//if it loops back to an older point in the path delete this move in new copied path from originals path
//******************************************************************************************************

if(CheckLoopBack(newpaths[newpaths.length-1])){newpaths.splice(newpaths.length-1,1);}}}

//*********************************check if no wall move across one***********************************

if(x1<map[y1].length){if(map[y1][x1+1]==0)
{
//**************************************add this to an new path***************************************

newpaths[newpaths.length]=original[0].concat([[y1,x1+1]]);

//******************************************************************************************************
//if it loops back to an older point in the path delete this move in new copied path from originals path
//******************************************************************************************************

if(CheckLoopBack(newpaths[newpaths.length-1])){newpaths.splice(newpaths.length-1,1);}}}

//***********************************check if no wall move back one***********************************

if(x1!=0)
{
if(map[y1][x1-1]==0)
{
//**************************************add this to an new path***************************************

newpaths[newpaths.length]=original[0].concat([[y1,x1-1]]);

//******************************************************************************************************
//if it loops back to an older point in the path delete this move in new copied path from originals path
//******************************************************************************************************

if(CheckLoopBack(newpaths[newpaths.length-1])){newpaths.splice(newpaths.length-1,1);}}}

//****************************************remove extended path****************************************

original.splice(0,1);} //end of while loop

//*****************************************************************************************************
//copy the new paths to the original paths and reset the new paths then start expanding the paths again
//*****************************************************************************************************

original=new Array();
original=original.concat(newpaths);
newpaths=new Array();

//************************************display the different paths************************************

WScript.echo("new paths after exstend"+DisplayPaths(original)+"");} //end of main loop

//***************************return null all paths gone though no way to goal*************************

return(null);}

//******************************************call path finder******************************************

var path=FindPath(1,1,8,8);

WScript.echo("result\r\n"+DisplayPath(path)+"");
