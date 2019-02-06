function BasketView(){
    this.basket = new Basket();
    this.render();
}

BasketView.prototype.render = function(){
    let appHtml = document.querySelector('#app');
    let form = document.createElement('div');

        form.classList.add('container');
        form.innerHTML = `
        <div class="col-3 ">
            <div class="form">
                <div class="select-fruit mb-2 mt-2">
                    <span>Fruit: </span>
                    <select id = "selectFruits">
                    <option value="Apple">Apple</option>
                    <option value="Orange">Orange</option>
                    <option value="Pear">Pear</option>
                    </select>
                </div>
                <div class="select-fruit mb-2">
                    <span>Name: </span> <input id = "fruitsName" type="text" >
                </div>
                <div id = "isWinterDiv" class="select-fruit mb-2">
                    <span>isWinter: </span> <input id = "isWinterEl" type="checkbox">
                </div>
                <div class="select-fruit mb-2">
                    <span>isClean: </span> <input id = "isCleanEl" type="checkbox">
                </div>
                <div class="select-fruit mb-2">
                    <span>type: </span> <input id = "typeEl" type="text">
                </div>
                <div id = "list" class = "fruits-list mb-2">
                </div>
                <div class = "buttons">
                </div>
            
                </div>
            </div>
        </div>`;

  appHtml.append(form);

  this._initialSelect();
  this.isBasketEmpty();
  this._createButtons();
};

BasketView.prototype._initialSelect = function(){
    let select = document.querySelector('#selectFruits');
    let isWinterEl = document.querySelector('#isWinterDiv');
        select.addEventListener('change',this._hideIswinter.bind(this));

    if(select.value !== 'Apple'){
        isWinterEl.classList.add('hide');
      }
};
    
BasketView.prototype._createButtons = function(){
    let buttonsDiv = document.querySelector('.buttons');
    let btn1 = this._addButton(`Save`,'btn','btn-dark','mb-2');
    let btn2 = this._addButton(`Clear basket`,'btn','btn-primary','mb-2');
    let btn3 = this._addButton(`Clean Fruits`,'btn','btn-success','mb-2');
    
    btn1.addEventListener('click', this._createFruit.bind(this));
    btn2.addEventListener('click', this.clearBasket.bind(this));
    btn3.addEventListener('click', this.cleanFruits.bind(this));

    buttonsDiv.append(btn1,btn2,btn3);
};

BasketView.prototype.cleanFruits = function(){
    for(let i in this.basket.fruits)
        for(let j = 0; j < this.basket.fruits[i].length; j++)
            this.basket.fruits[i][j].isClean = true;
    this._renderAllFruits();        
};

BasketView.prototype.clearBasket = function(){
    this.basket.clearBasket();
    this.isBasketEmpty();
};

BasketView.prototype._createFruit = function(){
    let select = document.querySelector('#selectFruits');
    let isWinterEl = document.querySelector('#isWinterEl');
    let nameEl = document.querySelector('#fruitsName');
    let isCleanEl = document.querySelector('#isCleanEl');
    let typeEl = document.querySelector('#typeEl'); 
    let type = select.value;

        switch (type){
            case 'Apple': this.basket.addFruit(new Apple(nameEl.value, typeEl.value, isCleanEl.checked, isWinterEl.checked));
                break;
            case 'Pear': this.basket.addFruit(new Pear(nameEl.value, typeEl.value, isCleanEl.checked)); 
                break;  
            case 'Orange': this.basket.addFruit(new Orange(nameEl.value, typeEl.value, isCleanEl.checked)); 
                break;     
        }
    this._renderAllFruits();    
};


BasketView.prototype._renderAllFruits = function(){
    let list = document.querySelector('#list');
        list.innerHTML ='';

    for(let i in this.basket.fruits){
        let container = this._containerForEachType(i);
            for(let j = 0; j < this.basket.fruits[i].length; j++){
                container.append(this._renderOneFruit(this.basket.fruits[i][j]));
            }
        list.append(container);
    }
}; 

BasketView.prototype._renderOneFruit = function(fruit){
let el = document.createElement('div');
    el.classList.add('mb-2');

    if(fruit.constructor.name === 'Apple'){
        el.innerHTML = `<p>name : ${fruit.name}     type: ${fruit.type}     clean : ${fruit.isClean}  isWinter : ${fruit.isWinter}</p>`;
    }else {el.innerHTML = `<p>name : ${fruit.name}     type: ${fruit.type}     clean : ${fruit.isClean}  </p>`;}

    return el;
};

BasketView.prototype._notAdded = function(){

};

BasketView.prototype._containerForEachType = function(type){
    let el = document.createElement('div');
    el.classList.add(`${type}`);
    el.classList.add('mb-2');
    el.classList.add('list');    
    el.innerHTML = ` <span>${type}</span>
    <br>`;
        return el;
};



BasketView.prototype._addButton = function(inner,...classes){
    let el = document.createElement('button');

        el.innerHTML = inner;
        for(let i = 0; i < classes.length; i++){
            el.classList.add(classes[i]);
        }
        return el;
};

BasketView.prototype._hideIswinter = function(){
    let select = document.querySelector('#selectFruits');
    let isWinterEl = document.querySelector('#isWinterDiv');

    if(select.value !== 'Apple')
        isWinterEl.classList.add('hide');
    else
        isWinterEl.classList.remove('hide');
};

BasketView.prototype.isBasketEmpty = function(){
    if(this.basket.fruits.apples.length === 0 && this.basket.fruits.oranges.length === 0 && this.basket.fruits.pears.length === 0){
        let list = document.querySelector('#list');
        list.innerHTML = `<span>BASKET IS EMPTY </span>`;
        return true;
    }
    else {
        list.innerHTML = ``;   
        return false;
    }
    
};