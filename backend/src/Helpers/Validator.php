<?php

declare(strict_types=1);

namespace App\Helpers;

/**
 * Validator — Simple field validation.
 *
 * Usage:
 *   $v = new Validator($request->all());
 *   $v->required('email')->email('email')->minLength('password', 8);
 *   if ($v->fails()) {
 *       Response::error('Validation failed', 422, $v->errors());
 *   }
 */
class Validator
{
    private array $data;
    private array $errors = [];

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Field must be present and non-empty.
     */
    public function required(string $field, ?string $message = null): self
    {
        if (!isset($this->data[$field]) || $this->data[$field] === '' || $this->data[$field] === null) {
            $this->errors[$field][] = $message ?? "El campo '$field' es obligatorio.";
        }
        return $this;
    }

    /**
     * Field must be a valid email address.
     */
    public function email(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe ser un email valido.";
        }
        return $this;
    }

    /**
     * Field must have at least $min characters.
     */
    public function minLength(string $field, int $min, ?string $message = null): self
    {
        if (isset($this->data[$field]) && mb_strlen((string)$this->data[$field]) < $min) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe tener al menos $min caracteres.";
        }
        return $this;
    }

    /**
     * Field must have at most $max characters.
     */
    public function maxLength(string $field, int $max, ?string $message = null): self
    {
        if (isset($this->data[$field]) && mb_strlen((string)$this->data[$field]) > $max) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe tener maximo $max caracteres.";
        }
        return $this;
    }

    /**
     * Field must be a valid integer.
     */
    public function integer(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field]) && !is_numeric($this->data[$field])) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe ser un numero entero.";
        }
        return $this;
    }

    /**
     * Field must be numeric (int or float).
     */
    public function numeric(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field]) && !is_numeric($this->data[$field])) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe ser numerico.";
        }
        return $this;
    }

    /**
     * Field must be one of the allowed values.
     */
    public function in(string $field, array $allowed, ?string $message = null): self
    {
        if (isset($this->data[$field]) && !in_array($this->data[$field], $allowed, true)) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe ser uno de: " . implode(', ', $allowed);
        }
        return $this;
    }

    /**
     * Field must be a valid date (Y-m-d or Y-m-d H:i:s).
     */
    public function date(string $field, string $format = 'Y-m-d', ?string $message = null): self
    {
        if (isset($this->data[$field])) {
            $d = \DateTime::createFromFormat($format, $this->data[$field]);
            if (!$d || $d->format($format) !== $this->data[$field]) {
                $this->errors[$field][] = $message ?? "El campo '$field' debe ser una fecha valida ($format).";
            }
        }
        return $this;
    }

    /**
     * Field must be a valid UUID (32 hex chars).
     */
    public function uuid(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field]) && !preg_match('/^[a-f0-9]{32}$/', $this->data[$field])) {
            $this->errors[$field][] = $message ?? "El campo '$field' debe ser un UUID valido.";
        }
        return $this;
    }

    /**
     * Field must be a valid latitude.
     */
    public function latitude(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field])) {
            $val = (float) $this->data[$field];
            if ($val < -90 || $val > 90) {
                $this->errors[$field][] = $message ?? "El campo '$field' debe ser una latitud valida (-90 a 90).";
            }
        }
        return $this;
    }

    /**
     * Field must be a valid longitude.
     */
    public function longitude(string $field, ?string $message = null): self
    {
        if (isset($this->data[$field])) {
            $val = (float) $this->data[$field];
            if ($val < -180 || $val > 180) {
                $this->errors[$field][] = $message ?? "El campo '$field' debe ser una longitud valida (-180 a 180).";
            }
        }
        return $this;
    }

    public function fails(): bool
    {
        return !empty($this->errors);
    }

    public function errors(): array
    {
        return $this->errors;
    }

    /**
     * Get validated data (only fields that were validated, no extras).
     */
    public function validated(array $fields): array
    {
        return array_intersect_key($this->data, array_flip($fields));
    }
}
