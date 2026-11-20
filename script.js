let boardSizeX = 13
let boardSizeY = 13
let mapSquareSizeX
let mapSquareSizeY
let towerSquareSizeX
let towerSquareSizeY
let boardArray
let currentMap
let startGame = false
let levelSelected = true
let level
let difficulty
let noOfTowers = 14
let lives
let money
let roundNumber = 0
let playerLevel = 0
let playerExp = 0
let expRequired = 5000
let roundStarted = false
let fastForward = false
let runTowerPlacement = false
let hitbox
let placeTower = false
let rectanglesX = []
let rectanglesY = []
let rectanglesXW
let rectanglesYW
let towerApproved = false
let towerNumber
let towers = []
let enemies = []
let currentTime
let go = true
let enemySpeed = 100
let stopCode = false
let intervalId
let gameOver = false
let towerSelected
let startScreen = true
let enemySprites = []
let towerSprites = []
let towerStopped
let conversionFactor
let level1 = [
    [" ", " ", " ", " ", " ", " ", " ", " "," "," "," "," "],
    [" ", " ", " ", " ", " ", " ", " ", " "," "," "," "," "],
    [" ", " ", " ", " ", "P", "P", "P", " "," "," "," "," "],
    [" ", " ", " ", " ", "P", " ", "P", " ","P","P","P"," "],
    ["P", "P", "P", "P", "P", "P", "P", " ","P"," ","P"," "],
    [" ", " ", " ", " ", "P", " ", " ", " ","P"," ","P"," "],
    [" ", " ", "P", "P", "P", "P", "P", "P","P"," ","P"," "],
    [" ", " ", "P", " ", "P", " ", " ", " "," "," ","P"," "],
    [" ", " ", "P", "P", "P", " ", "P", "P","P","P","P"," "],
    [" ", " ", " ", " ", " ", " ", "P", " "," "," "," "," "],
    [" ", " ", " ", " ", " ", " ", "P", " "," "," "," "," "],
    [" ", " ", " ", " ", " ", " ", "P", " "," "," "," "," "],
    [" ", " ", " ", " ", " ", " ", "P", " "," "," "," "," "]
]
let level2 = [
    [" ", " ", " ", " ", " ", " ", " ", " "," "," "," ","P"," "],
    [" ", "P", "P", "P", "P", "P", "P", "P","P","P","P","P"," "],
    [" ", "P", " ", " ", " ", " ", " ", " "," "," "," "," "," "],
    [" ", "P", " ", "P", "P", "P", "P", "P","P","P","P"," "," "],
    [" ", "P", " ", "P", " ", " ", " ", " "," "," ","P"," "," "],
    [" ", "P", " ", "P", " ", "P", "P", "P","P","P","P"," "," "],
    [" ", "P", " ", "P", " ", "P", " ", " "," "," "," "," "," "],
    [" ", "P", " ", "P", " ", "P", "P", "P","P","P","P","P","P"],
    [" ", "P", " ", "P", " ", " ", " ", " "," "," "," "," "," "],
    [" ", "P", " ", "P", "P", "P", "P", "P","P","P","P"," "," "],
    [" ", "P", " ", " ", " ", " ", " ", " "," "," ","P"," "," "],
    [" ", "P", "P", "P", "P", "P", "P", "P","P","P","P"," "," "],
    [" ", " ", " ", " ", " ", " ", " ", " "," "," "," "," "," "]
]
let level3 = [
    [" "," " , " ", " ", " ", " ", " ", " ", " "," "," "," "," "],
    [" "," ", " ", " ", " ", " ", " ", " ", " "," "," "," "," "],
    ["P","P", "P", "P", " ", "P", "P", "P", " ","P","P","P"," "],
    [" "," ", " ", "P", " ", "P", " ", "P", " ","P"," ","P"," "],
    [" ","P", "P", "P", "P", "P", "P", "P", "P","P","P","P"," "],
    [" ","P", " ", "P", " ", "P", " ", "P", " ","P"," "," "," "],
    [" ","P", "P", "P", "P", "P", "P", "P", "P","P","P","P"," "],
    [" "," ", " ", "P", " ", "P", " ", "P", " ","P"," ","P"," "],
    ["P","P", "P", "P", "P", "P", "P", "P", "P","P","P","P"," "],
    [" "," ", " ", "P", " ", "P", " ", "P", " ","P"," "," "," "],
    [" "," ", " ", "P", "P", "P", " ", "P", "P","P"," "," "," "],
    [" "," ", " ", " ", " ", " ", " ", " ", " "," "," "," "," "],
    [" ", " "," ", " ", " ", " ", " ", " ", " "," "," "," "," "]
]

