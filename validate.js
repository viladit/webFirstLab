document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById("submit_request");
    sendButton.onclick = validate;
    let selectedX;

    form.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('buttonX')) {
            selectedX = event.target.value;
            console.log('Нажата кнопка со значением:', selectedX);
        }

    });
    document.getElementById("insertHere").innerHTML = localStorage.getItem("data");
    function validate() {
        const xVal = selectedX;
        const yVal = document.forms['form']['y'].value.replace(/,/, '.');
        const rVal = document.querySelector('input[name="r"]:checked').value;

        console.log("Выбранное значение X:", xVal);
        console.log("Введенное значение Y:", yVal);
        console.log("Выбранное значение R:", rVal);

        if (isEmpty(xVal)) {
            alert('Select X');
            return;
        }

        if (isEmpty(yVal) || isEmpty(rVal)) {
            alert('Введите значения для Y и R!');
            return;
        }


        if (isNaN(yVal) || yVal < -3 || yVal > 5) {
            alert('Y должен быть в диапазоне (-3; 5)');
            return;
        }
        if (!/^-?\d+(\.\d+)?$/.test(yVal)) {
            alert('Некорректное значение Y!');
            return;
        }

        send(xVal, yVal, rVal);
    }
});


function send(x, y, r) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "check.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const tbody = document.getElementById("table");
            const newRow = tbody.insertRow();
            console.log(xhr.responseText);
            newRow.innerHTML = xhr.responseText;
            if (localStorage.getItem("data") == null) {
                localStorage.setItem("data", xhr.responseText);
            } else {
                localStorage.setItem("data", localStorage.getItem("data")+xhr.responseText);
            }

        }
    };
    xhr.send(`x=${x}&y=${y}&r=${r}`);
}
const clearButton = document.getElementById("clear_table");
clearButton.onclick = clearTable;

function clearTable() {
    localStorage.setItem("data", "");
    document.getElementById("insertHere").innerHTML = "";
}

function isEmpty(obj) {
    return obj === null || obj === '';
}