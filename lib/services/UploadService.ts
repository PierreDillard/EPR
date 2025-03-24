const IMAGES_URL = process.env.NEXT_PUBLIC_IMAGES_URL;

if (!IMAGES_URL) {
  throw new Error('NEXT_PUBLIC_IMAGES_URL is not defined in environment variables');
}

export async function uploadEventImage(file: File): Promise<string> {
  try {
    // Validation du fichier
    if (!file || !(file instanceof File)) {
      throw new Error('Fichier invalide');
    }

    const formData = new FormData();
    formData.append('file', file);
    
    // Log pour vérifier l'URL d'upload
    console.log('Tentative d\'upload vers:', `${IMAGES_URL}/upload`);
    console.log('Détails du fichier:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Simplifier la requête fetch
    const response = await fetch(`${IMAGES_URL}/upload`, {
      method: 'POST',
      // Ne pas spécifier de headers supplémentaires avec FormData
      // Le navigateur définira automatiquement les headers corrects
      // y compris Content-Type avec la boundary pour multipart/form-data
      mode: 'cors',
      credentials: 'omit', // Modifié de 'same-origin' à 'omit'
      body: formData
    });

    if (!response.ok) {
      // Récupérer le message d'erreur du serveur si possible
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || response.statusText;
      } catch {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      
      throw new Error(`Erreur lors de l'upload: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Réponse du serveur:', data);

    // Retourner l'URL directement depuis la réponse du serveur
    // Le serveur renvoie déjà l'URL complète
    return data.url;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Erreur de connexion au serveur:', IMAGES_URL);
      throw new Error(`Erreur de connexion au serveur: ${IMAGES_URL}`);
    }

    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }
}



export async function deleteImageFromServer(imageUrl: string): Promise<boolean> {
  try {
    if (!imageUrl) {
      console.error('URL d\'image non fournie');
      return false;
    }

    // Extraire le nom du fichier de l'URL
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    if (!filename) {
      console.error('Impossible d\'extraire le nom du fichier:', imageUrl);
      return false;
    }
    
    // Construire l'URL de suppression
    const deleteUrl = `${IMAGES_URL}/delete`;
    console.log('Tentative de suppression sur:', deleteUrl);
    console.log('Nom du fichier à supprimer:', filename);
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({ filename })
    });
    
    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || response.statusText;
      } catch {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      
      console.error('Erreur lors de la suppression de l\'image:', errorMessage);
      return false;
    }
    
    const data = await response.json();
    console.log('Réponse de la suppression:', data);
    
    return data.success || false;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return false;
  }
}