async function setup(){
    createCanvas(windowWidth, windowHeight)
    mapSquareSizeX = windowWidth / 15
    mapSquareSizeY = windowHeight / 15
    towerSquareSizeY = (mapSquareSizeY * 13) / (noOfTowers / 2 + 1)
    angleMode(DEGREES)
    rectanglesXW = mapSquareSizeX + 1
    rectanglesYW = mapSquareSizeY + 1
    if(mapSquareSizeX > mapSquareSizeY){
        conversionFactor = mapSquareSizeY/80
    }else{
        conversionFactor = mapSquareSizeX/80
    }
    //Load enemy spritesheets
    enemySprites[0] = await loadImage('Wavebreaker_Enemies/Assault_Enemy.png')
    enemySprites[1] = await loadImage('Wavebreaker_Enemies/Bomb_Enemy.png')
    enemySprites[2] = await loadImage('Wavebreaker_Enemies/Boss_Enemy.png')
    enemySprites[3] = await loadImage('Wavebreaker_Enemies/Leech_Enemy.png')
    enemySprites[4] = await loadImage('Wavebreaker_Enemies/Shield_Enemy.png')
    enemySprites[5] = await loadImage('Wavebreaker_Enemies/Siege_Enemy.png')
    enemySprites[6] = await loadImage('Wavebreaker_Enemies/Spider_Enemy.png')
    enemySprites[7] = await loadImage('Wavebreaker_Enemies/Tank_Enemy.png')
    //Load tower spritesheets
    towerSprites[0] = await loadImage('Wavebreaker_Towers/Drone_Tower.png')
    towerSprites[1] = await loadImage('Wavebreaker_Towers/emp_Tower.png')
    towerSprites[2] = await loadImage('Wavebreaker_Towers/flamethrower_Tower.png')
    towerSprites[3] = await loadImage('Wavebreaker_Towers/Gravity_Tower.png')
    towerSprites[4] = await loadImage('Wavebreaker_Towers/Ice_Tower.png')
    towerSprites[5] = await loadImage('Wavebreaker_Towers/Laser_Tower.png')
    towerSprites[6] = await loadImage('Wavebreaker_Towers/Missile_Tower.png')
    towerSprites[7] = await loadImage('Wavebreaker_Towers/Money_Tower.png')
    towerSprites[8] = await loadImage('Wavebreaker_Towers/Mortar_Tower.png')
    towerSprites[9] = await loadImage('Wavebreaker_Towers/plasma_Tower.png')
    towerSprites[10] = await loadImage('Wavebreaker_Towers/Railgun_Tower.png')
    towerSprites[11] = await loadImage('Wavebreaker_Towers/Sniper_Tower.png')
    towerSprites[12] = await loadImage('Wavebreaker_Towers/tesla_Tower.png')
    towerSprites[14] = await loadImage('Wavebreaker_Towers/Shield_Tower.png')
    towerSprites[13] = await loadImage('Wavebreaker_Towers/Repair_Tower.png')
    towerSprites[15] = await loadImage('Wavebreaker_Towers/Drones.png')
    towerSprites[16] = await loadImage('Wavebreaker_Towers/Lightning.png')
}

