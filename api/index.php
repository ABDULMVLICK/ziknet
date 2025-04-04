<?php

// Définir le type de contenu comme JSON
header('Content-Type: application/json');

// CORS: Autoriser l'origine http://localhost:5175 (le frontend) à accéder à l'API
// Cette ligne est essentielle pour que les requêtes venant du frontend React puissent accéder à l'API PHP
header("Access-Control-Allow-Origin: http://localhost:5173"); // Ou précisez http://localhost:5175 pour plus de sécurité

// CORS: Spécifier les méthodes HTTP autorisées (GET, POST, PUT, DELETE, OPTIONS)
// Cela permet d'accepter certaines actions sur l'API, comme récupérer des données ou les envoyer.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// CORS: Spécifier les en-têtes autorisés dans la requête HTTP
// Par exemple, le frontend peut envoyer un en-tête Content-Type pour indiquer le type des données (JSON)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si la méthode HTTP est OPTIONS (pré-flight request), répondre directement avec un code 200 OK
// Cette requête OPTIONS est envoyée par le navigateur avant toute autre demande HTTP pour vérifier les permissions CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Répondre avec un code 200 OK
    exit(); // Terminer l'exécution de l'API pour cette requête OPTIONS
}

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/signup.php";
require_once __DIR__ . "/login.php";
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

}

// endpoint signup ENDPOINT
if ($method === 'POST' && $path === 'signup') {
   
    $data = json_decode(file_get_contents("php://input"), true);

    
    if (!isset($data['username'], $data['password'], $data['name'], $data['profession'], $data['type_of_music'])) {
        echo json_encode(['status' => 'error', 'message' => 'Données incomplètes']);
        http_response_code(400); 
        exit;
    }

   
    $signupResult = signupController($conn, $data);

    if ($signupResult['status'] === 'success') {
        echo json_encode(['status' => 'success', 'message' => 'Inscription réussie !']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $signupResult['message']]);
        http_response_code(400); 
    }

    exit;
}

// endpoint login ENDPOINT

if ($method === 'POST' && $path === 'login') {

   header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);

    
    if (!isset($data['username'], $data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Données incomplètes']);
        http_response_code(400); 
        exit;
    }

   
    $loginResult = LoginController($conn, $data);

    if ($loginResult['status'] === 'success') {
        echo json_encode(['status' => 'success', 'message' => 'Connexion réussie !']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $loginResult['message']]);
        http_response_code(400); 
    }

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