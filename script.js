class GameMachine {
    constructor(number){
        this.allMoney = number
    }
    get getMoney(){
        return this.allMoney
    }
    takeMoney(number){
        if(number>this.allMoney){
            console.log('Ніт! В автоматі замало грошей')
        } else {
            this.allMoney -= number
        }
        
    }
    putMoney(number){
        this.allMoney += number
    }
    letsPlay(number){
       this.allMoney = Number(this.allMoney) 
       this.allMoney += number
    
        let gameNum = Math.floor(Math.random()*1000)

        if(
            gameNum.toString()[0]==gameNum.toString()[1]||
            gameNum.toString()[1]==gameNum.toString()[2]||
            gameNum.toString()[2]==gameNum.toString()[0]) {
              
               number*=2
               this.allMoney -= number
               console.log(gameNum)
               console.log("Супер, ти виграв подвійну ставку!)")
               return number 
        }else if(
                   gameNum.toString()[0]==gameNum.toString()[1]&&
                   gameNum.toString()[1]==gameNum.toString()[2]){

                        number*=3
                        this.allMoney -= number;
                        console.log(gameNum)
                        console.log("Супер,ти виграв потрійну ставку!)")
                        return number           
        } else {
            console.log(gameNum)
            console.log(`Попрощайся зі своїми ${number} money ((`)
            return -number
        }
    }
}

class Casino{
    constructor(name){
        this.name = name
        this.machines =[]
    }
    get getMoney(){
        return this.machines.reduce((total,machine)=>{
            return total + Number(machine.allMoney)
        },0)
    }
    get getMachineCount(){
       return this.machines.length
    }

}

class User{
    constructor(name,money){
        this.name = name
        this.money = money
        this._selectMachine = null
    }
    get selectMachine(){
        return this._selectMachine
    }
    set selectMachine(machine) {
        this._selectMachine = machine;
    }
    
    play(money){
        if(this._selectMachine==null){
            console.log("Виберіть автомат для гри)")
        }if(money>this.money){
            console.log("Ніт! У вас недостатньо коштів(")
            return
        }

        this.money+=Number(this._selectMachine.letsPlay(money))
     }
}

class SuperAdmin extends User {
    constructor(name,money){
        super(name,money)
        this.casino = null
    }
    createNewCasino(nameOfCasino){
        let newCasino = new Casino(nameOfCasino)
        this.casino = newCasino
        return newCasino
    }
    createNewGameMachine(money){
        let newGameMachine = new GameMachine(money)
        this.casino.machines.push(newGameMachine)
        this.money -=money
        return newGameMachine
    }
    takeCasinoMoney(money){
       let machines = [...this.casino.machines]
        let bank = machines.reduce((total,machine)=>total+Number(machine.allMoney),0)
        let percent = money/bank;
        machines.forEach(machine=>{
            machine.allMoney = +(Number(machine.allMoney) *(1-percent)).toFixed()
        })
        this.casino.machines = [...machines];
        this.money +=money
    }
    addMoneytoGameMachine(money,id){
        this.casino.machines[id].allMoney +=money
        this.money -= money
    }
    addMoneyToCasino(money) {
        this.casino.machines.forEach(machine => {
          machine.allMoney = +machine.allMoney+ +(money / this.casino.machines.length).toFixed();
          machine.allMoney = Number(machine.allMoney);
        })
          this.money -= money;
      }
      removeGameMachine(id) {
        let machines = [...this.casino.machines];
        if (machines[id] === undefined) {
            console.error("Сорі, нема такого автомата(")
        };
        machines.splice(id, 1);
        machines.forEach(machine => {
          let income = (Number(machines[id].allMoney)/machines.length).toFixed();
          machine.allMoney = +machine.allMoney + +income;
        });
    
        this.casino.machines = [...machines];
      }   
}

