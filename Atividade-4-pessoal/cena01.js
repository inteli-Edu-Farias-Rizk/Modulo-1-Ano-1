class cena01 extends Phaser.Scene {
    // Construtor da cena
    constructor() {
        super({ key: "cena01" });
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('background', 'assets/desert_background.png');
        this.load.image('play', "assets/play_bt.png"); // Carregando a imagem do botão "play"
    }

    // Função chamada quando a cena é criada
    create() {
        // Adicionando o background
        this.add.image(400, 300, 'background');
        
        // Configuração do botão de "play"
        this.playBt = this.add.image(340, 300, 'play')
            .setScale(.2).setOrigin(0, 0).setInteractive().setVisible(true);
        
        // Define que o botão vai mudar de cena quando apertado
        this.playBt.on('pointerdown', () => {
            this.scene.start('cena02'); // Muda para a cena 'cena02'
        });

        // Configuração do texto de boas-vindas
        let welcomeText = "Hello, welcome to my game";
        this.message = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - 60,
            welcomeText, {
                color: "#FFFFFF",
                fontSize: "40px",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // Adicionando texto de instrução para o jogador
        let instructionText = "Use arrow keys to move";
        this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 + 100,
            instructionText, {
                color: "#FFFFFF",
                fontSize: "32px",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    }
}
