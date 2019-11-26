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
        'ins_score': "fs=0"
    };
    drawchart(cdata);
    // console.log(cdata.ins_score)
    cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
        'ins_score': "0<fs<=100"
    };
    drawchart(cdata);
    cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
        'ins_score': "fs>100"
    };
    drawchart(cdata)
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
        'ins_score': "fs=0"
    };
    // console.log(cdata)
    drawchart(cdata);
    cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
        'ins_score': "0<fs<=100"
    };
    drawchart(cdata);
    cdata = {
        'prod_line': One.options[One.selectedIndex].text,
        'type_name': Two.options[Two.selectedIndex].text,
        'type_value': Three.options[Three.selectedIndex].text,
        'ins_score': "fs>100"
    };
    drawchart(cdata)
};

function drawchart(cdata){
    var main_ids = {'fs=0':['欺诈分=0','main'],'0<fs<=100':['0<欺诈分<=100','main2'],'fs>100':['欺诈分>100','main3']};
    var text = main_ids[cdata.ins_score][0];
    var main_id = main_ids[cdata.ins_score][1];
    
    var legend = ['total','part1','part2','ratio']
    $.ajax({
        type: 'POST',
        url: "../v1/api/ins_score/",
        data: cdata,
        success: function(dataset){
            data = dataset.data;
            // updatetime = 'now ' + dataset.times.substr(0,7);
            // console.log(data[0])
            var apply_dt = [];
            var loannums = [];
            var passnums = [];
            var refusenums = [];
            var passrate = [];
            for(i=0; i<data.length; i++){
                apply_dt.push(data[i].apply_dt)
                loannums.push(data[i].loan_nums)
                passnums.push(Math.round(data[i].pass_ratio*data[i].loan_nums))
                refusenums.push(data[i].loan_nums-Math.round(data[i].pass_ratio*data[i].loan_nums))
                passrate.push(data[i].pass_ratio)
            }
            // colors = ['#406374','#5B8CA9','#669FC6','#70B5E4','#87D1FF','#BBEAF9'];
            // colors = ['#318C80','#A6E582','#51D9B5','#D95B5B']
            // colors = ['#093759','#AAC2AC','#EBB690','#F33735']
            // colors = ['#475F77','#A7AA9D','#2192BC','#D74B4B']
            var colors = ['#006382','#1F8A70','#977B2D','#FD7400'];
            // colors= ['#61418C','#434F96','#E5AA25','#2598BC','#13c2c2']
            // colors = ['#263E72','#34549E','#436CC7','#8FB3F2']
            // colors = ['#95e1d3','#eaffd0','#fce38a','#f38181',]
            var emph_color = '#A12F2F',
            emph_size = 16;
            var myChart = echarts.init(document.getElementById(main_id), 'shine');
            var option = {
                // backgroundColor: "#344b58",
                title: {
                    text: 'text name',
                    textStyle: {
                        //深红 #ff6600 ； 大红 #ff0000 ； 粉红 #ff66cc ； 淡红 #ff66ff ； 绿色 #ccff00 ； 紫蓝 #ff33ff ； 黄色 #ffff33 ； 金红 #cc0000 ； 
                        //天蓝 #66ffff ； 草绿 #66cc00 ； 深蓝 #3333ff ； 橙色 #ff9900 ； 深绿 #339900 ； 白色 #ffffff ； 黑色 #000000 ； 红色#FF0033；
                    color:'#337AB7',
                    //字体风格,'normal','italic','oblique'
                    fontStyle:'normal',
                    //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    fontWeight:'bolder',
                    //字体系列
                    fontFamily:'sans-serif',
                    //字体大小
            　　　　 fontSize:20
                    },
                    // 副标题
                    // subtext: updatetime,
                    // subtextStyle:{
                    //     fontWeight: 'normal',
                    //     fontSize: 10,
                    // },
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
                            if(param[i].seriesName=='通过率'){
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
                        data: apply_dt
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        max: 2500,
                        // min: 0
                    },
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
                        name: legend[0],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: loannums,
                        barMaxWidth: 25,
                        barGap: '15%',
                        itemStyle:{  
                            normal:{color: colors[0]}//"rgba(255,144,128,1)"
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside'},
                                emphasis: {
                                    textStyle:{
                                       color:emph_color,
                                       fontSize:emph_size
                                    },  
                                },
                              },
                    },
                    {
                        name: legend[1],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: passnums,
                        barMaxWidth: 25,
                        barGap: '15%',
                        stack: '总量',
                        itemStyle:{  
                            normal:{color: colors[1]} //"rgba(0,191,183,1)"
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside'},
                                emphasis: {
                                    textStyle:{
                                       color:emph_color,
                                       fontSize:emph_size
                                    },  
                                },
                              }
                    },
                    {
                        name: legend[2],
                        type: 'bar',
                        smooth: true,
                        yAxisIndex: 0,
                        data: refusenums,
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
                                       fontSize:emph_size
                                    },  
                                },
                              }
                    },
                    {
                        name: legend[3],
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        data: passrate,
                        symbolSize:8,
                        symbol: 'roundRect',
                        // itemStyle:{ normal:{
                        //                     color:colors[3],//"rgba(252,230,48,1)",//'#00b8a9'//colors[4] '#3ec1d3'
                        //                      }
                        //           },
                        lineStyle: {
                            normal: {
                                color: colors[3],
                                width: 3,
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
                                show:false,
                                position:'top',
                                formatter:function(param){return (param.value*100).toFixed(0)+'%'}
                                    },
                                    emphasis: {
                                        show:true,
                                        position:'top',
                                        textStyle:{
                                           color:colors[3],
                                           fontSize:18,
                                        },  
                                    },
                              },
                        // markLine: {data: [{type: 'average', name: '平均值'}]} 
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = function () {
                myChart.resize();
            }
        }
    })
};