const sendButton = document.getElementById("submit_request")
sendButton.onclick = validateForm;
function validateForm() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var r = document.getElementById("r").value;
    var xValid = parseFloat(x) >= -4 && parseFloat(x) <= 4;
    var yValid = parseFloat(y) >= -3 && parseFloat(y) <= 5;
    var rValid = parseFloat(r) >= 2 && parseFloat(r) <= 5;

    if (!xValid) {
        document.getElementById("xError").classList.add("error");
    } else {
        document.getElementById("xError").classList.remove("error");
    }

    if (!yValid) {
        document.getElementById("yError").classList.add("error");
    } else {
        document.getElementById("yError").classList.remove("error");
    }

    if (!rValid) {
        document.getElementById("rError").classList.add("error");
    } else {
        document.getElementById("rError").classList.remove("error");
    }

    if (xValid && yValid && rValid) {
        sendRequest(x, y, r);
    }
    return false; // Отменяет отправку формы
}

function sendRequest(x, y, r) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "check.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            document.getElementById("results").innerHTML = response;
        }
    };

    var params = "x=" + x + "&y=" + y + "&r=" + r;
    xhr.send(params);
}

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}