class Basket {
    constructor() {
        this.fruits = {
            apples: [],
            pears: [],
            oranges: []
        };
    }

    addFruit(fruit) {
                let name = fruit.constructor.name;
                switch (name) {
                    case 'Apple': this.fruits.apples.push(fruit);
                        break;
                    case 'Pear': this.fruits.pears.push(fruit);
                        break;
                    case 'Orange': this.fruits.oranges.push(fruit);
                        break;
             
        }
    }

    cleanFruits(type){
        let length = this.fruits[type].length;
        this.fruits[type].array.forEach(element => {element.isClean = true;   
        }); 

            if(length !== 0){
                return `you viped ${length} ${type}s`;
            }else{
                return `nothing to clean`; 
            }

    }

    getAllFruitsByType(type){
        return this.fruits[type];
    }
    
    getAllFruits(){
        return this.fruits;
    }
    clearBasket(){
        this.fruits.apples = [];
        this.fruits.pears = [];
        this.fruits.oranges = [];
    }

}