function draw(){
    currentTime = millis()
    background(220)
    strokeWeight(0)
    if(startScreen == true){
        fill('blue')
        rect((windowWidth / 4), (windowHeight / 4), (windowWidth / 2), (windowHeight / 2))
        fill('red')
        rect((3 * windowWidth) / 8, (3 * windowHeight) / 8, (windowWidth / 4), (windowHeight / 4))
        fill('black')
        textSize(20)
        textAlign(CENTER,CENTER)
        text('Start Game',(windowWidth / 2), (windowHeight / 2))
    }
    if(levelSelected == false){
        fill('blue')
        rect((windowWidth / 4), (windowHeight / 4), (windowWidth / 2), (windowHeight / 2))
        fill('red')
        rect(((3 * windowWidth) / 10), ((11 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        rect(((3 * windowWidth) / 10), ((7 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        rect(((9 * windowWidth) / 20), ((11 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        rect(((9 * windowWidth) / 20), ((7 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        rect(((6 * windowWidth) / 10), ((11 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        rect(((6 * windowWidth) / 10), ((7 * windowHeight) / 20), (windowWidth / 10), (windowHeight / 10))
        fill('black')
        textSize(16)
        textAlign(CENTER, CENTER)
        text('Level 1',((7 * windowWidth) / 20), ((2 * windowHeight) / 5))
        text('Level 2',(windowWidth / 2), ((2 * windowHeight) / 5))
        text('Level 3',((13 * windowWidth) / 20), ((2 * windowHeight) / 5))
        text('Easy',((7 * windowWidth) / 20), ((3 * windowHeight) / 5))
        text('Medium',(windowWidth / 2), ((3 * windowHeight) / 5))
        text('Hard',((13 * windowWidth) / 20), ((3 * windowHeight) / 5))
    }
    if(startGame == true){
        roundNumber = 1
        let z = 0
        for (let x = 0; x < boardSizeX; x++) {
            for (let y = 0; y < boardSizeY; y++) {
                if (currentMap[y][x] != "P") {
                    fill(0, 100, 0)
                    rect((x * mapSquareSizeX), (y * mapSquareSizeY), mapSquareSizeX + 1, mapSquareSizeY+1)
                } else if (currentMap[y][x] == "P") {
                    fill('brown')
                    rect((x * mapSquareSizeX), (y * mapSquareSizeY), mapSquareSizeX + 1, mapSquareSizeY+1)
                    rectanglesX[z] = x * mapSquareSizeX
                    rectanglesY[z] = y * mapSquareSizeY
                    z = z + 1
                }
            }
        }
        for(let i = 0; i <= 7; i++){
            fill('white')
            strokeWeight(1)
            rect(((boardSizeX + 1) * mapSquareSizeX) + 1, (i * towerSquareSizeY), mapSquareSizeX + 1, towerSquareSizeY + 1)
            rect(((boardSizeX) * mapSquareSizeX) + 1, (i * towerSquareSizeY), mapSquareSizeX + 1, towerSquareSizeY + 1)
        }
        let x = 0
        let yOffset
        let xOffset
        for(let i = 0; i <= noOfTowers - 1; i+=2){
            yOffset = 0
            xOffset = 0
            if(i == 10){
                yOffset = 15
                xOffset = 10
            } else if(i == 12){
                yOffset = 10
                xOffset = 5
            } else if(i == 4){
                xOffset = -5
            } else if(i == 0){
                xOffset = -5
            }
            image(towerSprites[i],(boardSizeX * mapSquareSizeX) + 1,(x + 1) * towerSquareSizeY + yOffset, mapSquareSizeX + 1, towerSquareSizeY + 1,20,25,130,130)
            image(towerSprites[i + 1],((boardSizeX + 1) * mapSquareSizeX) + 1 - xOffset, (x + 1) * towerSquareSizeY + yOffset, mapSquareSizeX + 1, towerSquareSizeY + 1,20,25,130,130)
            x += 1
        }
        fill('black')
        textSize(10)
        text('Lives:' + lives, ((9 * windowWidth) / 10) - (0.75 * 13), ((13 * windowHeight) / 240))
        text('Money:' + money, ((29 * windowWidth) / 30) - (0.75 * 13), ((13 * windowHeight) / 240))
        fill('white')
        rect((boardSizeX * mapSquareSizeX) + 1, (8 * towerSquareSizeY) + 1, (2 * mapSquareSizeX) + 1, (2 * mapSquareSizeY) - 10)
        fill('green')
        rect(((boardSizeX + 0.5) * mapSquareSizeX) + 1.25, (8 * towerSquareSizeY) + (0.5 * mapSquareSizeY) - 6.5, mapSquareSizeX + 0.5, mapSquareSizeY - 15)
        if(!roundStarted){
        fill(144, 238, 144)
        triangle((boardSizeX + 0.75) * mapSquareSizeX + 1.25, (8 * towerSquareSizeY) + (0.75 * mapSquareSizeY) - (41/4),
        (boardSizeX + 0.75) * mapSquareSizeX + 1.25, (8* towerSquareSizeY) + (1.25 * mapSquareSizeY) - (71/4),
        (boardSizeX + 1.25) * mapSquareSizeX + 1.25, (8*towerSquareSizeY) + mapSquareSizeY - 14)
        }else if(roundStarted){
            if(!fastForward){
                fill(144, 238, 144)
            }else{
                fill(84, 255, 10)
            }
            triangle((boardSizeX + 0.75) * mapSquareSizeX + 1.25, (8 * towerSquareSizeY) + (0.75 * mapSquareSizeY) - (41/4),
            (boardSizeX + 0.75) * mapSquareSizeX + 1.25, (8* towerSquareSizeY) + (1.25 * mapSquareSizeY) - (71/4),
            ((boardSizeX + 1) * mapSquareSizeX) + 1.5, (8*towerSquareSizeY) + mapSquareSizeY - 14)
            triangle(((boardSizeX + 1) * mapSquareSizeX), (8 * towerSquareSizeY) + (0.75 * mapSquareSizeY) - (41/4),
            ((boardSizeX + 1) * mapSquareSizeX), (8* towerSquareSizeY) + (1.25 * mapSquareSizeY) - (71/4),
            (boardSizeX + 1.25) * mapSquareSizeX + 1.25, (8*towerSquareSizeY) + mapSquareSizeY - 14)
        }
        fill('white')   
        rect(1, (13 * mapSquareSizeY) + 1, (6.5 * mapSquareSizeX), (2 * mapSquareSizeY) - 10)
        rect((6.5 * mapSquareSizeX) + 1, (13 * mapSquareSizeY) + 1, (6.5 * mapSquareSizeX), (2 * mapSquareSizeY) - 10)
        fill('black')
        textSize(20)
        text("Round " + roundNumber,(3.25 * mapSquareSizeX) + 0.5, (14 * mapSquareSizeY) - 30)
        text("Player Level: " + playerLevel, (9.75 * mapSquareSizeX) + 0.5, (14 * mapSquareSizeY) - 30)
        fill('white')
        rect((117 * mapSquareSizeX) / 16, (14 * mapSquareSizeY), (39 * mapSquareSizeX) / 8, (0.5 * mapSquareSizeY) - 7.5)
        fill('green')
        rect((117 * mapSquareSizeX) / 16, (14 * mapSquareSizeY), ((39 * mapSquareSizeX) / 8) * (playerExp / expRequired), (0.5 * mapSquareSizeY) - 7.5)
        if (runTowerPlacement) {
            isCollidingWithPath(mouseX, mouseY)
            towers[towers.length - 1].xCoordinate = mouseX
            towers[towers.length - 1].yCoordinate = mouseY
            if(towerApproved){
                fill(138, 138, 132, 128)
            } else{
                fill(255, 0, 0, 128)
            }
            circle(mouseX,mouseY,towers[towers.length - 1].attackRadius * 2)
        }
        for(t of towers){
            t.draw()
            t.update()
        }
        for(e of enemies){
            let currentTime = millis()
            e.update(currentTime)
            e.draw()
            if(stopCode){
                clearInterval(intervalId)
                enemies.splice(0,10000000)
                startRound()
                fastForward = false
                startGame = false
                gameOver = true
            }
        }
    }
    if(gameOver){
        fill('red')
        rect((windowWidth / 4), (windowHeight / 4), (windowWidth / 2), (windowHeight / 2))
        textSize(75)
        textAlign(CENTER , BOTTOM)
        fill('black')
        text('GAME OVER' , windowWidth / 2, (3 * windowHeight) / 8)
        fill('white')
        rect((3 * windowWidth / 8), 7 * windowHeight / 16, windowWidth / 4, windowHeight / 4)
        fill('black')
        textAlign(CENTER, CENTER)
        textSize(26)
        text("Return to" , windowWidth / 2, 9 * windowHeight / 16 - 13)
        text("Level Select" , windowWidth / 2, 9 * windowHeight / 16 + 13)
    }
}

function levelSelect(){
    levelSelected = false
    currentMap = ""
    difficulty = ""
}

function mouseClicked(){
    let x = mouseX
    let y = mouseY
    if(startScreen){
        if(x >= ((3 * windowWidth) / 8) && x <= ((5 * windowWidth) / 8) && y >= ((3 * windowHeight) / 8) && y <= ((5 * windowHeight) / 8)){
            levelSelect()
            startGame = false
            enemies = []
            towers = []
            startScreen = false
        }
    }
    if((x>= boardSizeX * mapSquareSizeX || y >= boardSizeY * mapSquareSizeY) && !towerApproved && runTowerPlacement){
        towers.pop()
        towerStopped = true
    }
    if(!levelSelected){
        if(x >= ((3 * windowWidth) / 10) && x <= ((2 * windowWidth) / 5)){
            if(y <= ((9 * windowHeight) / 20) && y >= ((7 * windowHeight) / 20)){
                currentMap = level1
            }
            if(y >= ((11 * windowHeight) / 20) && y <= ((13 * windowHeight) / 20)){
                difficulty = 'easy'
                lives = 200
                money = 500
            }
        }
        if(x >= ((9 * windowWidth) / 20) && x <= ((11 * windowWidth) / 20)){
            if(y <= ((9 * windowHeight) / 20) && y >= ((7 * windowHeight) / 20)){
                currentMap = level2
            }
            if(y >= ((11 * windowHeight) / 20) && y <= ((13 * windowHeight) / 20)){
                difficulty = 'medium'
                lives = 150
                money = 375
            }
        }
        if(x >= ((6 * windowWidth) / 10) && x <= ((7 * windowWidth) / 10)){
            if(y <= ((9 * windowHeight) / 20) && y >= ((7 * windowHeight) / 20)){
                currentMap = level3
            }
            if(y >= ((11 * windowHeight) / 20) && y <= ((13 * windowHeight) / 20)){
                difficulty = 'hard'
                lives = 100
                money = 250
            }
        }
        if(currentMap != "" && difficulty != ""){    
            levelSelected = true
            startGame = true
        }
    }
    if(x >= ((boardSizeX + 0.5) * mapSquareSizeX) + 1.25 && x <= ((boardSizeX + 1.5) * mapSquareSizeX) + 1.75 && y >= (8 * towerSquareSizeY) + (0.5 * mapSquareSizeY) - 6.5 && y <=  (8 * towerSquareSizeY) + (1.5 * mapSquareSizeY) - 21.5){
        if(!roundStarted){
            startRound()
            runEnemies()
        }else{
            fastForward = !fastForward
            if(fastForward){
                for(e of enemies){e.speed = e.speed * 2}
                enemySpeed = 2 * enemySpeed
                for(t of towers){t.attackSpeed = t.attackSpeed / 2.45}
            } else if(!fastForward){
                for(e of enemies){e.speed = e.speed / 2}
                enemySpeed = enemySpeed / 2
                for(t of towers){t.attackSpeed = t.attackSpeed * 2.45}
            }
        }
    }
    if(!towerStopped){
        if(x >= ((boardSizeX) * mapSquareSizeX) + 1 && x <= ((boardSizeX + 1) * mapSquareSizeX) + 2){
            if(y >= towerSquareSizeY && y <= 8 * towerSquareSizeY){
                towerNumber = (2 * Math.floor(y/towerSquareSizeY)) - 1
                selectTower(towerNumber)
            }
        } else if(x >= ((boardSizeX + 1) * mapSquareSizeX) + 2 && x <= windowWidth){
            if(y >= towerSquareSizeY && y <= 8 * towerSquareSizeY){
                towerNumber = 2 * Math.floor(y/towerSquareSizeY)
                selectTower(towerNumber)
            }
        }
    } else{
        runTowerPlacement = !runTowerPlacement
        towerStopped = !towerStopped
    }
    if(towerApproved){
        runTowerPlacement = !runTowerPlacement
        towerApproved = !towerApproved
        if(towerNumber == 1){
            if(difficulty == "easy"){
                if(money >= 50){
                    towers[towers.length - 1].xCoordinate = x
                    towers[towers.length - 1].yCoordinate = y
                    money -= 50
                
                }
            }else if(difficulty == "medium"){
                if(money >= 100){
                    towers[towers.length - 1].xCoordinate = x
                    towers[towers.length - 1].yCoordinate = y
                    money -= 100
                }
            } else{
                if(money >= 150){
                    towers[towers.length - 1].xCoordinate = x
                    towers[towers.length - 1].yCoordinate = y
                    money -= 150
                }
            }
        }
        towers[towers.length - 1].towerPlaced = true
        towers[towers.length - 1].currentTime = millis()
    }
    if(x >= (3 * windowWidth / 8) && x <= (5 * windowWidth / 8) && y >= 7 * windowHeight / 16 && y <= 11 * windowHeight / 16 && stopCode == true){
        gameOver = false
        stopCode = false
        for(e of enemies){e.speed = e.speed / 2}
        enemySpeed = enemySpeed / 2
        towers.splice(0,100000000)    
        rectanglesX = []
        rectanglesY = []
        initialiseGame()
    }
    for(t of towers){
        let distX = x - t.xCoordinate
        let distY = y - t.yCoordinate
        let distance = Math.sqrt((distX ** 2) + (distY ** 2))
        if(distance <= t.hitbox){
            towerSelected = towers.indexOf(t)
        }
    }
}

function increaseExp(enemyDefeated){
    if(enemyDefeated == 1){
        playerExp += 100
        money += 10
    }else if(enemyDefeated ==2){
        playerExp += 250
        money += 25
    }else if(enemyDefeated == 3){
        playerExp += 500
        money += 50
    }else if(enemyDefeated == 4){
        playerExp += 1000
        money += 100
    }
    if(playerExp >= expRequired){
        playerExp -= expRequired
        playerLevel += 1
        expRequired = expRequired * 1.1
    }
}

function startRound(){
    roundStarted = !roundStarted
}

function selectTower(towerNumber){
    if(!runTowerPlacement){
            switch(towerNumber){
                case 1:
                    towers.push(new DroneTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 76 * conversionFactor
                    break;
                case 2:
                    towers.push(new EmpTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 68 * conversionFactor
                    break;
                case 3:
                    towers.push(new FlamethrowerTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 76 * conversionFactor
                    break;
                case 4:
                    towers.push(new GravityTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 80 * conversionFactor
                    break;
                case 5:
                    towers.push(new IceTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 80 * conversionFactor
                    break;
                case 6:
                    towers.push(new LaserTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 64 * conversionFactor
                    break;
                case 7:
                    towers.push(new MissileTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 70 * conversionFactor
                    break;
                case 8:
                    towers.push(new MoneyTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 76 * conversionFactor
                    break;
                case 9:
                    towers.push(new MortarTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 84 * conversionFactor
                    break;
                case 10:
                    towers.push(new PlasmaTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 70 * conversionFactor
                    break;
                case 11:
                    towers.push(new RailgunTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 75 * conversionFactor
                    break;
                case 12:
                    towers.push(new SniperTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 93 * conversionFactor
                    break;
                case 13:
                    towers.push(new TeslaTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 93 * conversionFactor
                    break;
                case 14:
                    towers.push(new RepairTower(mouseX,mouseY))
                    runTowerPlacement = !runTowerPlacement
                    hitbox = 93 * conversionFactor
                    break;
            }
        }
}


function isCollidingWithPath(mouseX, mouseY) {
    let distance = 99999999
    let testX
    let testY
    if(mouseX < mapSquareSizeX * 13 - hitbox / 2 && mouseY < mapSquareSizeY * 13 - hitbox / 2){
        for (let i = 0; i < rectanglesX.length; i++) {
            if (mouseX < rectanglesX[i]) {
                testX = rectanglesX[i]
            } else if (mouseX > (rectanglesX[i] + rectanglesXW)) {
                testX = rectanglesX[i] + rectanglesXW
            } else if (mouseX >= rectanglesX[i] && mouseX <= (rectanglesX[i] + rectanglesXW)) {
                testX = mouseX
            }
            if (mouseY < rectanglesY[i]) {
                testY = rectanglesY[i]
            } else if (mouseY > (rectanglesY[i] + rectanglesYW)) {
                testY = rectanglesY[i] + rectanglesYW
            } else if (mouseY >= rectanglesY[i] && (mouseY <= rectanglesY[i] + rectanglesYW)) {
                testY = mouseY
            }
            let distX = mouseX - testX
            let distY = mouseY - testY
            let tempDistance = Math.sqrt((distX * distX) + (distY * distY))
            if (tempDistance < distance) {
                distance = tempDistance
            }
        }
        let touchingTower = false
        for(const t of towers){
            if(towers.indexOf(t) != towers.length-1){
                if(Math.sqrt((mouseX - t.xCoordinate) **2 + (mouseY - t.yCoordinate) ** 2) <= (hitbox + t.hitbox) / 2){
                    touchingTower = true
                    console.log('h')
                }
            }
        }
        if (distance <= (hitbox / 2) || touchingTower) {
            towerApproved = false
        } else {
            towerApproved = true
        }
    } else{
        towerApproved = false
    }
}

function runEnemies(){
    intervalId = setInterval(newEnemy,1000)
}
function newEnemy(){
    let enemyHitbox
    let maxEnemy
    if(playerLevel <= 1){
        maxEnemy = 1
    } else if(playerLevel <= 3){
        maxEnemy = 2
    } else if(playerLevel <= 5){
        maxEnemy = 3
    } else{
        maxEnemy = 4
    }
    let enemyNumber = Math.floor(Math.random() * maxEnemy)
    if(mapSquareSizeX > mapSquareSizeY){
        enemyHitbox = mapSquareSizeY * 0.5
    } else{
        enemyHitbox = mapSquareSizeX * 0.5
    }
    let startX
    let startY
    if(currentMap == level1){
        startY = 4.5 * mapSquareSizeY
        startX = enemyHitbox / 2
    }else if(currentMap == level2){
        startY = enemyHitbox / 2
        startX = 11.5 * mapSquareSizeX
    }else if(currentMap == level3){
        startY = 2.5 * mapSquareSizeY
        startX = enemyHitbox / 2
    }
    if(playerLevel >= 10){
        enemySpeed = playerLevel * 10
    }
    if(enemyNumber == 0){
        enemies.push(new AssaultEnemy(enemyHitbox , startX, startY,enemySpeed * 0.5, currentTime, 10))
    } else if(enemyNumber == 1){
        enemies.push(new BombEnemy(enemyHitbox , startX, startY,enemySpeed, currentTime, 20))
    } else if(enemyNumber == 2){
        enemies.push(new LeechEnemy(enemyHitbox , startX, startY,enemySpeed * 1.5, currentTime, 25))
    } else if(enemyNumber == 3){
        enemies.push(new ShieldEnemy(enemyHitbox , startX, startY,enemySpeed * 2, currentTime, 50))
    }
}