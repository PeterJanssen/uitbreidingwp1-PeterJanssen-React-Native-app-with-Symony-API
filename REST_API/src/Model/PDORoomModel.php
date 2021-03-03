<?php

namespace App\Model;

use InvalidArgumentException;

class PDORoomModel implements RoomModel
{
    private $connection;
    private $pdo;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        $this->pdo = $this->connection->getPDO();
    }

    public function createRoomFromRow($roomRow)
    {
        return [
            'id' => $roomRow['id'],
            'name' => $roomRow['name'],
            'happinessScore' => $roomRow['happinessScore']
        ];
    }

    public function getRooms()
    {
        $statement = $this->pdo->prepare('SELECT * from rooms;');
        $statement->execute();
        $rooms = [];

        while ($roomRow = $statement->fetch()) {
            $room = $this->createRoomFromRow($roomRow);
            array_push($rooms, $room);
        }

        return $rooms;
    }

    public function getRoomByName($name)
    {
        $this->validateName($name);
        $statement = $this->pdo->prepare('SELECT * from rooms WHERE name=:name;');
        $statement->bindParam(':name', $name, \PDO::PARAM_STR);
        $statement->execute();

        $roomRow = $statement->fetch();

        return $this->createRoomFromRow($roomRow);
    }

    public function updateHappinessScoreRoom($nameRoom, $happyOrNot)
    {
        $this->validateName($nameRoom);
        $this->validateHappyOrNotInput($happyOrNot);
        $happinessValue = $this->calculateHappinessValue($happyOrNot);

        $pdo = $this->connection->getPDO();
        $statement = $pdo->prepare('UPDATE rooms SET happinessScore = happinessScore + :happyOrNotValue WHERE name=:name;');
        $statement->bindParam(':happyOrNotValue', $happinessValue, \PDO::PARAM_INT);
        $statement->bindParam(':name', $nameRoom, \PDO::PARAM_STR);
        $statement->execute();

        return $this->getRoomByName($nameRoom);
    }

    public function getHappinessScoreRoom($nameRoom)
    {
        $this->validateName($nameRoom);
        $pdo = $this->connection->getPDO();
        $statement = $pdo->prepare('SELECT happinessScore from rooms WHERE name=:name');
        $statement->bindParam(':name', $nameRoom, \PDO::PARAM_STR);
        $statement->execute();
        $statement->bindColumn(1, $happinessScore, \PDO::PARAM_INT);
        $happinessScoreRoom = null;
        if ($statement->fetch(\PDO::FETCH_BOUND)) {
            $happinessScoreRoom = ['happinessScore' => $happinessScore];
        }
        return $happinessScoreRoom;
    }

    private function calculateHappinessValue($happyOrNot)
    {
        switch ($happyOrNot) {
            case 'happy':
                return 2;
                break;
            case 'somewhatHappy':
                return 1;
                break;
            case 'somewhatUnhappy':
                return -1;
                break;
            case 'unhappy':
                return -2;
                break;
            default:
                throw new InvalidArgumentException("You gave an invalid happinessScore.");
        }
    }

    public function getRoomsWithHappinessScoreLessThan($score)
    {
        $this->validateLowerThanHappinessScore($score);
        $pdo = $this->connection->getPDO();
        $statement = $pdo->prepare('SELECT * from rooms WHERE happinessScore<:score');
        $statement->bindParam(':score', $score, \PDO::PARAM_INT);
        $statement->execute();

        $rooms = [];

        while ($roomRow = $statement->fetch()) {
            array_push($rooms, $this->createRoomFromRow($roomRow));
        }

        return $rooms;
    }

    private function validateName($nameRoom)
    {
        if ($nameRoom === null) {
            throw new InvalidArgumentException("The name of the room can't be null");
        }
        if (strlen($nameRoom) > 45) {
            throw new InvalidArgumentException("The name of the room can't be that long");
        }
        if (empty($nameRoom)) {
            throw new InvalidArgumentException("The name of the room can't be empty");
        }
        if (!is_string($nameRoom)) {
            throw new InvalidArgumentException("The name of the room must be of type string");
        }
    }

    private function validateHappyOrNotInput($happyOrNot)
    {
        if ($happyOrNot === null) {
            throw new InvalidArgumentException("The happyOrNot value can't be null");
        }
        if (!is_string($happyOrNot)) {
            throw new InvalidArgumentException("The happyOrNot value must be of type string");
        }
        if (empty($happyOrNot)) {
            throw new InvalidArgumentException("The happyOrNot value can't be empty");
        }
    }

    private function validateLowerThanHappinessScore($lowerThanHappinessScore)
    {
        if ($lowerThanHappinessScore === null) {
            throw new InvalidArgumentException("The value of the LowerThanHappinessScore can't be null");
        }
        if (!is_int($lowerThanHappinessScore)) {
            throw new InvalidArgumentException("The value of the LowerThanHappinessScore must be of type int");
        }
    }
}
