<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Movie;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

class MovieController extends AbstractController
{
    #[Route('/api/addmovie', name: 'api_add_movie', methods: ["POST"])]
    public function addMovie(Request $req, EntityManagerInterface $entityManager): Response {
      try {

        // Obtener el contenido JSON de la solicitud
        $data = json_decode($req->getContent(), true);
        
        // Comprobamos que solo exista una pelicula con un id_TMDB
        $peliculaExistente = $entityManager->getRepository(Movie::class)->findOneBy(['id_TMDB' => $data['id']]);
        
      if($peliculaExistente){
        throw new Exception('La película ya está en la base de datos');
      }

      // Crear una nueva instancia de la entidad Movie
      $movie = new Movie();
      $movie->setNombre($data['title']);
      $movie->setRating($data['vote_average']);
      $movie->setImagen($data['poster_path']);
      $movie->setIdTMDB($data['id']);
      
      
      // Persistir la entidad en la base de datos
      $entityManager->persist($movie);
      $entityManager->flush();

      // Devolver una respuesta en formato JSON
      return $this->json(['message' => 'Datos recibidos correctamente']);
    }catch(Exception $e) {
      return new JsonResponse(['error' => $e->getMessage()], 500);
    }
    }

    #[Route('api/getmovies', name: "get_movies")]
    public function getMovies(EntityManagerInterface $entityManager) : JsonResponse{
        $repository = $entityManager->getRepository(Movie::class);
        $movies = $repository->findAll();

        // Transforma las entidades en un array asociativo antes de devolverlas como JSON
        $moviesArray = [];
        foreach ($movies as $movie) {
            $moviesArray[] = [
                'id' => $movie->getId(),
                'title' => $movie->getNombre(),
                'rating' => $movie->getRating(),
                'imagen' => $movie->getImagen(),
            ];
        }

        return $this->json($moviesArray);
    }

    #[Route('api/deletemovie/{id}', name: "delete_movie", methods: ["DELETE"])]
    public function deleteMovie(int $id, EntityManagerInterface $entityManager): JsonResponse {

      $movie = $entityManager->getRepository(Movie::class)->find($id);

      if(!$movie) {
        return $this->json(['error' => 'Pelicula no encontrada'], 404);
      }

      $entityManager->remove($movie);
      $entityManager->flush();

      return $this->json(['message' => "Pelicula eliminada correctamente"]);
    }

}