<?php

declare(strict_types=1);

/**
 * MUMA Bat Monitoring — Front Controller
 *
 * Every HTTP request enters here. The router dispatches it to the
 * appropriate controller method based on URI and HTTP method.
 *
 * Usage (PHP built-in server for development):
 *   cd backend/public
 *   php -S localhost:8000 index.php
 */

// ------------------------------------------------------------------
// 1. Autoload
// ------------------------------------------------------------------
$autoload = dirname(__DIR__) . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    die(json_encode([
        'error'   => true,
        'message' => 'Ejecuta "composer install" en la carpeta backend/ primero.'
    ]));
}
require $autoload;

// ------------------------------------------------------------------
// 2. Load configuration (.env -> config array)
// ------------------------------------------------------------------
$GLOBALS['config'] = require dirname(__DIR__) . '/config/app.php';

// Timezone
date_default_timezone_set($GLOBALS['config']['app']['timezone']);

// ------------------------------------------------------------------
// 3. CORS headers (before any output)
// ------------------------------------------------------------------
$origin = $GLOBALS['config']['cors']['origin'];
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// Preflight request — return 204 immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ------------------------------------------------------------------
// 4. Error handling
// ------------------------------------------------------------------
set_exception_handler(function (Throwable $e) {
    $debug = $GLOBALS['config']['app']['debug'] ?? false;
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error'   => true,
        'message' => $debug ? $e->getMessage() : 'Error interno del servidor',
        'trace'   => $debug ? $e->getTraceAsString() : null,
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

set_error_handler(function (int $severity, string $message, string $file, int $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// ------------------------------------------------------------------
// 5. Build request and router
// ------------------------------------------------------------------
use App\Core\Request;
use App\Core\Response;
use App\Core\Router;
use App\Controllers\AuthController;

$request = new Request();
$router  = new Router();

// ------------------------------------------------------------------
// 6. Register routes
// ------------------------------------------------------------------

// Health check (public)
$router->get('/api/health', function (Request $req, array $params) {
    Response::json([
        'status'  => 'ok',
        'version' => '1.0.0',
        'time'    => date('c'),
    ]);
});

// Auth (public)
$router->post('/api/auth/login',   [AuthController::class, 'login']);
$router->post('/api/auth/refresh', [AuthController::class, 'refresh']);
$router->post('/api/auth/logout',  [AuthController::class, 'logout']);

// Protected: user profile (any authenticated user)
$router->get('/api/auth/me', function (Request $req, array $params) {
    Response::json($req->user);
}, ['auth']);

// ------------------------------------------------------------------
// Future route groups (uncomment as controllers are built):
//
// // Refugios
// $router->get('/api/refugios',          [RefugioController::class, 'index'],  ['auth']);
// $router->get('/api/refugios/{id}',     [RefugioController::class, 'show'],   ['auth']);
// $router->post('/api/refugios',         [RefugioController::class, 'store'],  ['auth', 'role:admin']);
// $router->put('/api/refugios/{id}',     [RefugioController::class, 'update'], ['auth', 'role:admin']);
//
// // Revisiones
// $router->get('/api/revisiones',        [RevisionController::class, 'index'],  ['auth']);
// $router->get('/api/revisiones/{id}',   [RevisionController::class, 'show'],   ['auth']);
// $router->post('/api/revisiones',       [RevisionController::class, 'store'],  ['auth', 'role:cientifico']);
// $router->put('/api/revisiones/{id}',   [RevisionController::class, 'update'], ['auth', 'role:cientifico']);
//
// // Validacion cientifica
// $router->post('/api/revisiones/{id}/validar', [ValidacionController::class, 'validar'], ['auth', 'role:revisor']);
//
// // Evidencias (upload)
// $router->post('/api/revisiones/{id}/evidencias', [EvidenciaController::class, 'upload'], ['auth', 'role:cientifico']);
// $router->get('/api/evidencias/{id}/download',    [EvidenciaController::class, 'download'], ['auth']);
//
// // Dashboard / Stats
// $router->get('/api/dashboard/stats',   [DashboardController::class, 'stats'], ['auth', 'role:admin']);
// $router->get('/api/mapa/refugios',     [MapaController::class, 'refugios'],   ['auth']);
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// 7. Dispatch
// ------------------------------------------------------------------
$router->dispatch($request);
