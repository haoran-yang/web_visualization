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
    var legend = ["欺诈分=0", "0<欺诈分<=100", "欺诈分>100",'','','']
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
            myChart.setOption(options_day(apply_dt,legend,zcnums1,zcnums2,zcnums3,fpdrate1,fpdrate2,fpdrate3));
        }
    })
};

function options_day(apply_dt, legend,zcnums1,zcnums2,zcnums3,fpdrate1,fpdrate2,fpdrate3) {
    var colors = ['#006382','#1F8A70','#977B2D','#FD7400'];
    var emph_color = '#A12F2F',
    emph_sizes = 16;
    var option = {
        title: {
                    text: '',
                    textStyle: {
                    color:'#337AB7',
                    fontStyle:'normal',
                    fontWeight:'bolder',
                    //字体系列
                    fontFamily:'sans-serif',
                    //字体大小
            　　　　 fontSize:20
                    },
                    left: '6%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function(param){
                        thtml = ''
                        for(var i=0; i< param.length; i++){
                            if(param[i].seriesName=='首逾率'){
                                 thtml += param[i].seriesName + ': ' + (param[i].value*100).toFixed(1)+'%' + '<br>'
                            }
                            else
                            {thtml += param[i].seriesName + ': ' + param[i].value + '<br>'}
                        }
                        return thtml
                    }
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: legend,
                    right: '4%',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true,
                    textStyle: {
                        color: "#fff"
                    }
                },
                dataZoom: [
                    {type: 'inside',
                    start: 75,//100-6/apply_dt.length*100,
                    end: 100},
                {
                    type: 'slider',
                    start: 75,//100-6/apply_dt.length*100,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                xAxis: [
                    {
                        type: 'category',
                        data: apply_dt,
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '注册量',
                        color:'black',
                        fontSize:16,
                        // max: 1000,
                        // min: 0
                    },
                    {
                        type: 'value',
                        name: '首逾率',
                        max: 1,
                        min: 0,
                        axisLabel:{
                            formatter:function(value){return (value*100).toFixed(0)+'%'}
                        }
                    }
                ],
                series: [
                    {
                        name: legend[0],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: zcnums1,
                        barMaxWidth: 25,
                        barGap: '15%',
                        stack: '总量',
                        itemStyle:{
                            normal:{color: colors[0]} //"rgba(0,191,183,1)"
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside'},
                                emphasis: {
                                    textStyle:{
                                       color:emph_color,
                                       fontSize:emph_sizes
                                    },  
                                },
                              }
                    },
                    {
                        name: legend[1],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: zcnums2,
                        barMaxWidth: 25,
                        barGap: '15%',
                        stack: '总量',
                        itemStyle:{  
                            normal:{color: colors[1]}//"rgba(255,144,128,1)"
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside'},
                                emphasis: {
                                    textStyle:{
                                       color: emph_color,
                                       fontSize:emph_sizes
                                    },  
                                },
                              }
                    },
                    {
                        name: legend[2],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: zcnums3,
                        barMaxWidth: 25,
                        barGap: '15%',
                        stack: '总量',
                        itemStyle:{  
                            normal:{color: colors[2]}//"rgba(255,144,128,1)"
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside'},
                                emphasis: {
                                    textStyle:{
                                       color: emph_color,
                                       fontSize:emph_sizes
                                    },  
                                },
                              }
                    },
                    {
                        name: legend[3],
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        data: fpdrate1,
                        symbolSize:8,
                        symbol: 'roundRect',
                        lineStyle: {
                            normal: {
                                color: colors[0],
                                width: 2,
                                // type: 'normal'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: colors[0],
                                color: 'white'
                                    }
                                },
                        label:{
                            normal:{
                                show:false,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        show:true,
                                        position:'top',
                                        textStyle:{
                                           color:colors[0],
                                           fontSize:18,
                                        },  
                                    },
                              },
                    },
                    {
                        name: legend[4],
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        data: fpdrate2,
                        symbolSize:8,
                        symbol: 'roundRect',
                        lineStyle: {
                            normal: {
                                color: colors[4],
                                width: 2,
                                // type: 'normal'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: colors[1],
                                color: colors[1]
                                    }
                                },
                        label:{
                            normal:{
                                show:false,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        show:true,
                                        position:'top',
                                        textStyle:{
                                           color:colors[1],
                                           fontSize:18,
                                        },  
                                    },
                              },
                    },
                    {
                        name: legend[5],
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        data: fpdrate3,
                        symbolSize:8,
                        symbol: 'roundRect',
                        lineStyle: {
                            normal: {
                                color: colors[5],
                                width: 2,
                                // type: 'normal'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: colors[2],
                                color: colors[2]
                                    }
                                },
                        label:{
                            normal:{
                                show:false,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        show:true,
                                        position:'top',
                                        textStyle:{
                                           color:colors[2],
                                           fontSize:18,
                                        },  
                                    },
                              },
                    }
                ]
    };
    return option
};