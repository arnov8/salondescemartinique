// Inscriptions — interrupteurs uniques (visiteurs / exposants).
//
// false = complet : le formulaire concerné reste en place mais passe sous un voile
// « Complet » (inaccessible), les boutons et textes du site annoncent le salon complet
// et l'API correspondante refuse toute nouvelle inscription.
//
// Pour rouvrir les inscriptions (édition suivante) : repasser à true, puis déployer.

// /visiter + /api/visitor
export const VISITOR_REGISTRATION_OPEN = false

// /exposer (pré-inscription) + /api/exhibitor
// Le bulletin signé /inscription-exposant (non public, envoyé aux exposants retenus) n'est pas concerné.
export const EXHIBITOR_REGISTRATION_OPEN = false
