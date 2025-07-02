export function translateString(state: string){
  switch (state){
    case "reserved": return "Réservé";
    case "in_progress": return "En cours";
    default: return "Terminé";
  }
}
