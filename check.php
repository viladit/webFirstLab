<?php
session_start();

function validate($x, $y, $r): bool {
    return is_numeric($x) && is_numeric($y) && is_numeric($r) &&
        in_array($x, array(-4, -3, -2, -1, 0, 1, 2, 3, 4)) &&
        $y >= -3 && $y <= 5 &&
        in_array($r, array(1, 2, 3, 4, 5));
}

function is_hit($x, $y, $r): bool {
    return ($x <= 0 && $y <= 0 && ($x * $x + $y * $y) <= ($r / 2 * $r / 2)) || //left bot
        ($x >= 0 && $y >= 0 && $y <= $r && $x <= $r) || //right top
        ($x >= 0 && $x <= ($r/2) && $y <= 0 && $y >= ($r / 2) && (2 * $x + 2 * $y <= $r/2));
}

if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['r'])) {
    $x = floatval($_POST['x']);
    $y = floatval($_POST['y']);
    $r = floatval($_POST['r']);

    if (validate($x, $y, $r)) {
        date_default_timezone_set('Europe/Moscow');
        $exc_time = microtime(true);
        $cur_time = date("H:i:s");

        if (is_hit($x, $y, $r)) {
            $is_hit = "success";
        } else {
            $is_hit = "fail";
        }

        $exc_time = round((microtime(true) - $exc_time) * 1e6, 2) . " ms";
        $res_arr = array($x, $y, $r, $cur_time, $exc_time, $is_hit);

        if (!isset($_SESSION['table'])) {
            $_SESSION['table'] = array();
        }

        $_SESSION['table'][] = $res_arr;

        echo "<tr>
            <td>$x</td>
            <td>$y</td>
            <td>$r</td>
            <td>$cur_time</td>
            <td>$exc_time</td>
            <td>$is_hit</td>
        </tr>";
    }
}

?>
