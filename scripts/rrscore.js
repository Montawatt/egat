/*!
* Thai CKD risk score 1.0
* Copyright 2016
* Released under the Rama license.
*/
function kidneyrisk(lang) {
    //GET VALUE
    var tc = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);    //age, sex, dm, sbp, wc, cr, fbs, gfr
    if ($("#age").val() != '') { tc[0] = parseInt($("#age").val()) };
    tc[1] = parseInt($("#sex").val());
    tc[2] = parseInt($("#dm").val());
    if ($("#sbp").val() != '') { tc[3] = parseInt($("#sbp").val()) };
    if ($("#wc").val() != '') { tc[4] = parseInt(parseFloat($("#wc").val()) * 2.5) };
    if ($("#cr").val() != '') { tc[5] = parseFloat($("#cr").val()) };
    if ($("#fbs").val() != '') { tc[6] = parseInt($("#fbs").val()) };
    if ($("#gfr").val() != '') { tc[7] = parseInt($("#gfr").val()) };
    if (tc[6] >= 126) { tc[2] = 1 };    //Automatic DM checked
    //PROTOCOL
    if ($("#blood1").is(":checked") == true) {
        tc[5] = 0;
        $("#gfr").val('');
    } else if ($("#blood2").is(":checked") == true) {
        //no change
    };
    //FORMULAR
    var sum_risk = 0;
    sum_risk = KSformular(tc[0], tc[1], tc[2], tc[3], tc[4], tc[5], tc[7]);
    //Display
    if (sum_risk > 0) {
        var res = '';   //sc1
        var perc = '';  
        var sug = '';   //sc2        
        if (lang == 'th') {
            $.mobile.changePage("#regat2");
            if (tc[5] > 0) { res = 'ท่านมีค่าการทำงานของไต ' + String(tc[7]) + ' มล./นาที/1.73 ตรม. ' };
            if (tc[7] < 60 && tc[5] > 0) {
                res = res + 'ท่านจึงอาจมีโรคไตอยู่แล้วในปัจจุบัน';
                sug = 'ควรปรึกษาแพทย์';           
            } else {                
                //result
                if (sum_risk < 0.05) {
                    res = res + 'ท่านมีความเสี่ยง <em>น้อย</em> ต่อการเกิดโรคไตในระยะเวลา 10 ปี <em>(น้อยกว่า 5%)</em>';
                } else if (sum_risk <= 0.1) {
                    res = res + 'ท่านมีความเสี่ยง <em>ปานกลาง</em> ต่อการเกิดโรคไตในระยะเวลา 10 ปี <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                } else if (sum_risk <= 0.15) {
                    res = res + 'ท่านมีความเสี่ยง <em>สูง</em> ต่อการเกิดโรคไตในระยะเวลา 10 ปี <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                    perc = ' และควรตรวจสุขภาพกับแพทย์อย่างสม่ำเสมอ';
                } else if (sum_risk <= 0.2) {
                    res = res + 'ท่านมีความเสี่ยง <em>สูงกว่าปกติ</em> ต่อการเกิดโรคไตในระยะเวลา 10 ปี <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                    perc = ' และควรตรวจสุขภาพกับแพทย์อย่างสม่ำเสมอ';
                } else if (sum_risk > 0.2) {
                    res = res + 'ท่านมีความเสี่ยง <em>สูงมาก</em> ต่อการเกิดโรคไตในระยะเวลา 10 ปี <em>(มากกว่า 20%)</em>';
                    sug = sug + ' ควรหลีกเลี่ยงยากินแก้ปวดข้อ ปวดกล้ามเนื้อ (NSAIDs)';
                    if (tc[5] > 0) {
                        perc = ' และควรตรวจสุขภาพกับแพทย์อย่างสม่ำเสมอ';
                    } else {
                        perc = ' และท่านควรตรวจการทำงานของไตเพื่อให้มั่นใจว่าไตของท่านยังไม่มีปัญหาในปัจจุบัน';
                    };
                };
                //suggestion
                if (tc[2] == 1) { sug = sug + ' รักษาระดับน้ำตาลในเลือดให้อยู่ในเกณฑ์ปกติ' };
                if (tc[3] >= 140) { sug = sug + ' ควบคุมระดับความดันโลหิตให้ดี' };
                if ((tc[4] >= 38 && tc[1] == 1) || (tc[4] > 32 && tc[1] == 2)) { sug = sug + ' ลดน้ำหนักให้อยู่ในเกณฑ์ปกติ' };
                sug = 'เพื่อป้องกันการเกิดโรคไตในอนาคต ควรออกกำลังกายอย่างสม่ำเสมอ ดื่มน้ำให้เพียงพอ ลดกินเค็ม' + sug + perc;
            };
            $("#sc1").html(res);
            $("#sc2").text(sug);
        } else if (lang == 'en') {
            $.mobile.changePage("#eegat2");
            if (tc[5] > 0) { res = 'Your current kidney function (GFR) is ' + String(tc[7]) + ' ml/min/1.73 squr. meter. ' };
            if (tc[7] < 60 && tc[5] > 0) {
                res = res + 'You may have kidney disease already.';
                sug = 'Please consult your physician';
            } else {
                if (sum_risk < 0.05) {
                    res = res + 'Your 10-Year Kideney Disease Risk is <em>low</em>. <em>(less than 5%)</em>';
                } else if (sum_risk <= 0.1) {
                    res = res + 'Your 10-Year Kideney Disease Risk is <em>average</em>. <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                } else if (sum_risk <= 0.15) {
                    res = res + 'Your 10-Year Kideney Disease Risk is <em>high</em>. <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                    perc = ' and annual health checkup';
                } else if (sum_risk <= 0.2) {
                    res = res + 'Your 10-Year Kideney Disease Risk is <em>too high</em>. <em>(' + Math.round(sum_risk * 100) + '%)</em>';
                    perc = ' and annual health checkup';
                } else if (sum_risk > 0.2) {
                    res = res + 'Your 10-Year Kideney Disease Risk is <em>very high</em>. <em>(over 20%)</em>';
                    sug = sug + ', avoid oral NSAIDs';                    
                    if (tc[5] > 0) {
                        perc = ' and annual health checkup';
                    } else {
                        perc = ' and you should see your doctor to have a kidney function test done to make sure you do not have kidney problem now';
                    };
                };
                //suggestion
                if (tc[2] == 1) { sug = sug + ', keep blood sugar level within normal range' };
                if (tc[3] >= 140) { sug = sug + ', achieve goal of blood pressure controlling' };
                if ((tc[4] >= 38 && tc[1] == 1) || (tc[4] > 32 && tc[1] == 2)) { sug = sug + ', body weight lowering' };
                sug = 'It is reasonable to prevent kidney disease in the future by regular execise, adequate water intake, reduce salt intake' + sug + perc;
            };
            $("#sc1").html(res);
            $("#sc2").text(sug);
        };
    };
};
function eGFRformular() {
    if ($("#blood1").is(":checked") == true) {
        $("#gfr").val('');
    } else if ($("#blood2").is(":checked") == true) {
        var _age = 0;
        var _sex = 0;
        var _cr = 0;
        var _gfr = 0;
        if ($("#age").val() != '') { _age = parseInt($("#age").val()) };
        if ($("#cr").val() != '') { _cr = parseFloat($("#cr").val()) };
        _sex = parseInt($("#sex").val());
        if (_cr == 0) { return 0 };
        if (_sex == 0) {
            if (_cr <= 0.7) {
                _gfr = 141 * Math.pow((_cr / 0.7), (-0.329)) * Math.pow(0.993, _age);
            } else {
                _gfr = 141 * Math.pow((_cr / 0.7), (-1.209)) * Math.pow(0.993, _age);
            };
        } else {
            if (cr <= 0.9) {
                _gfr = 141 * Math.pow((_cr / 0.9), (-0.411)) * Math.pow(0.993, _age);
            } else {
                _gfr = 141 * Math.pow((_cr / 0.9), (-1.209)) * Math.pow(0.993, _age);
            };
        };
        $("#gfr").val(_gfr.toFixed(2));
    };
};
function KSformular(age, sex, dm, sbp, wc, cr, gfr) {
    //FORMULAR 
    var full_score = 0;
    var predicted_risk = 0;
    var compare_score = 0;
    var compare_risk = 0;
    var sur_root = 0.914940;
    //CALC
    if (cr == 0) {
        //Model 1
        full_score = (0.055834064240262306 * age) + (0.603337986716479 * sex) + (0.023633303263198093 * sbp) + (0.558629350280779 * dm) + (0.01594360399454897 * wc) - 10.2735847304812;
        predicted_risk = 1 / (1 + Math.exp(full_score * -1));
    } else {
        //Model 2
        full_score = (0.030493473393701852 * age) + (0.36773917741595746 * sex) + (0.02261155858459684 * sbp) + (0.9164352506061963 * dm) - (0.07184741954730657 * gfr) - 2.86732946487294;
        predicted_risk = 1 / (1 + Math.exp(full_score * -1));
    };
    return predicted_risk;
};
function bloodshift() {
    if ($("#blood1").is(":checked") == true) {
        $('#cr').slider('disable');
        $('#fbs').slider('disable');
        $('.selector').slider('refresh');
        $("#gfr").val('');
    } else if ($("#blood2").is(":checked") == true) {
        $('#cr').slider('enable');
        $('#fbs').slider('enable');
        $('.selector').slider('refresh');
        eGFRformular();
    };
};
