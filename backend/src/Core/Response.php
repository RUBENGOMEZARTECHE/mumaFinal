<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Response — Standardized JSON response helpers.
 *
 * Success: { "data": ..., "meta": ... }
 * Error:   { "error": true, "message": "...", "details": ... }
 */
class Response
{
    /**
     * Send a JSON success response and exit.
     */
    public static function json(mixed $data, int $status = 200, array $meta = []): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        $payload = ['data' => $data];
        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send a paginated JSON response.
     */
    public static function paginated(array $items, int $total, int $page, int $perPage): never
    {
        self::json($items, 200, [
            'pagination' => [
                'total'    => $total,
                'page'     => $page,
                'per_page' => $perPage,
                'pages'    => (int) ceil($total / max($perPage, 1)),
            ],
        ]);
    }

    /**
     * Send a JSON error response and exit.
     */
    public static function error(string $message, int $status = 400, mixed $details = null): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        $payload = [
            'error'   => true,
            'message' => $message,
        ];
        if ($details !== null) {
            $payload['details'] = $details;
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send a 201 Created with data.
     */
    public static function created(mixed $data): never
    {
        self::json($data, 201);
    }

    /**
     * Send 204 No Content.
     */
    public static function noContent(): never
    {
        http_response_code(204);
        exit;
    }
}
