class SomadorDeNotas {
    constructor() {
        this.notas = 0
    }
    adicionarNota(nota){
        this.notas += nota;
    }
    verTotal(){
        console.log("O total é " + this.notas);
    }
}
let somador = new SomadorDeNotas();
somador.adicionarNota(10);
somador.adicionarNota(8);
somador.verTotal()