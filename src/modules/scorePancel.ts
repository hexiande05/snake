/**
 *  记分牌
 *  score 成绩
 *  level
 */
class ScorePancel {
    // 分数 和 等级
     score = 0;
     level = 1;
    // 分数和等级所在的元素
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    //设置一个最大等级
    maxLevel: number
    // 多少分时升级
    upScore: number

    constructor(maxLever: number = 10, upScore: number = 10) {
        this.scoreEle = document.querySelector('.score')!;
        this.levelEle = document.querySelector('.level')!;
        this.maxLevel = maxLever
        this.upScore = upScore
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if (this.score % this.upScore === 0) {
            this.leverUP()
        }
    }

    leverUP() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }

}

export default ScorePancel

//测试

// const sp = new ScorePancel(20,10)

// for (let i = 0; i < 150; i++) {
//     sp.addScore()
// }