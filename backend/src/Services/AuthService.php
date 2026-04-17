<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\Database;
use App\Core\Response;
use App\Helpers\JWT;
use App\Models\Usuario;

/**
 * AuthService — Business logic for authentication.
 *
 * Handles login, token refresh, and logout.
 * Separated from controller to keep controllers thin.
 */
class AuthService
{
    private Usuario $usuario;

    public function __construct()
    {
        $this->usuario = new Usuario();
    }

    /**
     * Authenticate user by email/password.
     *
     * @return array{access_token: string, refresh_token: string, user: array}
     */
    public function login(string $email, string $password): array
    {
        $user = $this->usuario->findByEmail($email);

        if ($user === null) {
            Response::error('Credenciales incorrectas', 401);
        }

        if (!$user['activo']) {
            Response::error('Usuario desactivado. Contacta con el administrador.', 403);
        }

        if (!password_verify($password, $user['password_hash'])) {
            Response::error('Credenciales incorrectas', 401);
        }

        // Get roles
        $roles = $this->usuario->getRoles($user['id']);

        // Generate tokens
        $accessToken  = JWT::encode($user['id'], [
            'email' => $user['email'],
            'roles' => $roles,
        ]);
        $refreshToken = JWT::generateRefreshToken();

        // Store refresh token (hashed) in DB
        $config = $GLOBALS['config']['jwt'];
        $this->usuario->storeRefreshToken($user['id'], $refreshToken, $config['refresh_ttl']);

        return [
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type'    => 'Bearer',
            'expires_in'    => $config['access_ttl'],
            'user' => [
                'id'        => $user['id'],
                'email'     => $user['email'],
                'nombre'    => $user['nombre'],
                'apellidos' => $user['apellidos'],
                'roles'     => $roles,
            ],
        ];
    }

    /**
     * Issue a new access token using a valid refresh token.
     *
     * The refresh token itself is NOT rotated (to support multiple devices).
     * If rotation is needed in the future, revoke old + issue new here.
     */
    public function refresh(string $refreshToken): array
    {
        $record = $this->usuario->findRefreshToken($refreshToken);

        if ($record === null) {
            Response::error('Refresh token invalido o expirado', 401);
        }

        $user = $this->usuario->findById($record['usuario_id']);

        if ($user === null || !$user['activo'] || $user['deleted_at'] !== null) {
            Response::error('Usuario no disponible', 401);
        }

        $roles = $this->usuario->getRoles($user['id']);

        $accessToken = JWT::encode($user['id'], [
            'email' => $user['email'],
            'roles' => $roles,
        ]);

        $config = $GLOBALS['config']['jwt'];

        return [
            'access_token' => $accessToken,
            'token_type'   => 'Bearer',
            'expires_in'   => $config['access_ttl'],
        ];
    }

    /**
     * Revoke a refresh token (single-device logout).
     */
    public function logout(string $refreshToken): bool
    {
        return $this->usuario->revokeRefreshToken($refreshToken);
    }
}
