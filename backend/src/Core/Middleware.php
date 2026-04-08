<?php

declare(strict_types=1);

namespace App\Core;

use App\Helpers\JWT;
use App\Models\Usuario;

/**
 * Middleware — JWT authentication and role verification.
 *
 * After successful authentication, $request->user is set to:
 * [
 *   'id'    => '...',
 *   'email' => '...',
 *   'nombre' => '...',
 *   'roles' => ['admin', 'cientifico'],
 * ]
 */
class Middleware
{
    /**
     * Verify JWT token and load user into $request->user.
     */
    public static function authenticate(Request $request): void
    {
        $token = $request->bearerToken();
        if ($token === null) {
            Response::error('Token de acceso requerido', 401);
        }

        // Decode JWT
        $payload = JWT::decode($token);
        if ($payload === null) {
            Response::error('Token invalido o expirado', 401);
        }

        $userId = $payload['sub'] ?? null;
        if ($userId === null) {
            Response::error('Token malformado', 401);
        }

        // Verify user exists and is active
        $usuario = new Usuario();
        $user = $usuario->findById($userId);

        if ($user === null) {
            Response::error('Usuario no encontrado', 401);
        }

        if (!$user['activo']) {
            Response::error('Usuario desactivado', 403);
        }

        if ($user['deleted_at'] !== null) {
            Response::error('Usuario eliminado', 401);
        }

        // Load roles
        $roles = $usuario->getRoles($userId);

        // Inject into request
        $request->user = [
            'id'     => $user['id'],
            'email'  => $user['email'],
            'nombre' => $user['nombre'],
            'roles'  => $roles,
        ];
    }

    /**
     * Verify user has a specific role. Must be called after authenticate().
     */
    public static function requireRole(Request $request, string $role): void
    {
        if ($request->user === null) {
            Response::error('No autenticado', 401);
        }

        if (!in_array($role, $request->user['roles'], true)) {
            Response::error('No tienes permisos para esta accion. Rol requerido: ' . $role, 403);
        }
    }

    /**
     * Verify user has ANY of the given roles.
     */
    public static function requireAnyRole(Request $request, array $roles): void
    {
        if ($request->user === null) {
            Response::error('No autenticado', 401);
        }

        $userRoles = $request->user['roles'];
        foreach ($roles as $role) {
            if (in_array($role, $userRoles, true)) {
                return;
            }
        }

        Response::error('No tienes permisos. Roles requeridos: ' . implode(', ', $roles), 403);
    }
}
