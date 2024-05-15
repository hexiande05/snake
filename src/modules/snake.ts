/**
 *  蛇
 */
class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇身
    bodies: HTMLCollection;
    // 获取蛇的容器
    ele: HTMLElement


    constructor() {
        this.ele = document.getElementsByClassName('snake')[0] as HTMLElement
        this.head = document.querySelector('.snake > div') as HTMLElement
        this.bodies = this.ele.getElementsByTagName('div')
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇的Y坐标
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值和旧值相同，则直接返回，不作修改
        if (this.X === value) {
            return
        }

        //判断是否调头
        value = this.isReverse(value, 'row')

        // 处于合法范围内   
        this.crash(value)

        // 移动身体
        this.moveBody()

        // 移动蛇头
        this.head.style.left = value + 'px'
    }

    set Y(value: number) {
        // 如果新值和旧值相同，则直接返回，不作修改
        if (this.Y === value) {
            return
        }

        //判断是否调头
        value = this.isReverse(value, 'col')

        // 处于合法范围内
        this.crash(value)

        // 移动身体
        this.moveBody()

        this.head.style.top = value + 'px'
    }

    // 蛇添加身体
    addBody() {
        this.ele.insertAdjacentElement("beforeend", document.createElement('div'))

    }
    // 蛇移动身体
    moveBody() {
        // 将后面的身体设置成前一个身体的位置

        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 前一节身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 碰撞检测
    private crash(v: number): void {
        // 判断是否撞墙
        if (v < 0 || v > 290) {
            throw new Error('撞墙了，游戏结束！')
        }

        // 判断是否撞到自己
        for(let i = 1;i < this.bodies.length; i++){
            let body = this.bodies[i] as HTMLElement
            if(this.X === body.offsetLeft && this.Y === body.offsetTop){
                throw new Error('撞到自己了！,游戏结束')
            }
        }
    }
    // 判断蛇是否调头
    private isReverse = (value: number, d?: String): number => {
        // console.log('判断调头');
        // console.log('此刻蛇头的位置:',this.X,this.Y);
        // console.log('蛇头要去的位置：',value)

        if (this.bodies[1] && (d !== 'row' ? (this.bodies[1] as HTMLElement).offsetTop : (this.bodies[1] as HTMLElement).offsetLeft) === value) {
            // console.log('有调头现象');

            if (value > (d === 'row' ? this.X : this.Y)) {
                value = (d === 'row' ? this.X : this.Y) - 10
            } else {
                value = (d === 'row' ? this.X : this.Y) + 10
            }
        }

        return value
    }
}

export default Snake