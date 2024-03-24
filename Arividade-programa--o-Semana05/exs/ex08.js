class Animal{
    constructor(nome, idade){
        this.nome = nome;
        this.idade = idade;
    }
    descrever(){
        return `${this.nome} tem ${this.idade} anos`;
    }
}

class Gato extends Animal{
    constructor(nome, idade, cor){
        super(nome, idade);
        this.cor = cor;
    }
    miar(){
        console.log("Miau!");
    }
}

let gato = new Gato("Mentos", 5, "preto");
let cachorro = new Animal("Bala", 3);

console.log(cachorro.descrever());
console.log(gato.descrever());
gato.miar();