<?php


function LoginController($conn, $data)
{
    if (!$conn) {
        return ['status' => 'error', 'message' => 'Connexion à la base de données échouée.'];
    }

    if (!isset($data['username'], $data['password'])) {
        return ['status' => 'error', 'message' => 'Données incomplètes'];
    }

    $username = htmlspecialchars($data['username']);  
    $password = $data['password']; 

   
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->rowCount() === 0) {
        return ['status' => 'error', 'message' => 'Nom d\'utilisateur ou mot de passe incorrect.'];
    }

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

   
    if (!password_verify($password, $user['password'])) {
        return ['status' => 'error', 'message' => 'Nom d\'utilisateur ou mot de passe incorrect.'];
    }

    return [
        'status' => 'success',
        'message' => 'Connexion réussie !',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'username' => $user['username'],
            'profession' => $user['profession'],
            'type_of_music' => $user['type_of_music']
        ]
    ];
}

