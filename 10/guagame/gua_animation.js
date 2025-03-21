class GuaAnimation {
    constructor(game) {
        this.game = game
    //    为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
    //
        this.flipX = false
    //    重力和加速度
        this.gy = 10
        this.vy = 0

    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        if (this.flipX) {
            context.save()

            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)

            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // log('keyStatus', keyStatus)
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}