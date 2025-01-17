

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { evenement, infos } = body;

    if (!evenement) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

   
    const { data: eventData, error: eventError } = await supabase
      .from('evenements')
      .insert([evenement])
      .select()
      .single();

    if (eventError) {
      console.error('Erreur insertion événement:', eventError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'événement' },
        { status: 500 }
      );
    }


    if (infos) {
      const { error: infosError } = await supabase
        .from('evenements_infos')
        .insert([{
          ...infos,
          evenement_id: eventData.id
        }]);

      if (infosError) {
        console.error('Erreur insertion infos:', infosError);
      
        await supabase.from('evenements').delete().eq('id', eventData.id);
        return NextResponse.json(
          { error: 'Erreur lors de la création des informations' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, data: eventData },
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

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { id, evenement, infos } = body;

    if (!id || !evenement) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Mettre à jour l'événement
    const { error: eventError } = await supabase
      .from('evenements')
      .update(evenement)
      .eq('id', id);

    if (eventError) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'événement' },
        { status: 500 }
      );
    }

    if (infos) {
      const { error: infosError } = await supabase
        .from('evenements_infos')
        .upsert({
          ...infos,
          evenement_id: id
        });

      if (infosError) {
        return NextResponse.json(
          { error: 'Erreur lors de la mise à jour des informations' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

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
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const { error } = await supabase
      .from('evenements')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de la suppression' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Événement supprimé avec succès' },
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