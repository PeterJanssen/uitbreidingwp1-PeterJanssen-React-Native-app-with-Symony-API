<?php


namespace App\Model;


interface AssetModel
{
    public function getAssetsByRoomId($roomId);
    public function getAssetIdByAssetName($name);
    public function updateAssetGeoLocation($id, $geoLat, $geoLng);
    public function updateAssetImage($id, $image);
    public function validateName($name);
}
