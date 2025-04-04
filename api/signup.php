<?php


    
function signupController($conn, $data)
{
  
    if (!$conn) {
        return ['status' => 'error', 'message' => 'Connexion à la base de données échouée.'];
    }

    $name = htmlspecialchars($data['name']);
    $username = htmlspecialchars($data['username']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $profession = htmlspecialchars($data['profession']);
    $type_of_music = htmlspecialchars($data['type_of_music']);

   
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->fetch()) {
        return ['status' => 'error', 'message' => 'Ce nom d\'utilisateur est déjà utilisé !'];
    }

   
    $stmt = $conn->prepare("INSERT INTO users (name, username, password, profession, type_of_music) VALUES (?, ?, ?, ?, ?)");

    if ($stmt->execute([$name, $username, $password, $profession, $type_of_music])) {
        return ['status' => 'success', 'message' => 'Inscription réussie !'];
    } else {
        return ['status' => 'error', 'message' => 'Erreur lors de l\'inscription.'];
    }
}

  