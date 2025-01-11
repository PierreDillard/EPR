import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getYoutubeVideoId } from '@/utils/youtube';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 });
    }

    const videoId = getYoutubeVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'URL YouTube invalide' }, { status: 400 });
    }

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YOUTUBE_API_KEY) {
      console.error('Clé API YouTube non configurée');
      return NextResponse.json(
        { error: 'Configuration YouTube manquante' },
        { status: 500 }
      );
    }

    // Appel à l'API YouTube pour obtenir les détails de la vidéo
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    
    const youtubeResponse = await fetch(youtubeApiUrl, {
      headers: {
        'Referer': baseUrl,
        'Origin': baseUrl
      }
    });
    
    if (!youtubeResponse.ok) {
      const errorText = await youtubeResponse.text();
      console.error('Erreur YouTube API:', {
        status: youtubeResponse.status,
        statusText: youtubeResponse.statusText,
        error: errorText
      });

      return NextResponse.json(
        { error: 'Erreur API YouTube', details: errorText },
        { status: youtubeResponse.status }
      );
    }

    const youtubeData = await youtubeResponse.json();
    const videoInfo = youtubeData.items?.[0];

    if (!videoInfo) {
      return NextResponse.json(
        { error: 'Vidéo introuvable ou inaccessible' },
        { status: 404 }
      );
    }

    // Formatage de la date de publication
    const publishDate = new Date(videoInfo.snippet.publishedAt);
    
    // Conversion de la durée ISO 8601 en format lisible
    const duration = videoInfo.contentDetails?.duration || 'PT0M0S';

    // Préparation des données selon la structure exacte de la table
    const { data: predication, error: insertError } = await supabase
      .from('predications')
      .insert([
        {
          titre: videoInfo.snippet.title,
          date: publishDate.toISOString().split('T')[0], // Format YYYY-MM-DD
          miniature: videoInfo.snippet.thumbnails.high.url,
          youtube_id: videoId,
          description: videoInfo.snippet.description,
          duration: duration // Format ISO 8601 (ex: PT1H2M10S)
          // Note: created_at est généré automatiquement par Supabase
          // Note: id est auto-incrémenté par la base de données
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Erreur Supabase:', insertError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'insertion dans la base de données', details: insertError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: predication },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: 'Erreur serveur interne',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Vérifier l'authentification
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer l'ID de la prédication depuis l'URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    // Supprimer la prédication
    const { error } = await supabase
      .from('predications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la prédication', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Prédication supprimée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: 'Erreur serveur interne',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
