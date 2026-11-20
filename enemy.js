class Enemy {
    constructor(x,y,hitbox, health){
        this.xCoordinate = x
        this.yCoordinate = y
        this.hitbox = hitbox
        this.health = health
    }
    update(currentTime){
        let runCode = false
        let nextGridSquareXPos
        let nextGridSquareYPos
        let nextGridSquareXNeg
        let nextGridSquareYNeg
        let coordinateChange = ((currentTime - this.time) / 1000) * this.speed
        if(0 <= Math.floor((this.xCoordinate + (mapSquareSizeX / 2) + coordinateChange - 2) / mapSquareSizeX) && Math.floor((this.xCoordinate + (mapSquareSizeX / 2) + coordinateChange + 1) / mapSquareSizeX) <= 12){
            nextGridSquareXPos = currentMap[Math.floor(this.yCoordinate / mapSquareSizeY)][Math.floor((this.xCoordinate + (mapSquareSizeX / 2) + coordinateChange + 1) / mapSquareSizeX)]
        }
        if(0 <= Math.floor((this.yCoordinate + (mapSquareSizeY / 2) + coordinateChange - 2) / mapSquareSizeY) && Math.floor((this.yCoordinate + (mapSquareSizeY / 2) + coordinateChange + 1) / mapSquareSizeY) <= 12){
            nextGridSquareYPos = currentMap[Math.floor((this.yCoordinate + (mapSquareSizeY / 2) + coordinateChange + 1) / mapSquareSizeY)][Math.floor(this.xCoordinate / mapSquareSizeX)]
        }
        if(0 <= Math.floor((this.xCoordinate - ((mapSquareSizeX / 2) + coordinateChange + 2)) / mapSquareSizeX) && Math.floor((this.xCoordinate - ((mapSquareSizeX / 2) + coordinateChange + 1)) / mapSquareSizeX) <= 12){
            nextGridSquareXNeg = currentMap[Math.floor(this.yCoordinate / mapSquareSizeY)][Math.floor((this.xCoordinate - ((mapSquareSizeX / 2) + coordinateChange + 1)) / mapSquareSizeX)]
        }
        if(0 <= Math.floor((this.yCoordinate - ((mapSquareSizeY / 2) + coordinateChange + 2)) / mapSquareSizeY) && Math.floor((this.yCoordinate - ((mapSquareSizeY / 2) + coordinateChange)) / mapSquareSizeY) <= 12){
            nextGridSquareYNeg = currentMap[Math.floor((this.yCoordinate - ((mapSquareSizeY / 2) + coordinateChange + 1)) / mapSquareSizeY)][Math.floor(this.xCoordinate / mapSquareSizeX)]
        }
        if(this.directionChange == 'x'){
            if(nextGridSquareXPos != 'P'){
                runCode = true
            } else{
                runCode = false
            }
        } else if(this.directionChange == 'y'){
            if(nextGridSquareYPos != 'P'){
                runCode = true
            } else{
                runCode = false
            }
        } else if(this.directionChange == '-x'){
            if(nextGridSquareXNeg != 'P'){
                runCode = true
            } else{
                runCode = false
            }
        } else if(this.directionChange == '-y'){
            if(nextGridSquareYNeg != 'P'){
                runCode = true
            } else{
                runCode = false
            }
        }
        if(runCode){
            if(nextGridSquareXPos == "P" && this.directionChange != '-x'){
                this.directionChange = 'x'
            } else if(nextGridSquareYPos == 'P' && this.directionChange != '-y'){
                this.directionChange = 'y'
            } else if(nextGridSquareXNeg == 'P' && this.directionChange != 'x'){
                this.directionChange = '-x'
            } else if(nextGridSquareYNeg == 'P' && this.directionChange != 'y'){
                this.directionChange = '-y'
            }
        }
        if(this.directionChange == 'x'){
            this.xCoordinate += coordinateChange
        } else if(this.directionChange == 'y'){
            this.yCoordinate += coordinateChange
        } else if(this.directionChange == '-x'){
            this.xCoordinate -= coordinateChange
        } else if(this.directionChange == '-y'){
            this.yCoordinate -= coordinateChange
        }
        if(runCode){
            if(nextGridSquareXNeg != undefined && nextGridSquareXPos != undefined && nextGridSquareYNeg != undefined && nextGridSquareYPos != undefined){
                this.xCoordinate = (Math.floor(this.xCoordinate / mapSquareSizeX) + 0.5) * mapSquareSizeX
                this.yCoordinate = (Math.floor(this.yCoordinate / mapSquareSizeY) + 0.5) * mapSquareSizeY
            }
        }
        this.time = millis()
        if(this.xCoordinate <= this.hitbox / 2 || this.xCoordinate >= mapSquareSizeX * 13 - (this.hitbox / 2) || this.yCoordinate <= this.hitbox / 2 || this.yCoordinate >= mapSquareSizeY * 13 - (this.hitbox / 2)){
            lives -= 10
            enemies.splice(enemies.indexOf(this),1)
            if(lives <= 0){
                stopCode = true
            }
        }
        if(this.health <= 0){
            increaseExp(this.number)
            enemies.splice(enemies.indexOf(this),1)
        }
    }
}

class Enemy1 extends Enemy{
    constructor(hitbox,x,y,movementSpeed,currentTime, health){
        super(x,y,hitbox, health)
        this.speed = movementSpeed
        this.time = currentTime
        this.startTime = currentTime
        this.directionChange = 'x'
        this.number = 1
    }
    draw(){
        fill('red')
        circle(this.xCoordinate,this.yCoordinate,this.hitbox)
    }
}

class Enemy2 extends Enemy{
    constructor(hitbox,x,y,movementSpeed,currentTime, health){
        super(x,y,hitbox, health)
        this.speed = movementSpeed
        this.time = currentTime
        this.startTime = currentTime
        this.directionChange = 'x'
        this.number = 2
    }
    draw(){
        fill('blue')
        circle(this.xCoordinate,this.yCoordinate,this.hitbox)
    }
}

class Enemy3 extends Enemy{
    constructor(hitbox,x,y,movementSpeed,currentTime, health){
        super(x,y,hitbox, health)
        this.speed = movementSpeed
        this.time = currentTime
        this.startTime = currentTime
        this.directionChange = 'x'
        this.number = 3
    }
    draw(){
        fill('black')
        circle(this.xCoordinate,this.yCoordinate,this.hitbox)
    }
}

class Enemy4 extends Enemy{
    constructor(hitbox,x,y,movementSpeed,currentTime, health){
        super(x,y,hitbox, health)
        this.speed = movementSpeed
        this.time = currentTime
        this.startTime = currentTime
        this.directionChange = 'x'
        this.number = 4
    }
    draw(){
        fill('purple')
        circle(this.xCoordinate,this.yCoordinate,this.hitbox)
    }
}