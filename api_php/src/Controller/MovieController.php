<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Movie;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class MovieController extends AbstractController
{
    #[Route('/api/addmovie', name: 'api_add_movie', methods: ["POST"])]
    public function addMovie(Request $req, EntityManagerInterface $entityManager): Response
    {

     // Obtener el contenido JSON de la solicitud
        $data = json_decode($req->getContent(), true);

        // dump($data);
        // error_log($data);

        // Crear una nueva instancia de la entidad Movie
        $movie = new Movie();
        $movie->setNombre($data['title']); // Ajusta según la estructura de tu entidad
        $movie->setRating($data['vote_average']); // Ajusta según la estructura de tu entidad
        $movie->setImagen($data['poster_path']); // Ajusta según la estructura de tu entidad


        // Realizar alguna lógica con los datos recibidos
        // Por ejemplo, podrías guardarlos en la base de datos o realizar alguna otra operación

        // Persistir la entidad en la base de datos
        $entityManager->persist($movie);
        $entityManager->flush();

        // Devolver una respuesta en formato JSON
        return new Response(json_encode(['message' => 'Datos recibidos correctamente']), 200, ['Content-Type' => 'application/json']);
    }
}