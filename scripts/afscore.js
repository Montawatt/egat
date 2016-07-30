/*!
* Thai EP club 1.0
* Copyright 2016
* Released under the Rama license.
*/
function ThaiEPclub(scsy) {
    //GET VALUE
    var tc = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var sum_risk = 0;
    var sum_text = "";
    if (scsy == 1) {
        //FHR: age, sex, sbp, htd, bww, bdh, sigm, hfd, pri, bmi
        if ($("#age").val() != '') { tc[0] = parseInt($("#age").val()) };
        tc[1] = parseInt($("#sex").val());
        if ($("#sbp").val() != '') { tc[2] = parseInt($("#sbp").val()) };
        tc[3] = parseInt($("#htd").val());
        if ($("#bww").val() != '') { tc[4] = parseInt($("#bww").val()) };
        if ($("#bdh").val() != '') { tc[5] = parseInt($("#bdh").val()) };
        tc[6] = parseInt($("#sigm").val());
        tc[7] = parseInt($("#hfd").val());
        if ($("#pri").val() != '') { tc[8] = parseInt($("#pri").val()) };
        if (tc[4] > 0 && tc[5] > 0) { tc[9] = tc[4] / (tc[5] * 0.0001 * tc[5]) };
        //FORMULAR
        sum_risk = FHAFRS(tc[0], tc[1], tc[2], tc[3], tc[9], tc[6], tc[7], tc[8]);
        sum_text = 'เท่ากับร้อยละ ' + sum_risk + ' จัดว่ามีความเสี่ยง';
        if (sum_risk < 3) {
            sum_text = sum_text + 'ต่ำมาก';
        } else if (sum_risk < 10) {
            sum_text = sum_text + 'ต่ำ';
        } else if (sum_risk > 25) {
            sum_text = sum_text + 'สูง';
        } else if (sum_risk > 30) {
            sum_text = 'มากกว่าร้อยละ 30 จัดว่ามีความเสี่ยงสูงมาก';
        } else {
            sum_text = sum_text + 'ปานกลาง';
        };
        $("#resu1").text(sum_text);
    } else if (scsy == 2) {
        //CHAD-VAS: age, sex, hfx, dm, htx, stroke, pad
        if ($("#old").val() != '') { tc[0] = parseInt($("#old").val()) };
        tc[1] = parseInt($("#gender").val());
        tc[2] = parseInt($("#hfx").val());
        tc[3] = parseInt($("#dm").val());
        tc[4] = parseInt($("#htx").val());
        tc[5] = parseInt($("#stroke").val());
        tc[6] = parseInt($("#pad").val());
        //FORMULAR
        sum_risk = CHADSVASC(tc[0], tc[1], tc[2], tc[3], tc[4], tc[5], tc[6]);
        sum_text = 'เท่ากับร้อยละ ' + sum_risk + ' จัดว่ามีความเสี่ยง';
        if (sum_risk < 2 && tc[1] == 0) {
            sum_text = sum_text + 'ต่ำ';
        } else if (sum_risk < 2 && tc[1] == 1) {
            sum_text = sum_text + 'ต่ำ';
        } else if (sum_risk >= 3) {            
            sum_text = sum_text + 'สูง';
        } else {
            sum_text = sum_text + 'ปานกลาง';
        };
        $("#resu2").text(sum_text);
    };
    
};
function FHAFRS(age, sex, sbp, ht, bmi, mur, hf, pri) {
    //FORMULAR
    var predicted_risk = 0;
    var coeff = new Array(1.994060, 0.150520, 0.019300, 0.006150, 0.424100, 0.070650, 3.795860, 9.428330, 0.000380, 0.000280, 0.042380, 0.123070);
    var betaXbar = 10.78552858;
    var St = 0.963370;
    var age2 = age * age;
    predicted_risk = (coeff[0] * sex) + (coeff[1] * age) + (coeff[2] * bmi) + (coeff[3] * sbp) + (coeff[4] * ht) + (coeff[5] * pri * 0.1) + (coeff[6] * mur) + (coeff[7] * hf) - (coeff[8] * age2) - (coeff[9] * age2 * sex) - (coeff[10] * age * mur) - (coeff[11] * age * hf);
    predicted_risk = 1 - Math.pow(St, Math.exp(predicted_risk - betaXbar));
    var risk = Math.floor(predicted_risk * 100, 0);
    return risk;
};
function CHADSVASC(age, sex, hf, dm, ht, stroke, pad) {
    //FORMULAR
    var predicted_risk = 0;
    var age2 = 0;
    if (age >= 65) { age2 = 1 };
    if (age >= 75) { age2 = 2 };
    predicted_risk = (age2 + sex + hf + dm + ht + stroke + pad);
    var risk = 0;
    if (predicted_risk == 0) {
        risk = 0;
    } else if (predicted_risk == 1) {
        risk = 1.3;
    } else if (predicted_risk == 2) {
        risk = 2.2;
    } else if (predicted_risk == 3) {
        risk = 3.2;
    } else if (predicted_risk == 4) {
        risk = 4.0;
    } else if (predicted_risk == 5) {
        risk = 6.7;
    } else if (predicted_risk == 6) {
        risk = 9.8;
    } else if (predicted_risk == 7) {
        risk = 9.6;
    } else if (predicted_risk == 8) {
        risk = 12.5;
    } else if (predicted_risk == 9) {
        risk = 15.2;
    };
    return risk;
};