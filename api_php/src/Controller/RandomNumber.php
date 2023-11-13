<?php

// src/Controller/RandomNumber.php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RandomNumber {
  #[Route("/lucky/number")]
  public function number() : Response {
    $number = random_int(0,100);

    return new Response(
      '<html><body>'.'<h1>Number: '.$number.'</h1></body></html>'
    );
    
  }
}
