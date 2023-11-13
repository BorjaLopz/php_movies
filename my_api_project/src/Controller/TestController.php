<?php

// src/Controller/TestController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Movie;

class TestController extends AbstractController
{
    #[Route('/api/test', name: 'api_test')]
    /**
     * @Route("/test", name="test")
     */
    public function test(EntityManagerInterface $entityManager): JsonResponse
    {
        // $query = $entityManager->createQuery('SELECT m FROM App\Entity\Movie m');
        // $movies = $query->getResult();

        // return $this->render('test/index.html.twig', [
        //     'movies' => $movies,
        // ]);

        $repository = $entityManager->getRepository(Movie::class);
        $movies = $repository->findAll();

        // Transforma las entidades en un array asociativo antes de devolverlas como JSON
        $moviesArray = [];
        foreach ($movies as $movie) {
            $moviesArray[] = [
                'id' => $movie->getId(),
                'title' => $movie->getTitle(),
                // Añade más propiedades según tu entidad 
            ];
        }

        return $this->json($moviesArray);
    }
}
