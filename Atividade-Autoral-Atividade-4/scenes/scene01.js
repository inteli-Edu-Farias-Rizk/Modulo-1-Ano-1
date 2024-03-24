class scene01 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'scene01',
            backgroundColor: '#000', // Configuração da cor de fundo da cena
        });
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('background','assets/fundo.jpg')
        this.load.image('play', "assets/play_bt.png"); // Carregando a imagem do botão "play"
    }

    // Função chamada quando a cena é criada
    create() {

        this.add.image(400,300,'background')

        // Configuração do botão de "play"
        this.playBt = this.add.image(400, 300, 'play')
            .setScale(.2).setOrigin(0, 0).setInteractive().setVisible(true);
        // // Dentro do método create, após a configuração do botão "play"
        // this.playBt.on('pointerdown', () => {
        //     this.scene.start('scene02'); // Muda para a cena 'scene02'
        // });


    }
}