<?php

namespace App\Controller;

use App\Model\AssetModel;
use InvalidArgumentException;
use PDOException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AssetsController extends AbstractController
{
    private $assetModel;

    public function __construct(AssetModel $assetModel)
    {
        $this->assetModel = $assetModel;
    }

    /**
     * @Route("/assets/", methods={"GET"}, name="GetAssetsForRoomId")
     * @param Request $request
     * @return JsonResponse
     */
    public function getAssetsForRoomId(Request $request)
    {
        $roomId = (int)$request->query->get('roomId');

        $statuscode = 200;

        try {
            $assets = $this->assetModel->getAssetsByRoomId($roomId);
            if (!$assets) {
                $statuscode = 404;
            }
        } catch (InvalidArgumentException $exception) {
            $statuscode = 400;
            return new JsonResponse($exception->getMessage(), $statuscode);
        } catch (PDOException $exception) {
            $statuscode = 500;
            return new JsonResponse($exception->getMessage(), $statuscode);
        }
        return new JsonResponse($assets, $statuscode);
    }

    /**
     * @Route("/assets/{id}/", methods={"PATCH", "OPTIONS"}, name="updateAsset")
     * @param $id
     * @param $request
     * @return JsonResponse
     */
    public function updateAsset($id, Request $request)
    {
        $statuscode = 200;

        try {
            $geoLat = $request->query->get("geoLat");
            $geoLng = $request->query->get("geoLng");
            if ($geoLat && $geoLng) {
                $this->assetModel->updateAssetGeoLocation($id, $geoLat, $geoLng);
            } else {
                $image = $request->getContent();
                $this->assetModel->updateAssetImage($id, $image);
            }
        } catch (InvalidArgumentException $exception) {
            $statuscode = 400;
            return new JsonResponse($exception->getMessage(), $statuscode);
        } catch (PDOException $exception) {
            $statuscode = 500;
            return new JsonResponse($exception->getMessage(), $statuscode);
        }

        return new JsonResponse(null, $statuscode);
    }
}
