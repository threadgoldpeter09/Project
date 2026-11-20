//Tower parent class
class Tower {
    constructor(x,y){
        this.xCoordinate = x
        this.yCoordinate = y
        this.currentTime = millis()
        //Tower upgrade map
        this.upgrades = [0,0,0]
        this.experience = 0
        this.xOffset = 0
        this.yOffset = 0
        this.towerPlaced = false
    }
    //The draw function is in the parent class because it is identical for all towers
    draw(){
        let towerSizeX = (mapSquareSizeX + 1) * conversionFactor
        let towerSizeY = (towerSquareSizeY + 1) * conversionFactor
        let towerX = this.xCoordinate - (((mapSquareSizeX + 1) / 2) + this.xOffset) * conversionFactor
        let towerY = this.yCoordinate - (((towerSquareSizeY + 1) / 2) + this.yOffset) * conversionFactor
        image(towerSprites[this.number],towerX,towerY, towerSizeX, towerSizeY,20,25,130,130)
    }
    //The update function is in the parent class because it is the same for all towers, except the Money Tower
    update(){
        let time = millis() - this.currentTime
        for(const e of enemies){
            let distance = Math.sqrt((e.xCoordinate - this.xCoordinate)** 2 + (e.yCoordinate - this.yCoordinate)**2)
            //This code runs only if the enemy is within the attack range of the tower 
            //and it has been longer than the attack cooldown time since the last attack
            if(distance - e.hitbox <= this.attackRadius && time >= this.attackSpeed){
                e.health -= this.damage
                this.currentTime = millis()
                //This then checks which enemy has been killed and increases the tower's experience accordingly
                if(e.number == 1){
                    this.experience += 10
                } else if(e.number == 2){
                    this.experience += 25
                } else if(e.number == 3){
                    this.experience += 50
                } else{
                    this.experience += 100
                }
                //This stops the for loop if the tower has attacked an enemy
                //so it can't hit multiple enemies in one attack cycle
                break
            }
        }
    }
}

class DroneTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 0
        this.hitbox = 38 * conversionFactor
        this.attackSpeed = 2000
        this.attackRadius = mapSquareSizeX
        this.damage = 1
    }
}

class EmpTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 1
        this.hitbox = 34 * conversionFactor
        this.damage = 15
        this.attackSpeed = 1250
        this.attackRadius = mapSquareSizeX
        this.xOffset = 5 * conversionFactor
        this.yOffset = -5 * conversionFactor
    }
}

class FlamethrowerTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 2
        this.hitbox = 38 * conversionFactor
        this.damage = 15
        this.attackSpeed = 500
        this.attackRadius = mapSquareSizeX * 0.8
    }
}

class GravityTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 3
        this.hitbox = 40 * conversionFactor
        this.damage = 9999999999
        this.attackSpeed = 3000
        this.attackRadius = this.hitbox
        //mapSquareSizeX
        this.yOffset = -5 * conversionFactor
        this.xOffset = 1 * conversionFactor
    }
}

class IceTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 4
        this.hitbox = 40 * conversionFactor
        this.damage = 0
        this.attackSpeed = 1500
        this.attackRadius = mapSquareSizeX * 0.5
        this.yOffset = -3 * conversionFactor
    }
}

class LaserTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 5
        this.hitbox = 32 * conversionFactor
        this.damage = 10
        this.attackSpeed = 500
        this.attackRadius = mapSquareSizeX * 1.25
        this.xOffset = 10 * conversionFactor
        this.yOffset = -7.5 * conversionFactor
    }
}

class MissileTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 6
        this.hitbox = 35 * conversionFactor
        this.damage = 20
        this.attackSpeed = 1500
        this.attackRadius = mapSquareSizeX
        this.xOffset = 3 * conversionFactor
        this.yOffset = -5 * conversionFactor
    }
}

class MoneyTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 7
        this.hitbox = 38 * conversionFactor
        this.attackSpeed = 2000
        this.attackRadius = mapSquareSizeX * 0.5
        this.xOffset = 5 * conversionFactor
        this.yOffset = -5 * conversionFactor
        this.damage = 100
    }
    update(){
        let time = this.currentTime - millis()
        if((time * -1) >= this.attackSpeed && this.towerPlaced){
            money += 100
            this.currentTime = millis()
        }
    }
}

class MortarTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 8
        this.hitbox = 42 * conversionFactor
        this.damage = 30
        this.attackSpeed = 1000
        this.attackRadius = mapSquareSizeX
        this.yOffset = -7 * conversionFactor
        this.xOffset = 2 * conversionFactor
    }
}

class PlasmaTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 9
        this.hitbox = 35 * conversionFactor
        this.damage = 15
        this.attackSpeed = 500
        this.attackRadius = mapSquareSizeX * 1.5
        this.xOffset = 7 * conversionFactor
        this.yOffset = -4 * conversionFactor
    }
}

class RailgunTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 10
        this.hitbox = 37.5 * conversionFactor
        this.damage = 25
        this.attackSpeed = 2000
        this.attackRadius = this.hitbox
        //mapSquareSizeX * 2
        this.yOffset = 10 * conversionFactor
        this.xOffset = -3.5 * conversionFactor
    }
}

class RepairTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 13
        this.hitbox = 93 * conversionFactor
        this.attackSpeed = 1500
        this.attackRadius = mapSquareSizeX
        this.xOffset = -7.5 * conversionFactor
        this.yOffset = 5 * conversionFactor
    }
}

class ShieldTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 14
        this.hitbox = 93 * conversionFactor
        this.attackSpeed = 1500
        this.attackRadius = mapSquareSizeX
    }
}

class SniperTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 11
        this.hitbox = 93 * conversionFactor
        this.damage = 5
        this.attackSpeed = 1000
        this.attackRadius = mapSquareSizeX * 20
    }
}

class TeslaTower extends Tower{
    constructor(x,y){
        super(x,y)
        this.number = 12
        this.hitbox = 93 * conversionFactor
        this.damage = 20
        this.attackSpeed = 1000
        this.attackRadius = mapSquareSizeX * 1.75
    }
}
