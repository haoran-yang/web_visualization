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
    drawchart_day(cdata);
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
    drawchart_day(cdata);
};
function drawchart_day(cdata) {
    var legend = ['0分(注册量)','0至100(注册量)','大于100(注册量)','0分(首逾率)','0至100(首逾率)','大于100(首逾率)']
    $.ajax({
        type: 'POST',
        url: "../v1/api/fpd_ratio/",
        data: cdata,
        success: function(dataset) {
            data = dataset.data;
            var apply_dt = [];
            var zcnums1 = [];
            var fpdrate1 = [];
            var zcnums2 = [];
            var fpdrate2 = [];
            var zcnums3 = [];
            var fpdrate3 = [];
            for(i=0; i<data.length; i++){
                if(data[i].apply_mth.length == 8){
                    if(data[i].ins_score=='fs=0'){
                        apply_dt.push(data[i].apply_mth)
                        zcnums1.push(data[i].zc_nums)
                        fpdrate1.push(data[i].fpd_ratio)
                    }
                    else if(data[i].ins_score=='0<fs<=100'){
                        zcnums2.push(data[i].zc_nums)
                        fpdrate2.push(data[i].fpd_ratio)
                    }
                    else if(data[i].ins_score=='fs>100'){
                        zcnums3.push(data[i].zc_nums)
                        fpdrate3.push(data[i].fpd_ratio)
                    }
                }  
            }
            var myChart = echarts.init(document.getElementById('main_day'), 'shine');
            myChart.setOption(options_day(apply_dt,zcnums1,zcnums2,zcnums3,fpdrate1,fpdrate2,fpdrate3));
        }
    })
};

function options_day(apply_dt,zcnums1,zcnums2,zcnums3,fpdrate1,fpdrate2,fpdrate3) {
    var colors = ['#006382','#1F8A70','#977B2D','#FD7400'];
    option = {
        title: {
            text: '注册量-首逾率',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(param){
                thtml1 = ''
                thtml2 = ''
                for(var i=0; i< param.length; i++){
                    if(param[i].axisIndex==0){
                        thtml1 += param[i].seriesName + ':  ' + param[i].value + '<br>'
                    }
                else if(param[i].axisIndex==1){
                    thtml2 += param[i].seriesName + ':  ' + (param[i].value*100).toFixed(1)+'%' + '<br>'
                }}
                return param[0].axisValue+'<br>注册量<br>'+thtml1+ '<br>首逾率<br>'+thtml2
            }
        },
        legend: {
            data:['0分','0-100分','大于100分'],
            x: 'left'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 70,
                end: 100,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                start: 70,
                end: 100,
                xAxisIndex: [0, 1]
            }
        ],
        grid: [{
            left: 50,
            right: 50,
            height: '35%'
        }, {
            left: 50,
            right: 50,
            top: '55%',
            height: '35%'
        }],
        xAxis : [
            {
                type : 'category',
                // boundaryGap : false,
                // axisLine: {onZero: true},
                data: apply_dt
            },
            {
                gridIndex: 1,
                type : 'category',
                // boundaryGap : false,
                // axisLine: {onZero: true},
                data: apply_dt,
                position: 'bottom'
            }
        ],
        yAxis : [
            {
                name : '注册量',
                type : 'value',
                // max : 500
            },
            {
                gridIndex: 1,
                name : '首逾率',
                type : 'value',
                // inverse: true
            }
        ],
        series : [
            {
                name:'0分',
                type:'bar',
                symbolSize: 8,
                hoverAnimation: false,
                stack: '总量',
                smooth: true,
                barMaxWidth: 25,
                barGap: '15%',
                data:zcnums1,
                itemStyle:{  
                    normal:{color: colors[0]}
                },
            },
            {
                name:'0-100分',
                type:'bar',
                symbolSize: 8,
                hoverAnimation: false,
                stack: '总量',
                smooth: true,
                barMaxWidth: 25,
                barGap: '15%',
                data:zcnums2,
                itemStyle:{  
                    normal:{color: colors[1]}
                },
            },
            {
                name:'大于100分',
                type:'bar',
                symbolSize: 8,
                hoverAnimation: false,
                stack: '总量',
                smooth: true,
                barMaxWidth: 25,
                barGap: '15%',
                data:zcnums3,
                itemStyle:{  
                    normal:{color: colors[2]}
                },
            },
            {
                name:'0分',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data: fpdrate1,
                itemStyle:{  
                    normal:{color: colors[0]}
                },
            },
            {
                name:'0-100分',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data: fpdrate2,
                itemStyle:{  
                    normal:{color: colors[1]}
                },
            },
            {
                name:'大于100分',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data: fpdrate3,
                itemStyle:{  
                    normal:{color: colors[2]}
                },
                label:{
                    normal:{
                        show:false,
                        position:'top',
                        formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                            }
                      },
            }
        ]
    };
    return option
};