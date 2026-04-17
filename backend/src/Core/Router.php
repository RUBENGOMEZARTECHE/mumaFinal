<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Router — Simple regex-based HTTP router.
 *
 * Supports path parameters like /api/refugios/{id}.
 * Routes are matched in registration order.
 *
 * Usage:
 *   $router = new Router();
 *   $router->post('/api/auth/login', [AuthController::class, 'login']);
 *   $router->get('/api/refugios/{id}', [RefugioController::class, 'show'], ['auth']);
 *   $router->dispatch($request);
 */
class Router
{
    private array $routes = [];

    /**
     * Register a route.
     *
     * @param string   $method     HTTP method (GET, POST, PUT, DELETE, PATCH)
     * @param string   $path       Route pattern, e.g. /api/refugios/{id}
     * @param callable|array $handler  [ControllerClass, 'method'] or callable
     * @param array    $middleware  List of middleware tags: 'auth', 'role:admin', etc.
     */
    public function add(string $method, string $path, callable|array $handler, array $middleware = []): void
    {
        // Convert {param} to named regex groups
        $pattern = preg_replace('/\{([a-zA-Z_]+)\}/', '(?P<$1>[a-zA-Z0-9_-]+)', $path);
        $pattern = '#^' . $pattern . '$#';

        $this->routes[] = [
            'method'     => strtoupper($method),
            'pattern'    => $pattern,
            'handler'    => $handler,
            'middleware'  => $middleware,
        ];
    }

    public function get(string $path, callable|array $handler, array $middleware = []): void
    {
        $this->add('GET', $path, $handler, $middleware);
    }

    public function post(string $path, callable|array $handler, array $middleware = []): void
    {
        $this->add('POST', $path, $handler, $middleware);
    }

    public function put(string $path, callable|array $handler, array $middleware = []): void
    {
        $this->add('PUT', $path, $handler, $middleware);
    }

    public function patch(string $path, callable|array $handler, array $middleware = []): void
    {
        $this->add('PATCH', $path, $handler, $middleware);
    }

    public function delete(string $path, callable|array $handler, array $middleware = []): void
    {
        $this->add('DELETE', $path, $handler, $middleware);
    }

    /**
     * Match and dispatch the request.
     */
    public function dispatch(Request $request): void
    {
        $method = $request->method();
        $path   = $request->path();

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            if (!preg_match($route['pattern'], $path, $matches)) {
                continue;
            }

            // Extract named params only
            $params = array_filter($matches, fn($k) => is_string($k), ARRAY_FILTER_USE_KEY);

            // Run middleware
            $this->runMiddleware($route['middleware'], $request);

            // Call handler
            $handler = $route['handler'];
            if (is_array($handler)) {
                $controller = new $handler[0]();
                $controller->{$handler[1]}($request, $params);
            } else {
                $handler($request, $params);
            }
            return;
        }

        // No route matched
        Response::error('Route not found', 404);
    }

    /**
     * Process middleware stack before handler.
     */
    private function runMiddleware(array $middleware, Request $request): void
    {
        foreach ($middleware as $mw) {
            if ($mw === 'auth') {
                Middleware::authenticate($request);
            } elseif (str_starts_with($mw, 'role:')) {
                $role = substr($mw, 5);
                // authenticate first if not done yet
                if ($request->user === null) {
                    Middleware::authenticate($request);
                }
                Middleware::requireRole($request, $role);
            }
        }
    }
}
