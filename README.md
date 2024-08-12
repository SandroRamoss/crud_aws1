# Lambda Prueba

Este proyecto proporciona una API para realizar operaciones CRUD básicas sobre usuarios. La API permite recuperar, agregar, actualizar y eliminar usuarios en la base de datos. Los métodos disponibles son GET, POST, PUT y DELETE.

## Método GET

**URL:**  
`https://yf75h69pmb.execute-api.us-east-1.amazonaws.com/dev`

**Ejemplo de respuesta:**
```json
[
    {
        "id_producto": 17,
        "description": "Chettos",
        "stock": 10,
        "estado": 0
    },
    {
        "id_producto": 18,
        "description": "Oreo",
        "stock": 10,
        "estado": 1
    }
]
```

# Method POST

**Cuerpo de la solicitud:**

```json
{
 "description": "prueba",
 "stock": 3,
 "estado": 1
}
```
**Ejemplo de respuesta:**

```json
{
    "message": "Se registró el producto."
}
```
# Method PUT

**Cuerpo de la solicitud:**

```json
{
 "id_producto": 17,
 "estado": 0
}
```
**Ejemplo de respuesta:**

```json
{
    "message": "Se actualizó el valor."
}
```

# Method DELETE

**Cuerpo de la solicitud:**

`https://yf75h69pmb.execute-api.us-east-1.amazonaws.com/dev?id_producto=19`

**Ejemplo de respuesta:**

```json
{
    "message": "Se eliminó el valor."
}
```