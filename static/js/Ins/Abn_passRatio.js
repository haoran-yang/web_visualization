function toPercent(point){
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
};

function filterMethod(data,begin_dt,end_dt,prod_line,ins_score,type_name,type_value,loan_nums,pass_ratio,filter_type){
    if(filter_type == 1){ // 1.针对特定type_value值
        return data.filter(item => item.apply_dt>=begin_dt&&item.apply_dt<=end_dt&&item.prod_line==prod_line&&item.ins_score==ins_score&&item.type_name == type_name&&item.type_value==type_value&&item.loan_nums>loan_nums&&item.pass_ratio>pass_ratio)
    }
    else if(filter_type == 2){ // 2.不对type_value进行筛选
        return data.filter(item => item.apply_dt>=begin_dt&&item.apply_dt<=end_dt&&item.prod_line==prod_line&&item.ins_score==ins_score&&item.type_name == type_name&&item.loan_nums>loan_nums&&item.pass_ratio>pass_ratio)
    }
    else if(filter_type == 3){ // 3.排除特定type_value值
        return data.filter(item => item.apply_dt>=begin_dt&&item.apply_dt<=end_dt&&item.prod_line==prod_line&&item.ins_score==ins_score&&item.type_name == type_name&&item.type_value!=type_value&&item.loan_nums>loan_nums&&item.pass_ratio>pass_ratio)
    }
    else{
        confirm("错误的计算方式")
    }
};

function select_dt(dt){
    // 正向添加
    var dt_id = document.getElementById("dt1");
    var str = '';
    for (var index = 0; index < dt.length; index++) {
        str += "<option value='" + index + "'>" + dt[index] + "</option>";
    }
    dt_id.innerHTML = str;
    // 反向添加
    var dt_id2 = document.getElementById("dt2");
    var str2 = '';
    for (var index = dt.length-1; index >=0; index--) {
        str2 += "<option value='" + index + "'>" + dt[index] + "</option>";
    }
    dt_id2.innerHTML = str2;
};

function get_dt(){
    $.ajax({
        type: 'POST',
        url: "../v1/api/ins_score/",
        data: cdata = {'prod_line': 'POS贷','type_name': '总体','type_value': '总体','ins_score': "fs=0"},
        success:function(dataset){
            data = dataset.data;
            var dt = [];
            for(var i=0;i<data.length;i++){
                if(dt.indexOf(data[i].apply_dt) <= -1){
                    dt.push(data[i].apply_dt)
                }
            };
            select_dt(dt);
        }
    })
};

function creatTable(){
    $.ajax({
        type: 'POST',
        url: "../v1/api/ins_score/",
        data: {'prod_line':'filter'},
        success: function(dataset){
            data = dataset.data;
            var dt1 = document.getElementById("dt1");
            var dt2 = document.getElementById("dt2");
            var begin_dt = dt1.options[dt1.selectedIndex].text;
            var end_dt = dt2.options[dt2.selectedIndex].text;
            var filter_data = new Array();
            var f_index = 0;
            var cols = ['rule_describe','apply_dt','prod_line','type_name','type_value','ins_score','loan_nums','pass_ratio'];
            var rules = [
            {'prod_line':'POS贷','ins_score':'fs>100','type_name':'总体','type_value':'总体','loan_nums':50,'pass_ratio':0.65,'rule_describe':'单量>50 且 通过率>0.65','filter_type':1},
            {'prod_line':'POS贷','ins_score':'fs>100','type_name':'省份','type_value':'新疆维吾尔自治区','loan_nums':20,'pass_ratio':0.8,'rule_describe':'单量>20 且 通过率>0.8（新疆）','filter_type':1},
            {'prod_line':'POS贷','ins_score':'fs>100','type_name':'省份','type_value':'新疆维吾尔自治区','loan_nums':10,'pass_ratio':0.4,'rule_describe':'单量>10 且 通过率>0.4（非新疆）','filter_type':3},
            {'prod_line':'POS贷','ins_score':'fs>100','type_name':'大区','type_value':'','loan_nums':50,'pass_ratio':0.6,'rule_describe':'单量>50 且 通过率>0.6（大区）','filter_type':2},
            {'prod_line':'K利贷','ins_score':'fs>100','type_name':'总体','type_value':'总体','loan_nums':10,'pass_ratio':0.4,'rule_describe':'单量>10 且 通过率>0.4','filter_type':1},
            {'prod_line':'K利贷','ins_score':'fs>100','type_name':'金额','type_value':'','loan_nums':10,'pass_ratio':0.4,'rule_describe':'单量>10 且 通过率>0.4','filter_type':2},
            {'prod_line':'K利贷','ins_score':'fs>100','type_name':'期数','type_value':'','loan_nums':10,'pass_ratio':0.4,'rule_describe':'单量>10 且 通过率>0.4','filter_type':2},
        ]
            // for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < rules.length; j++) {
                    v = filterMethod(data,begin_dt,end_dt,rules[j].prod_line,rules[j].ins_score,rules[j].type_name,rules[j].type_value,rules[j].loan_nums,rules[j].pass_ratio,rules[j].filter_type)
                    if(v){
                        for(var i=0;i<v.length;i++){
                            v[i]['rule_describe'] = rules[j].rule_describe
                            filter_data[f_index] = v[i]
                            f_index += 1
                        }
                    };
                }
            // 清空table数据
            var tb = document.getElementById('tb');
            var rowNum=tb.rows.length;
            for (i=1;i<rowNum;i++){
                    tb.deleteRow(i);
                    rowNum=rowNum-1;
                    i=i-1;
                };
            // 逐行向table添加数据
            for(var ii=0;ii < filter_data.length;ii++){
                var x=document.getElementById('tb').insertRow();
                for(var jj=0;jj<cols.length;jj++){
                    if(cols[jj]=='pass_ratio'){v = toPercent(filter_data[ii][cols[jj]])} //Math.round(filter_data[i][cols[j]]*100)/100 保留2位小数
                    else(v = filter_data[ii][cols[jj]])
                    var cell1=x.insertCell();
                    cell1.innerHTML=v;
                }
                }
        }
    })
};