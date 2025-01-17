

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Vérification de l'authentification
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { evenement_id, ...infos } = body;

    if (!evenement_id) {
      return NextResponse.json({ error: 'ID de l\'événement manquant' }, { status: 400 });
    }

    // Vérifier si l'événement existe
    const { data: evenement } = await supabase
      .from('evenements')
      .select()
      .eq('id', evenement_id)
      .single();

    if (!evenement) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }

    // Insérer les infos
    const { data, error } = await supabase
      .from('evenements_infos')
      .insert([{ evenement_id, ...infos }])
      .select()
      .single();

    if (error) {
      console.error('Erreur insertion:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création des informations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { evenement_id, ...infos } = body;

    if (!evenement_id) {
      return NextResponse.json({ error: 'ID de l\'événement manquant' }, { status: 400 });
    }

    // Mettre à jour ou créer les infos
    const { data, error } = await supabase
      .from('evenements_infos')
      .upsert([{ evenement_id, ...infos }])
      .select()
      .single();

    if (error) {
      console.error('Erreur mise à jour:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour des informations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const url = new URL(request.url);
    const evenement_id = url.searchParams.get('evenement_id');

    if (!evenement_id) {
      return NextResponse.json({ error: 'ID de l\'événement manquant' }, { status: 400 });
    }

    const { error } = await supabase
      .from('evenements_infos')
      .delete()
      .eq('evenement_id', evenement_id);

    if (error) {
      console.error('Erreur suppression:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression des informations' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Informations supprimées avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const url = new URL(request.url);
    const evenement_id = url.searchParams.get('evenement_id');

    if (!evenement_id) {
      return NextResponse.json({ error: 'ID de l\'événement manquant' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('evenements_infos')
      .select()
      .eq('evenement_id', evenement_id)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore l'erreur "not found"
      console.error('Erreur récupération:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des informations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}