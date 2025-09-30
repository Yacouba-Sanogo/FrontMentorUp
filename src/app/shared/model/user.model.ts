export interface User {
  id: number;
  email: string;
  role: 'ROLE_ADMIN' | 'ROLE_SCHOOL' | 'ROLE_PARRAIN' | 'ROLE_PARENT';
  // Ajoutez d'autres propriétés communes à tous les utilisateurs si nécessaire
}

export interface Parrain extends User {
  nom: string;
  prenom: string;
  pays: string;
}

export interface Ecole extends User {
   nomEcole: string;
  adresse: string;
}

// etc. pour les autres rôles
