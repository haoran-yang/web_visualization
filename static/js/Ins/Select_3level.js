//select三级联动
// var oneSel = document.getElementById("One");
// var twoSel = document.getElementById('Two');
// var threeSel = document.getElementById('Three');
// oneSel.onchange = function() {
//   changeTwoSel();
//   selectOnchang()
// }
// twoSel.onchange = function() {
//   changeThreeSel();
//   selectOnchang()
// }
var oneArray = ['POS贷', 'K利贷'];
var twoArray = [
  ['总体','大区','省份'], 
  ['总体','期数','金额']
];
var threeArray = [
    [
      ['总体'],
      ['周帆','何忠全','杨德盘'],
      ['新疆维吾尔自治区','云南省','贵州省','广东省','内蒙古自治区','四川省','河北省','广西壮族自治区','海南省','浙江省',
      '河南省','甘肃省','安徽省','湖北省','黑龙江省','青海省','西藏自治区','吉林省','江苏省','北京市','山东省']
    ], 
    [
      ['总体'],
      ['6期','9期','12期','15期','18期','24期'],
      ['(2999.0, 3000.0]','(3000.0, 5000.0]','(5000.0, 8000.0]','(8000.0, 10000.0]','(10000.0, 15000.0]','(15000.0, inf]']
    ]
];
var oneSel = document.getElementById("One");
var twoSel = document.getElementById('Two');
var threeSel = document.getElementById('Three');
var str = '';
//下拉框一初始选项
for (var index = 0; index < oneArray.length; index++) {
    str += "<option value='" + index + "'>" + oneArray[index] + "</option>";
}
oneSel.innerHTML = str;
str = '';
//下拉框二初始选项
for (var index = 0; index < twoArray[0].length; index++) {
    str += "<option value='" + index + "'>" + twoArray[0][index] + "</option>";
}
twoSel.innerHTML = str;
str = '';
//下拉框三初始选项
for (var index = 0; index < threeArray[0].length; index++) {
    str += "<option>" + threeArray[0][0][index] + "</option>";
}
threeSel.innerHTML = str;
//动态改变下拉框二选项
function changeTwoSel() {
    twoSel.innerHTML = '';
    str = '';
    var twoSelValue = parseInt(oneSel.value);
    try {
        for (var index = 0; index < twoArray[twoSelValue].length; index++) {
            str += "<option value='" + index + "'>" + twoArray[twoSelValue][index] + "</option>";
        }
    } catch(ex) {
        str = "<option>无选项</option>";
    }
    twoSel.innerHTML = str;
    changeThreeSel();
}
//动态改变下拉框三选项
function changeThreeSel() {
    threeSel.innerHTML = '';
    str = '';
    var twoSelValue = parseInt(oneSel.value);
    var threeSelValue = parseInt(twoSel.value);
    try {
        for (var index = 0; index < threeArray[twoSelValue][threeSelValue].length; index++) {
            str += "<option value='" + index + "'>" + threeArray[twoSelValue][threeSelValue][index] + "</option>";
        }
    } catch(ex) {
        str = "<option>无选项</option>";
    }
    threeSel.innerHTML = str;
}