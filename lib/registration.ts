// Inscriptions visiteurs — interrupteur unique.
//
// false = visite complète : le formulaire de /visiter reste en place mais passe sous
// un voile « Complet » (inaccessible), les boutons de l'accueil annoncent la visite
// complète et /api/visitor refuse toute nouvelle inscription.
//
// Pour rouvrir les inscriptions (édition suivante) : repasser à true, puis déployer.
export const VISITOR_REGISTRATION_OPEN = false
