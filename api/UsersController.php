<?php

function UsersController($conn)
{
   
    if (!$conn) {
        return ['status' => 'error', 'message' => 'Connexion à la base de données échouée.'];
    }
    
    try {
      
        $stmt = $conn->prepare("SELECT id, username, name, profession, type_of_music FROM users ORDER BY id DESC");
        $stmt->execute();
        
        
        if ($stmt->rowCount() === 0) {
            return [
                'status' => 'success', 
                'message' => 'Aucun utilisateur trouvé.',
                'users' => []
            ];
        }
        
        
        $usersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $users = [];
        
        
        foreach ($usersData as $user) {
            $users[] = [
                'id' => $user['id'],
                'name' => $user['name'] ?: $user['username'], 
                'username' => $user['username'],
                'profession' => $user['profession'] ?: 'Music producer', 
                'type_of_music' => $user['type_of_music'] ?: 'Electronic' 
            ];
        }
        
       
        return [
            'status' => 'success',
            'message' => 'Utilisateurs récupérés avec succès',
            'users' => $users
        ];
    } catch (PDOException $e) {
        
        return [
            'status' => 'error', 
            'message' => 'Erreur lors de la récupération des utilisateurs: ' . $e->getMessage()
        ];
    }
}