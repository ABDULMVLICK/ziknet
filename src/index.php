<?php

header('Content-Type: application/json');

$host = 'db';
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

$method = $_SERVER['REQUEST_METHOD'];
$path = trim($_SERVER['REQUEST_URI'], '/');

if ($method === 'GET' && $path === 'users') {
    // Récupérer tous les utilisateurs
    // $stmt = $pdo->query("SELECT * FROM users");
    // $users = $stmt->fetchAll();
    echo json_encode(['users' => '']);
    exit;
}

if ($method === 'POST' && $path === 'users') {
    // Ajouter un utilisateur
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['name']) || !isset($data['email'])) {
        echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
    $stmt->execute(['name' => $data['name'], 'email' => $data['email']]);

    echo json_encode(['status' => 'success', 'message' => 'Utilisateur ajouté']);
    exit;
}

// Route non trouvée
http_response_code(404);
echo json_encode(['status' => 'error', 'message' => 'Route non trouvée']);