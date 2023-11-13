<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', "https://api.themoviedb.org/3/search/movie?query={$name}&include_adult=false&language=es-ES&page=1", [
  'headers' => [
    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg3MzlmYzQ3NDRlODk2MjNkMWJkMDRhMzdkMTdkNSIsInN1YiI6IjY1MjUyNzZhNjI5YjJjMDBlMjY0ZWZhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TqMxuU1_tkE-tfODYg6z_dJ5ugubXI0UnqejoBX4VDo',
    'accept' => 'application/json',
  ],
]);

echo $response->getBody();