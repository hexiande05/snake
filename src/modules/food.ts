/**
 *  定义一个食物类
 *  ele food的元素
 *  change 随机生成食物的位置
 *  X ： 获取食物的x坐标
 *  Y ： 获取食物的y坐标
 */
class Food {
    ele: HTMLElement;
    
    constructor() {
        this.ele = document.querySelector('.food')!;
    }

    //获取食物的位置
    get X() {
        return this.ele.offsetLeft;
    }
    get Y() {
        return this.ele.offsetTop;
    }

    //生成食物
    change(s:HTMLCollection) {
        
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.ele.style.left = left + 'px';
        this.ele.style.top = top + 'px';

        // 如果生成食物的位置和蛇的位置相同，则重新生成食物的位置   
        for(let i = 0; i < s.length; i++) {
            let temp = s[i] as HTMLElement;
            if(temp.offsetLeft === left && temp.offsetTop === top) {
                this.change(s);
            }
        }
    }
}

export default Food

// 测试代码


// const food = new Food();
// food.change();

// console.log(food.X, food.Y);
