<?php

if ( isset($_POST['submit']) )
{
    $time_start = microtime(true);

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_PORT => "2000",
        CURLOPT_URL => "http://localhost:2000/journals/add",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($_POST['journal']),
        CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "content-type: application/x-www-form-urlencoded",
        ),
    ));
    $response = curl_exec($curl);

    curl_close($curl);

    echo $response;

    // $end = strtotime("now");
    // $output = $start - $end / 1000;
    $time_end = microtime(true);
    $time = number_format($time_end - $time_start, 4);
    echo "<hr>";
    echo "\nProcess time execution: $time seconds\n";    
}
?>
<h2>Input journal (PHP)</h2>
<form action="" method="post">
    <table>
        <tr>
            <th>Title</th>
            <td><input type="text" name="journal[title]"></td>
        </tr>
        <tr>
            <th>Author</th>
            <td><input type="text" name="journal[author]"></td>
        </tr>
        <tr>
            <th>Abstract</th>
            <td><textarea name="journal[abstract]"></textarea></td>
        </tr>
        <tr>
            <th>Keywords</th>
            <td><input type="text" name="journal[keywords]"></td>
        </tr>
        <tr>
            <th>Image (URL)</th>
            <td><input type="text" name="journal[image]"></td>
        </tr>
        <tr>
            <th>File (URL)</th>
            <td><input type="text" name="journal[file]"></td>
        </tr>
        <tr>
            <th>ISSN</th>
            <td><input type="text" name="journal[issn]"></td>
        </tr>
        <tr>
            <th>Publisher</th>
            <td><input type="text" name="journal[publisher]"></td>
        </tr>
        <tr>
            <th>Volume</th>
            <td><input type="number" name="journal[volume]"></td>
        </tr>
        <tr>
            <th>Page</th>
            <td><input type="text" name="journal[page]"></td>
        </tr>
        <tr>
            <th>Number</th>
            <td><input type="number" name="journal[number]"></td>
        </tr>
        <tr>
            <th>Year</th>
            <td><input type="number" name="journal[year]"></td>
        </tr>
        <tr>
            <th>Month (1-12)</th>
            <td><input type="number" name="journal[month]"></td>
        </tr>
        <tr>
            <th>Day (1-31)</th>
            <td><input type="number" name="journal[day]"></td>
        </tr>
        <tr><td  rowspan="2"><input type="submit" value="Save" name="submit"></td></tr>
    </table>
</form>