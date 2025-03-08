// lib/utils/formatters.ts
import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formate une date en chaîne de caractères lisible en français
 * @param dateString Chaîne de date (format ISO ou timestamp)
 * @param formatString Format de sortie (par défaut : 'd MMMM yyyy')
 * @returns Chaîne de date formatée
 */
export function formatDate(
  dateString: string | Date | null | undefined,
  formatString: string = 'd MMMM yyyy'
): string {
  if (!dateString) return '';
  
  try {
    // Convertir en objet Date si c'est une chaîne
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    
    // Vérifier que la date est valide
    if (!isValid(date)) {
      console.warn('Date invalide reçue par formatDate:', dateString);
      return '';
    }
    
    // Formater la date
    return format(date, formatString, { locale: fr });
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error);
    return '';
  }
}

/**
 * Formate une date avec l'heure en français
 * @param dateString Chaîne de date (format ISO ou timestamp)
 * @returns Chaîne de date avec heure formatée
 */
export function formatDateTime(
  dateString: string | Date | null | undefined
): string {
  return formatDate(dateString, 'PPP à HH:mm');
}

/**
 * Formate une date relative (aujourd'hui, hier, il y a 3 jours, etc.)
 * @param dateString Chaîne de date (format ISO ou timestamp)
 * @returns Chaîne de date relative
 */
export function formatRelativeDate(
  dateString: string | Date | null | undefined
): string {
  if (!dateString) return '';
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  
  return formatDate(date);
}

/**
 * Formate une date spécifiquement pour les méditations ou événements
 * @param dateString Chaîne de date (format ISO ou timestamp)
 * @returns Date formatée pour un contexte de méditation
 */
export function formatMeditationDate(
  dateString: string | Date | null | undefined
): string {
  return formatDate(dateString, 'd MMMM yyyy');
}