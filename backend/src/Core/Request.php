<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Request — Parses the incoming HTTP request.
 *
 * Provides typed access to method, URI, headers, query params, body (JSON),
 * and uploaded files.
 */
class Request
{
    private string $method;
    private string $uri;
    private string $path;
    private array  $query;
    private array  $headers;
    private array  $body;
    private array  $files;

    /** Injected by Middleware after JWT verification */
    public ?array $user = null;

    public function __construct()
    {
        $this->method  = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
        $this->uri     = $_SERVER['REQUEST_URI'] ?? '/';
        $this->query   = $_GET;
        $this->files   = $_FILES;

        // Parse path without query string
        $parsed     = parse_url($this->uri);
        $this->path = rtrim($parsed['path'] ?? '/', '/') ?: '/';

        // Parse headers
        $this->headers = [];
        foreach ($_SERVER as $key => $value) {
            if (str_starts_with($key, 'HTTP_')) {
                $header = str_replace('_', '-', strtolower(substr($key, 5)));
                $this->headers[$header] = $value;
            }
        }
        // Content-Type and Content-Length are not prefixed with HTTP_
        if (isset($_SERVER['CONTENT_TYPE'])) {
            $this->headers['content-type'] = $_SERVER['CONTENT_TYPE'];
        }

        // Parse JSON body
        $this->body = [];
        $raw = file_get_contents('php://input');
        if ($raw !== false && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $this->body = $decoded;
            }
        }
    }

    public function method(): string { return $this->method; }
    public function path(): string   { return $this->path; }
    public function uri(): string    { return $this->uri; }

    public function header(string $key, ?string $default = null): ?string
    {
        return $this->headers[strtolower($key)] ?? $default;
    }

    /**
     * Get a value from the JSON body.
     */
    public function input(string $key, mixed $default = null): mixed
    {
        return $this->body[$key] ?? $default;
    }

    /**
     * Get all body data.
     */
    public function all(): array
    {
        return $this->body;
    }

    /**
     * Get only specified keys from body.
     */
    public function only(array $keys): array
    {
        return array_intersect_key($this->body, array_flip($keys));
    }

    /**
     * Get query parameter.
     */
    public function query(string $key, mixed $default = null): mixed
    {
        return $this->query[$key] ?? $default;
    }

    /**
     * Get the Bearer token from Authorization header.
     */
    public function bearerToken(): ?string
    {
        $auth = $this->header('authorization');
        if ($auth !== null && str_starts_with($auth, 'Bearer ')) {
            return substr($auth, 7);
        }
        return null;
    }

    /**
     * Get uploaded files.
     */
    public function files(): array
    {
        return $this->files;
    }

    public function file(string $key): ?array
    {
        return $this->files[$key] ?? null;
    }
}
