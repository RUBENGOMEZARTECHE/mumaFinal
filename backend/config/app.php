<?php

declare(strict_types=1);

/**
 * MUMA Bat Monitoring — Application Configuration
 *
 * Reads from .env file and provides typed access to config values.
 */

$envPath = dirname(__DIR__) . '/.env';
if (!file_exists($envPath)) {
    http_response_code(500);
    die(json_encode([
        'error'   => true,
        'message' => 'Missing .env file. Copy .env.example to .env and configure it.'
    ]));
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || str_starts_with($line, '#')) {
        continue;
    }
    $pos = strpos($line, '=');
    if ($pos === false) {
        continue;
    }
    $key   = trim(substr($line, 0, $pos));
    $value = trim(substr($line, $pos + 1));
    if (preg_match('/^(["\'])(.*)\1$/', $value, $m)) {
        $value = $m[2];
    }
    $_ENV[$key] = $value;
    putenv("$key=$value");
}

function env(string $key, mixed $default = null): mixed
{
    return $_ENV[$key] ?? getenv($key) ?: $default;
}

return [
    'app' => [
        'env'      => env('APP_ENV', 'production'),
        'debug'    => env('APP_DEBUG', 'false') === 'true',
        'url'      => env('APP_URL', 'http://localhost:8000'),
        'timezone' => env('APP_TIMEZONE', 'Europe/Madrid'),
    ],
    'database' => [
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => (int) env('DB_PORT', '3306'),
        'name' => env('DB_NAME', 'muma_bat'),
        'user' => env('DB_USER', 'root'),
        'pass' => env('DB_PASS', ''),
    ],
    'jwt' => [
        'secret'      => env('JWT_SECRET', ''),
        'access_ttl'  => (int) env('JWT_ACCESS_TTL', '3600'),
        'refresh_ttl' => (int) env('JWT_REFRESH_TTL', '2592000'),
    ],
    'storage' => [
        'path'            => env('STORAGE_PATH', 'storage/evidencias'),
        'max_upload_size' => (int) env('MAX_UPLOAD_SIZE', '10485760'),
    ],
    'cors' => [
        'origin' => env('CORS_ORIGIN', '*'),
    ],
];
