class SceneTitle extends GuaScene {
    constructor(game) {
        super(game);
        // var label = GuaLabel.new(game, 'hello form gua')
        // this.addElement(label)

        // bg
        var bg = GuaImage.new(game, 'cave')
        this.addElement(bg)
        // player
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'grounds')
            g.x = i * 19
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 180
        this.w = w
        this.addElement(w)
        this.setupInputs()
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += -5
        }
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function (keyStatus){
            self.w.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus){
            self.w.move(2, keyStatus)
        })
    }
}
