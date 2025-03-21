// 设置关卡
var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = GuaGame(30, images, function(g){
        var paddle = Paddle(g)
        var ball = Ball(g)
        var score = 0
        blocks = loadLevel(g, 1)

        var paused = false
        g.registerAction('a', function(){
            paddle.moveLeft()
        })
        g.registerAction('d', function(){
            paddle.moveRight()
        })
        g.registerAction('f', function(){
            ball.fire()
        })

        g.update = function() {
            if (window.paused) {
                return
            }
            ball.move()
            // 判断相撞
            if (paddle.collide(ball)) {
                // 这里应该调用一个 ball.反弹() 来实现
                ball.反弹()
            }
            // 判断 ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    // log('block 相撞')
                    block.kill()
                    ball.反弹()
                    // 更新分数
                    score += 100
                }
            }
        }
        // mouse event 鼠标点击事件
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            // 检查是否点中ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                log(x, y, 'drag')
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'mouseup')
            enableDrag = false
        })

        g.draw = function() {
            // draw 背景
            game.context.fillStyle = "#5A9BDC"
            game.context.fillRect(0, 0, 400, 300)
            // draw
            g.drawImage(paddle)
            g.drawImage(ball)
            // draw blocks
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    g.drawImage(block)
                }
            }
            //  draw labels
            g.context.fillText('分数：' + score, 10, 280)
        }
    })
    enableDebugMode(game, true)


}

__main()