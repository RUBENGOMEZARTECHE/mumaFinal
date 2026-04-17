<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;
use PDO;

/**
 * Usuario — Database queries for the usuarios table.
 *
 * All methods use prepared statements. No raw user input in queries.
 */
class Usuario
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Find user by ID (UUID). Returns null if not found.
     */
    public function findById(string $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, email, nombre, apellidos, password_hash, activo, deleted_at, created_at, updated_at
             FROM usuarios
             WHERE id = ?
             LIMIT 1'
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Find user by email (for login). Returns null if not found.
     */
    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, email, nombre, apellidos, password_hash, activo, deleted_at, created_at, updated_at
             FROM usuarios
             WHERE email = ? AND deleted_at IS NULL
             LIMIT 1'
        );
        $stmt->execute([$email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Get all role names for a user.
     *
     * @return string[] e.g. ['admin', 'cientifico']
     */
    public function getRoles(string $userId): array
    {
        $stmt = $this->db->prepare(
            'SELECT r.nombre
             FROM roles r
             INNER JOIN usuario_rol ur ON ur.rol_id = r.id
             WHERE ur.usuario_id = ?'
        );
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * Create a new user. Returns the new user ID.
     */
    public function create(array $data): string
    {
        $id = Database::uuid();

        $stmt = $this->db->prepare(
            'INSERT INTO usuarios (id, email, nombre, apellidos, password_hash, activo, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())'
        );
        $stmt->execute([
            $id,
            $data['email'],
            $data['nombre'],
            $data['apellidos'] ?? null,
            password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]),
        ]);

        return $id;
    }

    /**
     * Assign a role to a user.
     */
    public function assignRole(string $userId, string $roleName): void
    {
        $stmt = $this->db->prepare(
            'INSERT IGNORE INTO usuario_rol (usuario_id, rol_id)
             SELECT ?, r.id FROM roles r WHERE r.nombre = ?'
        );
        $stmt->execute([$userId, $roleName]);
    }

    // ------------------------------------------------------------------
    // Refresh tokens
    // ------------------------------------------------------------------

    /**
     * Store a refresh token in the database.
     */
    public function storeRefreshToken(string $userId, string $token, int $ttl): void
    {
        $id = Database::uuid();
        $expiresAt = date('Y-m-d H:i:s', time() + $ttl);

        $stmt = $this->db->prepare(
            'INSERT INTO refresh_tokens (id, usuario_id, token, expires_at, created_at)
             VALUES (?, ?, ?, ?, NOW())'
        );
        $stmt->execute([$id, $userId, hash('sha256', $token), $expiresAt]);
    }

    /**
     * Find a valid (non-expired, non-revoked) refresh token.
     * Returns the row with usuario_id, or null.
     */
    public function findRefreshToken(string $token): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, usuario_id, expires_at
             FROM refresh_tokens
             WHERE token = ?
               AND revoked_at IS NULL
               AND expires_at > NOW()
             LIMIT 1'
        );
        $stmt->execute([hash('sha256', $token)]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Revoke a refresh token (logout).
     */
    public function revokeRefreshToken(string $token): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE refresh_tokens SET revoked_at = NOW() WHERE token = ? AND revoked_at IS NULL'
        );
        $stmt->execute([hash('sha256', $token)]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Revoke all refresh tokens for a user (force logout everywhere).
     */
    public function revokeAllTokens(string $userId): int
    {
        $stmt = $this->db->prepare(
            'UPDATE refresh_tokens SET revoked_at = NOW() WHERE usuario_id = ? AND revoked_at IS NULL'
        );
        $stmt->execute([$userId]);
        return $stmt->rowCount();
    }
}
