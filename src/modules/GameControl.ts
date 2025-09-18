import Food from "./food";
import Snake from "./snake";
import ScorePancel from "./scorePancel";

/**
 *  游戏控制器,控制其他的类
 */
class GameControl {
    // 蛇
    snake: Snake
    // 食物
    food: Food
    // 记分牌
    scorePancel: ScorePancel
    // 创建一个属性来存储蛇的方向
    dir: String
    // 游戏是否结束
    isLive: Boolean = true
    // 第一次开始
    isFirst: Boolean = true
    //蒙版
    meng: HTMLElement

    constructor() {
        this.food = new Food()
        this.snake = new Snake()
        this.scorePancel = new ScorePancel(10, 2)
        this.dir = ''
        this.init()
        this.meng = document.querySelector('.start')!
    }

    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler)
        this.run()
    }
    // ArrowUp
    keydownHandler = (event: KeyboardEvent): void => {
        // console.log(event.key);
        // console.log(this.meng);
        // 第一次执行的逻辑
        if (this.isFirst) {
            if (event.key === 'Enter') {
                this.meng.style.display = 'none'
            } else {
                return;
            }
        }

        this.dir = this.isFirst ? 'Right' : event.key
        this.isFirst = false
    }
    //控制蛇移动
    run() {
        // 控制蛇的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.dir) {
            case 'ArrowUp':
            case 'Up':
            case 'w':
                Y -= 10
                break;
            case 'ArrowDown':
            case 'Down':
            case 's':
                Y += 10
                break;
            case 'ArrowLeft':
            case 'Left':
            case 'a':
                X -= 10
                break;
            case 'ArrowRight':
            case 'Right':
            case 'd':
                X += 10
                break;
            default:
                break;

        }

        // 查看蛇是否吃到了食物
        this.checkEat(X, Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e: any) {
            alert(e.message)
            this.isLive = false
        }

        /**
         *  为什么在此处还需要进行一次 判断蛇是否吃到了食物
            因为当 蛇在迟到食物前一个时，我按下相反的方向键，此时蛇头的坐标会直接和食物重叠，
            但是此时没有判断，并且它会直接进入下一个run，再次改变坐标，此时蛇头已与食物不在一个坐标
            所以此时再进行 吃食判断是不成立的。
         * 
         */

        // 查看蛇是否吃到了食物
        this.checkEat(X, Y)

        this.isLive && setTimeout(() => {
            this.run()
        }, 300 - (this.scorePancel.level - 1) * 30)

    }

    // 定义一个方法，查看是否吃到了食物
    checkEat(X: number, Y: number) {

        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到了食物');

            this.food.change(this.snake.bodies)
            this.scorePancel.addScore()
            this.snake.addBody()
        }
    }

}

export default GameControl
