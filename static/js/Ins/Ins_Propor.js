$(function () {
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
function selectOnchang(){
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
}

function drawchart(cdata){
    var legend = ['A','B','C']
    var symbolsize = 8
    $.ajax({
        type: 'POST',
        url: "../v1/api/ins_propor/",
        data: cdata,
        success: function(dataset){
            data = dataset.data;
            // updatetime = 'now ' + dataset.times.substr(0,7);
            // console.log(data)
            var apply_dt1 = [];
            var score_propor1 = [];
            var score_propor2 = [];
            var score_propor3 = [];
            for(i=0; i<data.length; i++){
                if(data[i].ins_score=='fs=0'){apply_dt1.push(data[i].apply_dt); score_propor1.push(data[i].score_propor)}
                else if(data[i].ins_score=='0<fs<=100'){score_propor2.push(data[i].score_propor)}
                else if(data[i].ins_score=='fs>100'){score_propor3.push(data[i].score_propor)}
            }
            colors = ['#406374','#5B8CA9','#669FC6','#70B5E4','#87D1FF','#BBEAF9'];
            colors = ['#006382','#1F8A70','#BEDB39','#FD7400']
            // colors = ['#263E72','#34549E','#436CC7','#8FB3F2']
            // colors = ['#95e1d3','#eaffd0','#fce38a','#f38181',]
            var myChart = echarts.init(document.getElementById('main'), 'shine');
            var option = {
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
                            if(param[i].seriesName=='fs=0'){var sName = '0分'}
                            else if(param[i].seriesName=='0<fs<=100'){var sName = '0-100分'}
                            else if(param[i].seriesName=='fs>100'){var sName = '大于100分'}
                            thtml += sName + ': ' + (param[i].value*100).toFixed(2)+'%' + '<br>'
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
                        fontSize: 16,
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                dataZoom: [
                    {type: 'inside',
                    start: 72,
                    end: 100},
                {
                    type: 'slider',
                    start:  72,//100-6/apply_dt1.length*100,
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
                        data: apply_dt1
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        // name: '',
                        max: 1,
                        min: 0,
                        axisLabel:{
                            formatter:function(value){return (value*100).toFixed(0)+'%'}
                        }
                    }
                ],
                series: [
                    {   
                        data: score_propor1,
                        name:legend[0],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: symbolsize,
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
                                color: colors[0]
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        textStyle:{
                                           color:colors[0],
                                           fontSize:20
                                        },  
                                    },
                              },
                    },
                    {   
                        data: score_propor2,
                        name:legend[1],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: symbolsize,
                        lineStyle: {
                            normal: {
                                color: colors[3],
                                width: 2,
                                // type: 'normal'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: colors[3],
                                color: colors[3]
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        textStyle:{
                                           color:colors[3],
                                           fontSize:20
                                        },  
                                    },
                              },
                    },
                    {   
                        data: score_propor3,
                        name:legend[2],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: symbolsize,
                        lineStyle: {
                            normal: {
                                color: colors[1],
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
                                show:true,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        textStyle:{
                                           color:colors[1],
                                           fontSize:20
                                        },  
                                    },
                              },
                    },
                ]
            };
            myChart.setOption(option);
        }
    })
};