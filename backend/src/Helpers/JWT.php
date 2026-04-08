<?php

declare(strict_types=1);

namespace App\Helpers;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Throwable;

/**
 * JWT — Wrapper around firebase/php-jwt.
 *
 * Generates and verifies HS256 signed tokens.
 */
class JWT
{
    private static string $algo = 'HS256';

    /**
     * Generate an access token for a user.
     *
     * @param string $userId  User UUID
     * @param array  $extra   Additional claims (roles, email, etc.)
     * @return string Encoded JWT
     */
    public static function encode(string $userId, array $extra = []): string
    {
        $config = $GLOBALS['config']['jwt'];
        $now    = time();

        $payload = array_merge([
            'iss' => $GLOBALS['config']['app']['url'],
            'sub' => $userId,
            'iat' => $now,
            'exp' => $now + $config['access_ttl'],
            'type' => 'access',
        ], $extra);

        return FirebaseJWT::encode($payload, $config['secret'], self::$algo);
    }

    /**
     * Decode and verify a JWT token.
     *
     * @return array|null Decoded payload as associative array, or null on failure.
     */
    public static function decode(string $token): ?array
    {
        $config = $GLOBALS['config']['jwt'];

        try {
            $decoded = FirebaseJWT::decode($token, new Key($config['secret'], self::$algo));
            return (array) $decoded;
        } catch (ExpiredException) {
            return null;
        } catch (Throwable) {
            return null;
        }
    }

    /**
     * Generate a cryptographically secure refresh token string.
     */
    public static function generateRefreshToken(): string
    {
        return bin2hex(random_bytes(32));
    }
}
