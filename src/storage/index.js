/*
只提供工作、生活、学习3个类别
*/
const toReadableDate = (timeStamp) => {
  let dateObj = new Date(timeStamp);
  const toTwoDigits = (str) => {
    if (str.valueOf() < 10) {
      return '0' + str;
    }
    return str;
  }
  return `${toTwoDigits(dateObj.getMonth() + 1)}-${toTwoDigits(dateObj.getDate())}, ${toTwoDigits(dateObj.getHours())}:${toTwoDigits(dateObj.getMinutes())}`;
};

class Memo {
  constructor(obj) {
    // 1工作 2生活 3学习
    this.categoryId = obj.categoryId;
    // 20字符内的字符串
    this.title = obj.title;
    // 0文字 1涂鸦
    this.type = obj.type;
    // 类别为文字时，字符串；为涂鸦时，imageData
    this.content = obj.content;
    // 创建时的时间戳（#为了以 json 保存，转换为字符串）
    this.timeStamp = toReadableDate(Date.parse(new Date()));
    // 默认未完成
    this.isCompleted = false;
    // 修改是否完成（受涂鸦内容的影响）
    this.modificationDone = true;
  }
  // 取得260*260图片的 imageData

}

class VueMemoStore {
  constructor () {
    this.memos = [];
  }
  loadFromLocalStorage () {
    this.memos = JSON.parse(localStorage.getItem('store')).memos;
  }
  saveToLocalStorage () {
    return
    // imgData 加载完成后再进行保存
    let allModificationDoneFlag = setInterval(() => {
      if (!this.memos.some((item) => {
        return item.modificationDone === false;
      })) {
        clearInterval(allModificationDoneFlag);
        localStorage.setItem('store', JSON.stringify(this));
      }
    }, 10);
  }
  add (memo) {
    this.memos.push(memo);
  }
  remove (memo) {
    this.memos.splice(this.memos.indexOf(memo), 1);
  }
  update (memo, newMemo) {
    this.memos.splice(this.memos.indexOf(memo), 1, newMemo);
  }
  init () {

    let m1 = new Memo({
      categoryId: 3,
      title: 'demo',
      type: 0,
      content: `this is a demo`
    });
    m1.timeStamp = toReadableDate(new Date(Date.parse('Oct 8, 2016')));
    this.add(m1);

   


    this.saveToLocalStorage();
  }
}

let store = new VueMemoStore();

if (localStorage.getItem('store') !== null) {
  store.loadFromLocalStorage();
} else {
  store.init();
}

let storeUtil = {
  store,
  Memo,
}

export default storeUtil;
