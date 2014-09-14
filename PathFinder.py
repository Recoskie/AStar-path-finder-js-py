import copy
import math

map=[
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

#***************************print the found path************************************

def PrintPath(PathPoints):
    int1=0
    for i in PathPoints:
        int1+=1
        print "point "+str(int1)+" is x="+str(i[0])+",y="+str(i[1])

#********************************print paths****************************************

def PrintPaths(PathList):
    int1=0
    for i in PathList:
        int1+=1
        print "path="+str(int1)
        for i2 in i:
            print "x="+str(i2[0])+",y="+str(i2[1])

#*******************************visited squares**************************************

VisitedList=[]

#***Improves performance find closest Path to destination rearrange the path list****
#************************to scan the shortest path first*****************************
#****************************uses pythagoras theorem*********************************

def getClosestPath(x2, y2, paths ):
    PathElement=0
    CurrentDif=0
    OldDif=0

    PathElement=0
    OldDif=math.sqrt((math.pow((x2-paths[0][len(paths[0])-1][0]),2)+math.pow((y2-paths[0][len(paths[0])-1][1]),2)))

    for i in range(1,len(paths)):
        CurrentDif=math.sqrt((math.pow((x2-paths[i][len(paths[i])-1][0]),2)+math.pow((y2-paths[i][len(paths[i])-1][1]),2)))

        if(CurrentDif<OldDif):
                PathElement=i
                OldDif=CurrentDif

    if(not PathElement==0):
        c=copy.copy(paths[0])
        paths[0]=paths[PathElement]
        paths[PathElement]=c

    return(paths )

#********************check if Point has not been Visited****************************

def NotVisited(x1, y1 ):

    global VisitedList
    
    for i1 in reversed(VisitedList):
        if(i1[0]==x1 and i1[1]==y1):
            return(False)
    return(True)

#********************************get each move**************************************

def GetMoves(x1, y1 ):
    
    global VisitedList
    
    #the returned move list
    MoveList=[]
    
    #check up one
    if(not y1==0):
        #if no wall
        if(map[y1-1][x1]==0):
            #only if unvisited
            if(NotVisited(x1, y1-1 )):
                #add to visited list
                VisitedList.append([x1, y1-1 ] )
                #add to move list
                MoveList.append([x1, y1-1 ] )

    #check down one
    if(y1<len(map)-1):
        #if no wall
        if(map[y1+1][x1]==0):
            #only if unvisited
            if(NotVisited(x1, y1+1 )):
                #add to visited list
                VisitedList.append([x1, y1+1 ] )
                #add to move list
                MoveList.append([x1, y1+1 ] )

    #check to the left
    if(not x1==0):
        #if no wall
        if(map[y1][x1-1]==0):
            #only if unvisited
            if(NotVisited(x1-1, y1 )):
                #add to visited list
                VisitedList.append([x1-1, y1 ] )
                #add to Move list
                MoveList.append([x1-1, y1 ] )

    #check to the right
    if(x1<len(map)-1):
        #if no wall
        if(map[y1][x1+1]==0):
            #only if unvisited
            if(NotVisited(x1+1, y1 )):
                #add to visited list
                VisitedList.append([x1+1, y1 ])
                #add to Move List
                MoveList.append([x1+1, y1 ])

    #return the moves that can be made from current path

    return(MoveList)

#*************************path finding algorithm start*****************************

def PathFinder(x1, y1, x2, y2 ):

    IsPaths=True

    global VisitedList
    VisitedList=[[x1, y1 ]]
    PathList=[ [ [x1, y1 ] ] ]

    while IsPaths:
        
        x=PathList[0][len(PathList[0])-1][0]
        y=PathList[0][len(PathList[0])-1][1]

        #if path reached goal return path points to goal
        if(x==x2 and y==y2 ):
            print "*****************************************************************"
            print "Path found"
            print "*****************************************************************"
            return(PathList[0])
        
        m=GetMoves(x, y )
        
        for i in m:
            c=copy.copy(PathList[0])
            c.append(i)
            c=copy.copy(c)
            PathList.append(c)
        
        PathList.pop(0)

        #stop if no more paths
        
        if not PathList:
            IsPaths=False
        else:
            #rearange paths for performance

            PathList=getClosestPath(x2, y2, PathList )

            #leave these two lines in for makeing shure path finder works

            print "*********************************************************************"
            PrintPaths(PathList)

            #end of the two lines

    #if no path to destination send back start point
    return([[x1,y1]])

#test the path finder

Path=PathFinder(1,1,8,8)

#print the path if path found if path is not found just the start point will print

PrintPath(Path )
