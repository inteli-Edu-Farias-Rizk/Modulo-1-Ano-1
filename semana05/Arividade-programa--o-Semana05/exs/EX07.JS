class Animal{
    constructor(nome, idade){
        this.nome = nome;
        this.idade = idade;
    }
    descrever(){
        return `${this.nome} tem ${this.idade} anos`;
    }
}