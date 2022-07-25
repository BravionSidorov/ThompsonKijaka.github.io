const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function addSubject(originTable, id) {
    return originTable + `
    <tr class="rows" id="sub-${id}">
    <td>
        <input name="subject" class="typing in-tab" type="text" value="" placeholder="Nhập Tên Môn Học">
    </td>
    <td>
        <input name="TC" class="typing in-tab" type="text" value=""
            placeholder="Nhập Số Tín Chỉ"
            onblur="checkingTC(this, Number(this.value))" maxlength="1">
    </td>
    <td>
        <input name="ten-grade" class="typing in-tab" id="sub-${id}" type="text" value=""
            onblur="checkingGrade(this, Number(this.value)); findLetter(Number(this.value), 'sub-${id}')"
            placeholder="Nhập điểm: 0 - 10.0" maxlength="4">
    </td>
    <td>
        <input name="letter-grade" type="text" class="in-tab" id="sub-${id}" placeholder="F - A+" readonly>
    </td>
    <td>
        <input name="del-btn" type="text" class="in-tab" id="sub-${id}" value="Delete"
        onclick="deleteSub(this)" readonly>
    </td>
    </tr>
    `
}
(function () {
    let plentyOfSubs = prompt("How many subject do you want to calculate?");
    console.log(plentyOfSubs);
    if (isNaN(Number(plentyOfSubs)) || !plentyOfSubs) $('body').innerHTML = '<h1>Reload Page To Continue!</h1>';
    else {
        let subVar = plentyOfSubs;
        let html = $('table#big-tab tbody');
        while (subVar > 0) {
            html.innerHTML = addSubject(html.innerHTML, plentyOfSubs - subVar);
            subVar--;
        }
    }
})();


function checkingTC(element, TC) {
    if (isNaN(TC) || !(1 <= TC && TC <= 4)) {
        alert('Please Type Again!');
        element.value = null;
    } else return true;
}
function checkingGrade(element, grade) {
    if (isNaN(grade) || !(0 <= grade && grade <= 10)) {
        alert('Please Type Again!');
        element.value = null;
    } else return true;
}

function deleteSub(element) {
    $('tr#' + element.id).remove();
}
function findLetterGrade(letter) {
    switch (letter) {
        case 'A+':
            return 4;
            break;
        case 'A':
            return 3.7;
            break;
        case 'B+':
            return 3.5;
            break;
        case 'B':
            return 3;
            break;
        case 'C+':
            return 2.5;
            break;
        case 'C':
            return 2;
            break;
        case 'D+':
            return 1.5;
            break;
        case 'D':
            return 1;
            break;
        default:
            return 0;
    }
}

function findLetter(grade, id) {
    let letter;
    if (10 >= grade && grade >= 9) letter = 'A+';
    else if (8.9 >= grade && grade >= 8.5) letter = 'A';
    else if (8.4 >= grade && grade >= 8) letter = 'B+';
    else if (7.9 >= grade && grade >= 7) letter = 'B';
    else if (6.9 >= grade && grade >= 6.5) letter = 'C+';
    else if (6.4 >= grade && grade >= 5.5) letter = 'C';
    else if (5.4 >= grade && grade >= 5) letter = 'D+';
    else if (4.9 >= grade && grade >= 4) letter = 'D';
    else letter = 'F';
    $('input[name="letter-grade"]#' + id).value = letter;
}

function calcGrade(grades, courseCre, letters) {
    let grade10 = 0, grade4 = 0, totalCre = 0;
    for (let index in grades) {
        grade10 += grades[index] * courseCre[index];
        grade4 += courseCre[index] * findLetterGrade(letters[index]);
        totalCre += courseCre[index];
    }
    return {
        average10: grade10 / totalCre,
        average4: grade4 / totalCre,
        grade10,
        grade4,
        totalCre
    }
}

$('input[name="calc"]').onclick = function () {
    let grades = [...$$('tr.rows input[name="ten-grade"]')].map((element) => Number(element.value));
    let courseCre = [...$$('tr.rows input[name="TC"]')].map((element) => Number(element.value));
    let letters = [...$$('tr.rows input[name="letter-grade"]')].map((element) => element.value);

    let result = calcGrade(grades, courseCre, letters);
    $('input#ten-res').value = result.average10.toFixed(2);
    $('input#four-res').value = result.average4.toFixed(2);
}