import copy

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

VisitedList=[[]]

#Improves performace Estmite Closest Path rearange the path list********************
#to scan the shortest path first****************************************************

def EstimateBestPath(x2, y2, paths ):
    PathElement=0
    
    CurrentYDif=0
    CurrentXDif=0
    
    Clength=0
    Olength=0

    OldXDif=0
    OldYDif=0

    Olength=len(paths[0])
    
    #find longest progressed path keep moving to direction of goal

    for i in range(0,len(paths)):
        Clength=len(paths[i])
        if(Clength>Olength):
            PathElement=i
            OldXDif=x2-paths[i][len(paths[i])-1][0]
            OldYDif=y2-paths[i][len(paths[i])-1][1]
            Olength=Clength

    #best path scan
    for i in range(0,len(paths)):
        CurrentXDif=x2-paths[i][len(paths[i])-1][0]
        CurrentYDif=y2-paths[i][len(paths[i])-1][1]

        if(CurrentYDif<=OldYDif and CurrentXDif<=OldXDif and len(paths[i])==Olength ):
            PathElement=i
            OldXDif=CurrentXDif
            OldYDif=CurrentYDif

    #flip the best path to first element to scan by algoritham
    print "best path change 1 with "+str(PathElement+1)
    if(not PathElement==0):
        c=copy.copy(paths[0])
        paths[0]=paths[PathElement]
        paths[PathElement]=c

    #print "**************************paths changed to**************************"
    #PrintPaths(paths)

    #return path rearangement
    return(paths )

#********************check if Point has not been Visited****************************

def NotVisited(x1, y1 ):

    global VisitedList
    
    for i1 in reversed(VisitedList):
        if(i1[0]==x1 and i1[1]==y1):
            return(False)
    return(True)

#********************************get each move**************************************
#****************this must be rewritten for the collision engine***********************

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

        #print str(m)
        
        for i in m:
            c=copy.copy(PathList[0])
            c.append(i)
            c=copy.copy(c)
            PathList.append(c)
        
        PathList.pop(0)

        #leave these two lines in for making sure path finder works

        #print "*********************************************************************"
        #PrintPaths(PathList)

        #end if the two lines

        #stop if no more paths
        
        if not PathList:
            IsPaths=False

        #rearange paths for performance
        PathList=EstimateBestPath(x2, y2, PathList )

    #if no path to destnaion send back start point
    return([[x1,y1]])

#test the path finder

Path=PathFinder(1,2,8,8)

#print the path if path found if path is not found just the start point will print

PrintPath(Path )
 
