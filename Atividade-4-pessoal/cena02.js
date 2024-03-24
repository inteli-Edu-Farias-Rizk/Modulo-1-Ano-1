// Definição da classe cena02, que estende Phaser.Scene, uma cena do jogo.
class cena02 extends Phaser.Scene {
    constructor() {
        super({ key: 'cena02' }); // Chama o construtor da classe pai com uma chave única para esta cena.
        // Inicialização das propriedades da classe.
        this.player = null; // Será usado para armazenar o sprite do jogador.
        this.cursors = null; // Será usado para gerenciar a entrada do teclado.
        this.dima = null; // Grupo de sprites para os diamantes.
        this.bombas = null; // Grupo de sprites para as bombas.
        this.pontuacao = 0; // Pontuação do jogador.
        this.placar = null; // Objeto de texto para mostrar a pontuação.
    }

    // Método para pré-carregar ativos, como imagens e spritesheets.
    preload() {
        // Carrega as imagens e spritesheets necessárias para a cena.
        this.load.image('fundo', 'assets/fundo.jpg');
        this.load.image('ground', 'assets/retangulo_marrom.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('dima', 'assets/dima.png');
        this.load.image('bomba', 'assets/bomba.png');
    }

    // Método chamado uma vez que todos os ativos são carregados, para configurar objetos de jogo.
    create() {
        // Adiciona um fundo e configura plataformas estáticas.
        this.add.image(400, 300, 'fundo');
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(400, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // Configura o sprite do jogador, incluindo física e animações.
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        // Configura os diamantes, adicionando física e permitindo interações.
        this.dima = this.physics.add.group({
            key: 'dima',
            repeat: 7,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.dima.children.iterate((child) => {
            child.setScale(0.1).setBounce(0.3).setCollideWorldBounds(true);
        });
        this.physics.add.collider(this.dima, platforms);
        this.physics.add.overlap(this.player, this.dima, this.collectDima, null, this);

        // Configura as bombas de forma similar aos diamantes, mas elas causam perda de pontos.
        this.bombas = this.physics.add.group({
            key: 'bomba',
            repeat: 5,
            setXY: { x: 21, y: 0, stepX: 150 }
        });
        this.bombas.children.iterate((bomba) => {
            bomba.setScale(0.1).setBounce(0.3).setCollideWorldBounds(true);
        });
        this.physics.add.collider(this.bombas, platforms);
        this.physics.add.overlap(this.player, this.bombas, this.hitBomba, null, this);

        // Configura o controle do teclado.
        this.cursors = this.input.keyboard.createCursorKeys();
        this.createAnimations();

        // Configura o placar na tela.
        this.placar = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });
    }

    // Método chamado quando um jogador coleta um diamante.
    collectDima(player, dima) {
        this.pontuacao += 1; // Incrementa a pontuação.
        this.placar.setText('Pontuação: ' + this.pontuacao); // Atualiza o texto do placar.

        // Reposiciona o diamante coletado.
        const newX = Phaser.Math.Between(0, this.sys.game.config.width);
        const newY = Phaser.Math.Between(0, 300);
        dima.setX(newX);
        dima.setY(newY);
        dima.enableBody(true, newX, newY, true, true);
    }

    // Método chamado quando o jogador colide com uma bomba.
    hitBomba(player, bomba) {
        this.pontuacao -= 1; // Decrementa a pontuação.
        this.placar.setText('Pontuação: ' + this.pontuacao); // Atualiza o placar.

        // Reposiciona a bomba coletada.
        const newX = Phaser.Math.Between(0, this.sys.game.config.width);
        const newY = Phaser.Math.Between(0, 300);
        bomba.setX(newX);
        bomba.setY(newY);
        bomba.enableBody(true, newX, newY, true, true);
    }

    // Método para criar animações do jogador.
    createAnimations() {
        // Animações para mover para a esquerda, ficar parado e mover para a direita.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    // Método de atualização chamado a cada quadro do jogo, controla o movimento do jogador.
    update() {
        // Controles de movimento do jogador com base nas teclas de seta.
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
         else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Permite que o jogador salte se estiver tocando o chão.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

