<?php

$time_start = microtime(true);

// header( 'Content-type: text/json' );
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_PORT => "2000",
    CURLOPT_URL => "http://localhost:2000/journals/detail/" . $_GET['id'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "postman-token: 186cddb3-c1c5-8f98-af52-b7c5e213ffc8",
    ),
));

$response = curl_exec($curl);

curl_close($curl);

$result = json_decode($response);
// echo $response;

// $time_end = microtime(true);
// $time = number_format($time_end - $time_start, 4);
// echo "<hr>";
// echo "\nProcess time execution: $time seconds\n";

$journal = $result->journal;
// var_dump($journal);
?>
<div style="text-align: center; width: 100%">
    <img src="<?= $journal->image ?>">
    <p>[ISSN - <?= $journal->issn ?>]</p>
    <h1><?= $journal->title ?></h1>
    <p><?= $journal->author ?></p>
    <p><b>ABSTRACT</b></p>
    <p><?= $journal->abstract ?></p>
    <p>Keyword: <?= $journal->keywords ?></p>
    <p><a href="<?= $journal->file ?>">[DOWNLOAD]</a></p>
</div>