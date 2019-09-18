
var Text = ['十', '一', '二', '三', '四', '五', "六", '七', '八', '九'];
var clock;
var textset = [12, 31, 6, 23, 59, 59];
var textName = ['月', '日', '星期', '点', '分', '秒'];
var monthlist = [];
var daylist = [];
var weeklist = [];
var hourlist = [];
var minutelist = [];
var secondlist = [];
var dom = [monthlist, daylist, weeklist, hourlist, minutelist, secondlist];
var iscCircle = false;
window.onload = function () {
    init();
    setInterval(() => {
        runtime();
    }, 100);
    changeposition();
    setTimeout(function () {
        changeCircle();

    }, 2000);

}
function init() {
    clock = document.querySelector('#clock');

    for (var i = 0; i < textset.length; i++) {
        var j;
        if (i >= 2)
            j = 0;
        else j = 1;
        for (; j <= textset[i]; j++) {
            var div = document.createElement('div');
            var str = createnum(j);

            if (j == 0 && i == 2)
                str = '天';
            else if (j == 0)
                str = '零';

            div.classList.add("label");
            if (i == 2)
                str = textName[i] + str;
            else str += textName[i];

            div.innerHTML = str;
            dom[i].push(div);
            clock.appendChild(div);
        }

    }

}
function createnum(num) {
    var str = '';
    var flag = false;
    if (num % 10 == 0)
        flag = true;
    str += Text[num % 10];
    num /= 10;
    num = Math.floor(num);
    if (!flag && num >= 1)
        str = Text[0] + str;
    if (num > 1) {
        str = Text[num] + str;
    }
    return str;
}

function runtime() {
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    var week = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var second = now.getSeconds();
    var nowValue = [month, day - 1, week, hours, minutes, second];
    //console.log(nowValue);
    for (var i = 0; i < nowValue.length; i++) {
        var num = nowValue[i];
        if (num - 1 >= 0)
            dom[i][num - 1].style.color = '#4d4d4d';
        else
            dom[i][num + textset[i]].style.color = '#4d4d4d';
        dom[i][num].style.color = '#fff';
    }
    if (iscCircle) {
        var withMid = document.body.clientWidth / 2;
        var heightMid = document.body.clientHeight / 2;
        console.log(withMid, heightMid);
        for (var i = 0; i < dom.length; i++) {
            for (var j = 0; j < dom[i].length; j++) {
                var deg = 360 / dom[i].length * (j - nowValue[i]);
                //  console.log(deg);
                var r = (i + 1) * 60 + 40 * i;
                var x = Math.sin(deg * Math.PI / 180) * r + withMid;
                var y = heightMid - Math.cos(deg * Math.PI / 180) * r;
                dom[i][j].style.position = 'absolute';
                dom[i][j].style.left = x + 'px';
                dom[i][j].style.top = y + 'px';

                dom[i][j].style.transform = 'rotate(' + (deg - 90) + 'deg)';

            }
        }
    }



}

function changeCircle() {
    iscCircle = true;
    clock.style.transform = 'rotate(90deg)';

}
function changeposition() {
    for (let i = 0; i < dom.length; i++) {
        for (let j = 0; j < dom[i].length; j++) {
            let tempLeft = dom[i][j].offsetLeft;
            let tempTop = dom[i][j].offsetTop;
            setTimeout(function () {
                // dom[i][j].style.position='absolute';
                dom[i][j].style.left = tempLeft + 'px';
                dom[i][j].style.top = tempTop + 'px';
            }, 50);
        }
    }
}