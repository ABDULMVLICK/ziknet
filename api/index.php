<?php

header('Content-Type: application/json');

/**
 * Un exemple d'API en PHP définition des endpoints 
 */

$host = 'db'; // hote définit dans le docker-compose
$dbname = 'db';
$username = 'root';
$password = 'admin';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD']; // verb HTTP GET POST ... 
$path = trim($_SERVER['REQUEST_URI'], '/');

// /users en GET  ENDPOINT
if ($method === 'GET' && $path === 'users') {
    // Récupérer tous les utilisateurs
    // $stmt = $pdo->query("SELECT * FROM users");
    // $users = $stmt->fetchAll();
    echo json_encode(['users' => '', 'path' => $path]);
    exit;
}

// endpoint messages affiche les messages posté par un utilisateur ENDPOINT
if ($method === 'GET' && $path === 'messages') {
    // Ajouter un utilisateur

    echo json_encode(['status' => 'success', 'message' => [
        'id' => 1,
        'content' => 'Je cherche un musicien qui fait de la guitarre',
        'user_id' => 6
    ]]);
    exit;
}

// endpoint message ENDPOINT
if ($method === 'POST' && $path === 'message') {
    // Ajouter un utilisateur

    $stmt = $pdo->prepare("INSERT INTO messages (content, user_id) VALUES (:content, :user_id)");
    $stmt->execute(['content' => $data['name'], 'user_id' => $data['email']]);

    echo json_encode(['status' => 'success', 'message' => 'Utilisateur ajouté']);
    exit;
}

// Route non trouvée
http_response_code(404);
echo json_encode(['status' => 'error', 'message' => 'Route non trouvée']);