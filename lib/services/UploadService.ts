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

 
    console.log('Tentative d\'upload vers:', `${IMAGES_URL}/images/upload`);
    console.log('Détails du fichier:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Effectuer la requête avec les bons headers
    const response = await fetch(`${IMAGES_URL}/upload`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
     
      },
      mode: 'cors',
      credentials: 'same-origin', 
      body: formData
    });

  
    if (!response.ok) {

      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || response.statusText;
      } catch {
        errorMessage = response.statusText;
      }
      
      throw new Error(`Erreur serveur: ${errorMessage}`);
    }

    const data = await response.json();

    // Vérification de la réponse
    if (!data.url) {
      throw new Error('URL de l\'image manquante dans la réponse du serveur');
    }

    // Construction de l'URL complète
    const fullImageUrl = new URL(data.url, IMAGES_URL).toString();
    return fullImageUrl;

  } catch (error) {

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Erreur de connexion au serveur:', IMAGES_URL);
      throw new Error(`Impossible de contacter le serveur d'images à ${IMAGES_URL}. Vérifiez que le serveur est en ligne et accessible.`);
    }


    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }
}



export async function deleteImageFromServer(imageUrl: string): Promise<boolean> {
  try {

    if (!IMAGES_URL) {
      console.error('IMAGES_URL n\'est pas défini');
      return false;
    }

    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    if (!filename) {
      console.error('Impossible d\'extraire le nom du fichier:', imageUrl);
      return false;
    }
    
    // Construire l'URL correctement en s'assurant qu'il n'y a pas de doubles slashes
    const deleteUrl = `${IMAGES_URL.replace(/\/$/, '')}/delete`;
    console.log(deleteUrl);
    console.log('Tentative de suppression sur:', deleteUrl);
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
   
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify({ filename })
    });
    
    if (!response.ok) {
      console.error('Erreur lors de la suppression de l\'image:', response.statusText);
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