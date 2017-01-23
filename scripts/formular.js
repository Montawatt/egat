/*!
* Thai CV risk score 1.0
* Copyright 2015
* Released under the Rama license.
age in year, smoke 0-1, dm 0-1, sbp in mmHg, sex 0-1, lipid mg/dL, wc in cm, weight in kg, height in cm
*/
function ThaiASCVD(lang) {
    //GET VALUE
    var tc = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);    //age, smoke, dm, sbp, sex, tc-5, ldl-6, hdl-7, whr-8, wc-9, height-10
    if ($("#age").val() != '') { tc[0] = parseInt($("#age").val()) };
    tc[1] = parseInt($("#smoke").val());
    tc[2] = parseInt($("#dm").val());
    if ($("#sbp").val() != '') { tc[3] = parseInt($("#sbp").val()) };
    tc[4] = parseInt($("#sex").val());
    if ($("#tc").val() != '') { tc[5] = parseInt($("#tc").val()) };
    if ($("#ldl").val() != '') { tc[6] = parseInt($("#ldl").val()) };
    if ($("#hdl").val() != '') { tc[7] = parseInt($("#hdl").val()) };
    if ($("#wc").val() != '') { tc[9] = parseInt(parseFloat($("#wc").val())) };
    if ($("#bdh").val() != '') { tc[10] = parseInt($("#bdh").val()) };
    if (tc[9] > 0 && tc[10] > 0) { tc[8] = tc[9] / tc[10] };
    //PROTOCOL
    if ($("#blood1").is(":checked") == true) {
        tc[5] = 0;
        tc[6] = 0;
        tc[7] = 0;
        tc[8] = 0;
        tc[10] = 0;
    } else if ($("#blood2").is(":checked") == true) {
        tc[5] = 0;
        tc[6] = 0;
        tc[7] = 0;
    } else if ($("#blood3").is(":checked") == true) {
        tc[6] = 0;
        tc[7] = 0;
        tc[8] = 0;
        tc[9] = 0;
        tc[10] = 0;
    } else if ($("#blood4").is(":checked") == true) {
        tc[6] = 0;
        tc[8] = 0;
        tc[9] = 0;
        tc[10] = 0;
    } else if ($("#blood5").is(":checked") == true) {
        tc[5] = 0;
        tc[7] = 0;
        tc[8] = 0;
        tc[9] = 0;
        tc[10] = 0;
    } else if ($("#blood6").is(":checked") == true) {
        tc[5] = 0;
        tc[8] = 0;
        tc[9] = 0;
        tc[10] = 0;
    };
    //FORMULAR
    var sum_risk = new Array();
    sum_risk = TASCVDformular(tc[0], tc[1], tc[2], tc[3], tc[4], tc[5], tc[6], tc[7], tc[8], tc[9]);
    //Display
    if (sum_risk[1] > 0) {
        if (lang == 'th') {
            $.mobile.changePage("#regat2");
            var tt_risk = (sum_risk[1] / sum_risk[3]).toFixed(1);
            $("#sc2").text((sum_risk[1] * 100).toFixed(2));
            if (tt_risk > 1.1) {
                $("#sc1").text('ซึ่งระดับความเสี่ยงของท่านสูงเป็น ' + String(tt_risk) + ' เท่า');
            } else if (tt_risk < 0.9) {
                $("#sc1").text('ซึ่งระดับความเสี่ยงของท่านต่ำเป็น ' + String(tt_risk) + ' เท่า');
            } else {
                $("#sc1").text('ซึ่งใกล้เคียงกับระดับความเสี่ยง');
            };
            //Group of risk and suggestion
            var sug = '';
            if (tc[1] == 1) { sug = sug + ' เลิกสูบบุหรี่' };
            if (tc[2] == 1) { sug = sug + ' รักษาระดับน้ำตาลในเลือดให้อยู่ในเกณฑ์ปกติ' };
            if (tc[3] >= 140) { sug = sug + ' ควบคุมระดับความดันโลหิตให้ดี' };
            if (tc[5] >= 220 || tc[6] >= 190) { sug = sug + ' เข้ารับการรักษาเพื่อลดโคเรสเตอรอลในเลือด' };
            if ((tc[9] >= 95 && tc[4] == 1) || (tc[9] > 80 && tc[4] == 0)) { sug = sug + ' ลดน้ำหนักให้อยู่ในเกณฑ์ปกติ' };
            if (sum_risk[1] < 0.1) {
                $("#sc5").text("จัดอยู่ในกลุ่มเสี่ยงน้อย");
                $("#sc4").text("เพื่อป้องกันการเกิดโรคหลอดเลือดในอนาคต ควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ" + sug + " และตรวจสุขภาพประจำปี");
            } else if (sum_risk[1] >= 0.1 && sum_risk[1] < 0.2) {
                $("#sc5").text("จัดอยู่ในกลุ่มเสี่ยงปานกลาง");
                $("#sc4").text("ควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ" + sug + " และควรได้รับการตรวจร่างกายประจำปีอย่างสม่ำเสมอ");
            } else if (sum_risk[1] >= 0.2) {
                $("#sc5").text("จัดอยู่ในกลุ่มเสี่ยงสูง");
                $("#sc4").text("ควรเข้ารับคำปรึกษาจากแพทย์ ในเบื้องต้นควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ" + sug + " และเข้ารับการตรวจสุขภาพประจำปีอย่างสม่ำเสมอ");
            } else {
                $("#sc5").text("ไม่พบความเสี่ยง");
                $("#sc4").text("สามารถป้องกันการเกิดโรคหลอดเลือดหัวใจในอนาคตได้ด้วยการออกกำลังกายอย่างสม่ำเสมอ");
            };
        } else if (lang == 'en') {
            $.mobile.changePage("#eegat2");
            var tt_risk = (sum_risk[1] / sum_risk[3]).toFixed(1);
            $("#sc2").text((sum_risk[1] * 100).toFixed(2));
            if (tt_risk > 1.1) {
                $("#sc1").text('that is higher about ' + String(tt_risk) + ' times ');
            } else if (tt_risk < 0.9) {
                $("#sc1").text('that is lower about ' + String(tt_risk) + ' times ');
            } else {
                $("#sc1").text('that has no different ');
            };
            //Group of risk and suggestion
            var sug = '';
            if (tc[1] == 1) { sug = sug + ', quit smoking' };
            if (tc[2] == 1) { sug = sug + ', keep blood sugar level within normal range' };
            if (tc[3] >= 140) { sug = sug + ', achieve goal of blood pressure controlling' };
            if (tc[5] >= 220 || tc[6] >= 190) { sug = sug + ', intensify cholesterol-lowering therapy' };
            if ((tc[9] >= 95 && tc[4] == 1) || (tc[9] > 80 && tc[4] == 0)) { sug = sug + ', body weight lowering' };
            if (sum_risk[1] < 0.1) {
                $("#sc5").text("classified as low risk");
                $("#sc4").text("It is reasonable to prevent atherosclerotic cardiovascular disease in the future by regular execise, high fiber dietary" + sug + " and annual health checkup.");
            } else if (sum_risk[1] >= 0.1 && sum_risk[1] < 0.2) {
                $("#sc5").text("classified as medium risk");
                $("#sc4").text("You should have regular execise, high fiber dietary" + sug + " and annual health checkup.");
            } else if (sum_risk[1] >= 0.2) {
                $("#sc5").text("classified as high risk");
                $("#sc4").text("You must visit the physician for health checkup and recieve properly therapy. You must have regular execise, high fiber dietary" + sug + " now.");
            } else {
                $("#sc5").text("no risk");
                $("#sc4").text("Regular exercise could help you prevent atherosclerotic cardiovascular disease in the future.");
            };
        };
    };
};
function TASCVDformular(age, smoke, dm, sbp, sex, tc, ldl, hdl, whr, wc) {
    //FORMULAR
    var full_score = 0;
    var compare_score = 0;
    var predicted_risk = 0;
    var compare_risk = 0;
    var compare_whr = 0.52667;
    var compare_wc = 79;
    var compare_sbp = 120;
    var compare_hdl = 44;
    var sur_root = 0.978296;
    if (sex == 0) { compare_hdl = 49 };
    if (sex == 1 && age > 60) { compare_sbp = 132 };
    if (sex == 0 && age <= 60) { compare_sbp = 115 };
    if (sex == 0 && age > 60) { compare_sbp = 130 };
    if (sex == 1) {
        compare_whr = 0.58125;
        compare_wc = 93;
    };
    if (age > 1 && sbp > 50) {
        if (ldl > 0) {            
            if (hdl > 0) {
                full_score = (0.08305 * age) + (0.24893 * sex) + (0.02164 * sbp) + (0.65224 * dm) + (0.00243 * ldl) + ((-0.01965) * hdl) + (0.43868 * smoke);
                predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 5.9826)));
                compare_score = (0.08305 * age) + (0.24893 * sex) + (0.02164 * compare_sbp) + (0.00243 * 130) + ((-0.01965) * compare_hdl);
                compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 5.9826)));
            } else {
                full_score = (0.08169 * age) + (0.35156 * sex) + (0.02084 * sbp) + (0.65052 * dm) + (0.002094 * ldl) + (0.45639 * smoke);
                predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 6.99911)));
                compare_score = (0.08169 * age) + (0.35156 * sex) + (0.02084 * compare_sbp) + (0.02094 * 130);
                compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 6.99911)));
            };
        } else if (tc > 0) {
            if (hdl > 0) {
                full_score = (0.083 * age) + (0.28094 * sex) + (0.02111 * sbp) + (0.69005 * dm) + (0.00214 * tc) + ((-0.02148) * hdl) + (0.40068 * smoke);
                predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 6.00168)));
                compare_score = (0.083 * age) + (0.28094 * sex) + (0.02111 * compare_sbp) + (0.00214 * 200) + ((-0.02148) * compare_hdl);
                compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 6.00168)));
            } else {
                full_score = (0.08183 * age) + (0.39499 * sex) + (0.02084 * sbp) + (0.69974 * dm) + (0.00212 * tc) + (0.41916 * smoke);
                predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 7.04423)));
                compare_score = (0.08183 * age) + (0.39499 * sex) + (0.02084 * compare_sbp) + (0.00212 * 200);
                compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 7.04423)));
            };
        } else if (whr > 0) {   //ของ อ.ปริญ มีสูตรนี้สูตรเดียว
            full_score = (0.079 * age) + (0.128 * sex) + (0.019350987 * sbp) + (0.58454 * dm) + (3.512566 * whr) + (0.459 * smoke);
            predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 7.720484)));
            compare_score = (0.079 * age) + (0.128 * sex) + (0.019350987 * compare_sbp) + (3.512566 * compare_whr);
            compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 7.720484)));
        } else if (wc > 0) {
            full_score = (0.08372 * age) + (0.05988 * sex) + (0.02034 * sbp) + (0.59953 * dm) + (0.01283 * wc) + (0.459 * smoke);
            predicted_risk = 1 - (Math.pow(sur_root, Math.exp(full_score - 7.31047)));
            compare_score = (0.08372 * age) + (0.05988 * sex) + (0.02034 * compare_sbp) + (0.01283 * compare_wc);
            compare_risk = 1 - (Math.pow(sur_root, Math.exp(compare_score - 7.31047)));
        } else {

        };
    };
    if (predicted_risk > 0.3) { predicted_risk = 0.3 };
    var risk = new Array(full_score, predicted_risk, compare_score, compare_risk);
    return risk;
};
function bloodshift() {
    if ($("#blood1").is(":checked") == true) {
        //alert("WC");
        $('#tc').slider('disable');
        $('#ldl').slider('disable');
        $('#hdl').slider('disable');
        $('#wc').slider('enable');
        $('#bdh').slider('disable');
        $('.selector').slider('refresh');
    } else if ($("#blood2").is(":checked") == true) {
        //alert("WHR");
        $('#tc').slider('disable');
        $('#ldl').slider('disable');
        $('#hdl').slider('disable');
        $('#wc').slider('enable');
        $('#bdh').slider('enable');
        $('.selector').slider('refresh');
    } else if ($("#blood3").is(":checked") == true) {
        //alert("TC");
        $('#tc').slider('enable');
        $('#ldl').slider('disable');
        $('#hdl').slider('disable');
        $('#wc').slider('disable');
        $('#bdh').slider('disable');
        $('.selector').slider('refresh');
    } else if ($("#blood4").is(":checked") == true) {
        //alert("TC+HDL");
        $('#tc').slider('enable');
        $('#ldl').slider('disable');
        $('#hdl').slider('enable');
        $('#wc').slider('disable');
        $('#bdh').slider('disable');
        $('.selector').slider('refresh');
    } else if ($("#blood5").is(":checked") == true) {
        //alert("LDL");
        $('#tc').slider('disable');
        $('#ldl').slider('enable');
        $('#hdl').slider('disable');
        $('#wc').slider('disable');
        $('#bdh').slider('disable');
        $('.selector').slider('refresh');
    } else if ($("#blood6").is(":checked") == true) {
        //alert("LDL+HDL");
        $('#tc').slider('disable');
        $('#ldl').slider('enable');
        $('#hdl').slider('enable');
        $('#wc').slider('disable');
        $('#bdh').slider('disable');
        $('.selector').slider('refresh');
    };
};
