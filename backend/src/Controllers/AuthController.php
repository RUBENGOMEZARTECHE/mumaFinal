<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Helpers\Validator;
use App\Services\AuthService;

/**
 * AuthController — Handles authentication endpoints.
 *
 * POST /api/auth/login    — Email/password login
 * POST /api/auth/refresh  — Refresh access token
 * POST /api/auth/logout   — Revoke refresh token
 */
class AuthController
{
    private AuthService $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    /**
     * POST /api/auth/login
     *
     * Body: { "email": "...", "password": "..." }
     *
     * Returns: access_token, refresh_token, user info.
     */
    public function login(Request $request, array $params): void
    {
        $v = new Validator($request->all());
        $v->required('email')->email('email');
        $v->required('password')->minLength('password', 6);

        if ($v->fails()) {
            Response::error('Datos de login invalidos', 422, $v->errors());
        }

        $result = $this->authService->login(
            $request->input('email'),
            $request->input('password')
        );

        Response::json($result);
    }

    /**
     * POST /api/auth/refresh
     *
     * Body: { "refresh_token": "..." }
     *
     * Returns: new access_token.
     */
    public function refresh(Request $request, array $params): void
    {
        $v = new Validator($request->all());
        $v->required('refresh_token');

        if ($v->fails()) {
            Response::error('Refresh token requerido', 422, $v->errors());
        }

        $result = $this->authService->refresh(
            $request->input('refresh_token')
        );

        Response::json($result);
    }

    /**
     * POST /api/auth/logout
     *
     * Body: { "refresh_token": "..." }
     *
     * Revokes the refresh token so it can no longer be used.
     */
    public function logout(Request $request, array $params): void
    {
        $v = new Validator($request->all());
        $v->required('refresh_token');

        if ($v->fails()) {
            Response::error('Refresh token requerido', 422, $v->errors());
        }

        $revoked = $this->authService->logout(
            $request->input('refresh_token')
        );

        if (!$revoked) {
            Response::error('Token no encontrado o ya revocado', 404);
        }

        Response::json(['message' => 'Sesion cerrada correctamente']);
    }
}
