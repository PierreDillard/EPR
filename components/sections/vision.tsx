'use client';

export default function Vision() {
  return (
    <>
      <section id="vision" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate lg:prose-xl mx-auto mb-12">
            <h2 className="text-4xl text-center font-bold my-6 relative py-8
           
              after:content-[''] after:block after:w-24 after:h-1 after:bg-[#00AECE]
              after:mx-auto after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Notre Vision
            </h2>
            
            <div className="!max-w-3xl mx-auto not-prose">
              <p className="text-left text-lg text-gray-600 mb-6">
                <span className="font-medium">Ensemble pour le Royaume</span> est une association qui a pour vocation de rassembler 
                des chrétiens de différentes dénominations, horizons ou cultures, afin de 
                participer ensemble à l'avancement du Royaume de Dieu dès ici-bas.
              </p>
              <p className="text-left text-lg text-gray-600 mb-6">
                Elle est appelée à proclamer la bonne nouvelle du royaume (Mat 4:23), 
                à manifester la puissance du royaume (I Cor 4:20) et à produire les 
                fruits du royaume (Rom 14:17; Gal 5:22).
              </p>
              <p className="text-left text-lg text-gray-600">
                Dans le respect de ses partenaires, elle œuvre 'en réseau', comme dans 
                le Nouveau Testament, et collabore avec l'ensemble du 'corps de Christ' 
                au travers des <span className="font-medium">5 ministères</span> (apôtres, prophètes, 
                évangélistes, pasteurs, et enseignants).
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Carte Proclamer */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white p-8 rounded-lg h-full flex flex-col items-center">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#00AECE] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Proclamer</h3>
                <p className="text-gray-600 text-center">La bonne nouvelle du royaume  <br /> <span className="italic">(Mat 4:23)</span></p>
              </div>
            </div>

            {/* Carte Manifester */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white p-8 rounded-lg  h-full flex flex-col items-center">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#A8CC3D] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Manifester</h3>
                <p className="text-gray-600 text-center">La puissance du royaume  <br />
                <span className="italic">(I Cor 4:20)</span></p>
              </div>
            </div>

            {/* Carte Produire */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white p-8 rounded-lg  h-full flex flex-col items-center">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#FDAC00] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Produire</h3>
                <p className="text-gray-600 text-center">Les fruits du royaume  <br /> 
                <span className="italic">(Rom 14:17; Gal 5:22)</span></p>
              </div>
            </div>

            {/* Carte Collaborer */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white p-8 rounded-lg  h-full flex flex-col items-center">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#0A0A0A] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6"/><path d="M12 14v-4"/><path d="M12 19c0-1.657 1.343-3 3-3h0c1.657 0 3 1.343 3 3v0c0 1.657-1.343 3-3 3h0c-1.657 0-3-1.343-3-3z"/><path d="M9 19c0-1.657-1.343-3-3-3h0C4.343 16 3 17.343 3 19v0c0 1.657 1.343 3 3 3h0c1.657 0 3-1.343 3-3z"/><path d="M12 14c0-1.657 1.343-3 3-3h0c1.657 0 3 1.343 3 3v0c0 1.657-1.343 3-3 3h0c-1.657 0-3-1.343-3-3z"/><path d="M9 14c0-1.657-1.343-3-3-3h0C4.343 11 3 12.343 3 14v0c0 1.657 1.343 3 3 3h0c1.657 0 3-1.343 3-3z"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Collaborer</h3>
                <p className="text-gray-600 text-center">Œuvrer en réseau avec l'ensemble du corps de Christ</p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate lg:prose-xl mx-auto mt-16">
            <p className="text-center text-lg text-gray-600 italic">
              C'est en cultivant <span className="font-medium">"la culture du Royaume"</span> que nous encourageons 
              chaque chrétien à s'investir dans sa ville, son église locale et sa nation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}