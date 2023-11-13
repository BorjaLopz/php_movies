<?php

// src/Controller/PostController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PostController extends AbstractController {
  // // #[Route('/api/prueba', name: 'api_prueba')]
  // #[Route('/api/json', name: 'api_json', methods: ['POST'], host: "localhost")]
  // // #[Route('/api/json/{id}', name: "your_route", methods: ["POST"])]


  // public function JSONViwer(Request $request): string {

  //   //Obtenemos los datos de la request
  //   $data = json_decode($request->getContent(), true);
  //   // $data = $request->getContent();

  //   echo($data);

  //   return "hello";
  // }

  //set the route, so [site URL]/hello will trigger this
    #[Route('/reverse', name: 'reverse_me')]
    public function reverse(): Response
    {
      //create a request object to get request data
      $request = Request::createFromGlobals();

      //create a new Response object
      $response = new Response();

      // make sure the reverse_this parameter exists and is a string
      if ($request->request->get("reverse_this") && is_string($request->request->get("reverse_this"))) {

        //reverse the string and add it to the response
        $response->setContent(strrev($request->request->get("reverse_this")));

        //make sure we send a 200 OK status
        $response->setStatusCode(Response::HTTP_OK);

      } else {

        //provide useful error message
        $response->setContent("The /reverse endpoint requires a POST with a 'reverse_this' parameter containing a text string.");

        //make sure we send an error status
        $response->setStatusCode(Response::HTTP_BAD_REQUEST);

      }

      // set the response content type to plain text
      $response->headers->set('Content-Type', 'text/plain');

      // send the response
      return $response->send();
    }
}
