class Funcionario {
    constructor(nome, salarioBase, idade) {
        this.nome = nome;
        this.salarioBase = salarioBase;
        this.idade = idade;
    }
}
    class Professor extends Funcionario {
        constructor(nome, salarioBase, idade, disciplina, horas) {
            super(nome, salarioBase, idade);
            this.disciplina = disciplina;
            this.horas = horas;
        }
        calcularSalario() {
            return this.salarioBase * this.horas;
        }
    }
    const professor1 = new Professor("João", 2000, 30, "Matemática", 40);
    const professor2 = new Professor("Maria", 2000, 33, "Português", 35);
    console.log(professor1.calcularSalario());
    console.log(professor2.calcularSalario());
