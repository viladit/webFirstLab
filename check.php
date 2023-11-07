<?php
session_start();

if (isset($_POST['check'])) {
    function validate($x, $y, $r) {
        return is_numeric($x) && is_numeric($y) && is_numeric($r) && in_array($x, array(-4, -3, -2, -1, 0.0, 1, 2, 3, 4)) && $y > -3 && $y < 5 && in_array($r, array(-5, -4, -3, -2, -1, 0.0, 1, 2, 3));
    }

    function is_hit($x, $y, $r) {
        if (($x >= 0 && $y >= 0 && ($x * $x + $y * $y) <= ($r / 2 * $r / 2)) ||
            ($x <= 0 && $y <= 0 && abs($y) <= ($r / 2) && abs($x) <= $r) ||
            ($x >= 0 && $x <= $r && $y <= 0 && $y >= ($r / 2) && ($x * $x + $y * $y) <= ((5 / 4) * $r * $r))) {
            return "success";
        } else {
            return "fail";
        }
    }

    $x = isset($_POST["x"]) ? floatval($_POST["x"]) : null;
    $y = isset($_POST["y"]) ? floatval($_POST["y"]) : null;
    $r = isset($_POST["r"]) ? floatval($_POST["r"]) : null;

    if (validate($x, $y, $r)) {
        $cur_time = date("H:i:s");
        $exc_time = round((microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) * 1e6, 2) . " ms";
        $is_hit = is_hit($x, $y, $r);

        $res_arr = array($x, $y, $r, $cur_time, $exc_time, $is_hit);
        if (!isset($_SESSION['table'])) {
            $_SESSION['table'] = array();
        }
        $_SESSION['table'][] = $res_arr;
    }
} else if (isset($_POST['clear'])) {
    $_SESSION['table'] = array();
}
?>
