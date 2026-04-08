<?php

declare(strict_types=1);

namespace App\Core;

use PDO;
use PDOException;

/**
 * Database — Singleton PDO connection to MySQL.
 *
 * Usage:
 *   $db = Database::getInstance();
 *   $stmt = $db->prepare('SELECT * FROM usuarios WHERE id = ?');
 */
class Database
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $config = $GLOBALS['config']['database'];

            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
                $config['host'],
                $config['port'],
                $config['name']
            );

            try {
                self::$instance = new PDO($dsn, $config['user'], $config['pass'], [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                die(json_encode([
                    'error'   => true,
                    'message' => 'Database connection failed: ' . $e->getMessage()
                ]));
            }
        }

        return self::$instance;
    }

    /**
     * Generate a UUID v4 string (32 hex chars, no dashes).
     */
    public static function uuid(): string
    {
        $bytes = random_bytes(16);
        // Set version 4 bits
        $bytes[6] = chr(ord($bytes[6]) & 0x0f | 0x40);
        // Set variant bits
        $bytes[8] = chr(ord($bytes[8]) & 0x3f | 0x80);
        return bin2hex($bytes);
    }

    private function __construct() {}
    private function __clone() {}
}
