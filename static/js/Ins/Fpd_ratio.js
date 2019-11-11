$(function() {
    changeTwoSel();
    changeThreeSel();
    var One = document.getElementById("One");
    var Two = document.getElementById("Two");
    var Three = document.getElementById("Three");
    // 初始加载数据
    var cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
    };
    drawchart(cdata);
    // console.log(cdata.ins_score)
});

// 当周期选择改变时，触发，重新加载数据
function selectOnchang() {
    var One = document.getElementById("One");
    var Two = document.getElementById("Two");
    var Three = document.getElementById("Three");
    var cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
    };
    // console.log(cdata)
    drawchart(cdata);
};

function drawchart(cdata) {
    $.ajax({
        type: 'POST',
        url: "../v1/api/fpd_ratio/",
        data: cdata,
        success: function(dataset) {
            var data = dataset.data;
            var mth = ['201909', '201910'];
            var idname = ['main', 'main2'];
            for (m = 0; m < mth.length; m++) {
                var zcNums = [0, 0, 0];
                var valData = [NaN, NaN, NaN];
                var fpdNums = [0, 0, 0];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].apply_mth == mth[m]) {
                        if (data[i].ins_score == 'fs=0') {
                            valData[0] = data[i].fpd_ratio;
                            zcNums[0] = data[i].zc_nums;
                            fpdNums[0] = Math.round(data[i].fpd_ratio * data[i].zc_nums);
                        } else if (data[i].ins_score == '0<fs<=100') {
                            valData[1] = data[i].fpd_ratio;
                            zcNums[1] = data[i].zc_nums;
                            fpdNums[1] = Math.round(data[i].fpd_ratio * data[i].zc_nums);
                        } else if (data[i].ins_score == 'fs>100') {
                            valData[2] = data[i].fpd_ratio;
                            zcNums[2] = data[i].zc_nums;
                            fpdNums[2] = Math.round(data[i].fpd_ratio * data[i].zc_nums);
                        };
                    }
                }
                var maxData = 0.2;
                for (var i = 0; i < valData.length; i++) {
                    if (valData[i] > maxData) {
                        maxData = valData[i].toFixed(2)
                    }
                };
                var myChart = echarts.init(document.getElementById(idname[m]), 'shine');
                myChart.setOption(options(mth[m], maxData, valData, zcNums, fpdNums));
            }
        }
    })
};

function options(title, maxData, valData, zcNums, fpdNums) {
    var itemData = ["欺诈分=0", "0<欺诈分<=100", "欺诈分>100"];
    var spirit = 'path://M41.6,44.3 C39,43 35.6,40.6 35.6,38.5 C35.6,37.4 36,36.7 36.4,36.5 C41.4,33.7 43.1,24.5 43.4,24.5 C45.1,24.5 46.3,20.2 46.3,17.4 C46.3,15.1 45.6,15.2 44.4,14.5 L44.4,14.2 C44.4,6.7 38.5,1 31.1,1 C23.8,1 17.5,7 17.5,14.4 L17.5,14.7 C16.3,15.4 15.8,15.8 15.8,18 C15.8,20.9 16.8,24.9 18.5,24.9 C18.8,24.9 21,33.7 25.8,36.7 C26.1,36.9 26.6,37.4 26.6,38.4 C26.6,40.8 23.4,42.9 20.7,44.3 C17.4,46 1,47.4 1,63 L61,63 C61,47.4 45.7,46.4 41.6,44.3 L41.6,44.3 Z';
    var itemFontsize = 16;
    var lableSize = 16;
    var symbolSize = [25, 20];
    var symbolColor = ["#FD7400"];
    var fontColor = '#406374';
    var option = {
        title: {
            left: 'center',
            text: title,
            textStyle: {
                color: '#406374',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bolder',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
                　　　　fontSize: 24
            }
        },
        tooltip: {
            show: false
        },
        xAxis: {
            max: maxData,
            splitLine: {
                show: false
            },
            offset: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                show: true
            }
        },
        yAxis: {
            data: itemData,
            inverse: true,
            axisTick: {
                show: true
            },
            axisLine: {
                show: true
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: fontColor,
                    fontSize: itemFontsize,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 600
                }
            }
        },
        grid: {
            top: '20%',
            height: '60%',
            left: '15%',
            right: '20%'
        },
        series: [{
            type: 'pictorialBar',
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '10%',
            symbolClip: true,
            symbolSize: symbolSize,
            symbolBoundingData: maxData,
            color: symbolColor,
            data: valData,
            z: 10
        },
        {
            type: 'pictorialBar',
            color: symbolColor,
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: function(param) {
                        return (param.value * 100).toFixed(2) + '% = ' + fpdNums[param.dataIndex] + ' / ' + zcNums[param.dataIndex]
                    },
                    position: 'right',
                    align: 'left',
                    // 左对齐
                    offset: [0, 0],
                    textStyle: {
                        color: fontColor,
                        fontSize: lableSize,
                        fontFamily: 'Microsoft YaHei'
                    }
                }
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '10%',
            symbol: spirit,
            symbolSize: symbolSize,
            symbolBoundingData: maxData,
            data: valData,
            z: 3
        }]
    };
    return option
};