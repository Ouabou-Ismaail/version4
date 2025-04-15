<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php'; // Include your database connection file

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $data['nom'] ?? '';
    $prenom = $data['prenom'] ?? '';
    $cin = $data['cin'] ?? '';
    $gender = $data['gender'] ?? '';
    $age = $data['age'] ?? null;
    $email = $data['email'] ?? '';
    $numero_Tele = $data['numero_Tele'] ?? '';
    $adress = $data['adress'] ?? '';
    $pb = $data['pb'] ?? '';
    $doctor_traitant = $data['doctor_traitant'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($nom) || empty($prenom) || empty($cin) || empty($gender) || empty($email) || empty($numero_Tele) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Tous les champs obligatoires doivent être remplis.']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        $db->beginTransaction();

        // Insert into patients table
        $stmt = $db->prepare("INSERT INTO patients (nom, prenom, cin, gender, age, email, numero_Tele, adress, pb, doctor_traitant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$nom, $prenom, $cin, $gender, $age, $email, $numero_Tele, $adress, $pb, $doctor_traitant]);

        // Insert into users table
        $stmt = $db->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
        $stmt->execute([$email, $hashedPassword, 'patient']);

        $db->commit();

        echo json_encode(['success' => true, 'message' => 'Compte créé avec succès.']);
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['success' => false, 'message' => 'Erreur lors de la création du compte.', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
