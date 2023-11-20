// Knight ou Sourcerer
// LittleMonster ou BigMonster

class Character{

    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name){
        this.name = name
    }

    get life(){
        return this._life
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }
}

class Knight extends Character{
    constructor(name){
        super(name)
        this.life = 100
        this.attack = 10
        this.defense = 8
        this.maxLife = this.life
    }
}

class Sourcerer extends Character{
    constructor(name){
        super(name)
        this.life = 80
        this.attack = 17
        this.defense = 3
        this.maxLife = this.life
    }
}

class LittleMonster extends Character{

    constructor(){
        super('Little Monster')
        this.life = 40
        this.attack = 4
        this.defense = 4
        this.maxLife = this.life
    }

}

class BigMonster extends Character{

    constructor(){
        super('Big Monster')
        this.life = 120
        this.attack = 16
        this.defense = 6
        this.maxLife = this.life
    }

}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject){
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El
        this.log = logObject
    }

    start(){
        this.update()

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }

    update(){
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - HP ${this.fighter1.life.toFixed(1)}`
        let l1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1El.querySelector('.bar').style.width = `${l1Pct}%`


        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - HP ${this.fighter2.life.toFixed(1)}`
        let l2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2El.querySelector('.bar').style.width = `${l2Pct}%`
    }

    doAttack(attacking, attacked){
        if(attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage('O inimigo foi Derrotado')
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)
        let defenseFactor = (Math.random() * 2).toFixed(2)
    
        let actualAttack = attacking.attack * attackFactor
        let actualDefense = attacked.defense * defenseFactor
        let finalDemage = actualAttack - actualDefense
        console.log(actualDefense)
        console.log(finalDemage)

        if(actualAttack > actualDefense){
            attacked.life -= finalDemage
            this.log.addMessage(`${attacking.name} atacou ${actualAttack.toFixed(2)}, ${attacked.name} defendeu ${actualDefense.toFixed(2)}, dano final ${finalDemage.toFixed(2)} `)
        }else{
            this.log.addMessage(`${attacked.name} Defendeu`)
        }

        this.update()
    }
}

class Log{
    list = []

    constructor(listEl){
        this.listEl = listEl
    }

    addMessage(msg){
        this.list.push(msg)
        this.render()
    }

    render(){
        this.listEl.innerHTML = ''

        for (let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}