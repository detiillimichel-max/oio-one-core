import InfiniteFeed from 'components/feed/InfiniteFeed'
import { Post } from 'types'
import { api_Url } from 'utils/consts'

// OIO ONE - Camada Sensorial (Feed de Mídia 70% Topo)
async function HomePage() {
  // Michel, carregamos os dados do autor (Identity Layer)
  // O revalidate: 60 garante o desempenho de app profissional
  const posts = (await fetch(`${api_Url}collections/posts/records?expand=profile&sort=-created`, {
    next: { revalidate: 60 }
  }).then((res) => res.json()))?.items as Post[]

  return (
    // CAMADA SENSORIAL: Ocupa 100% da tela com o vídeo, fundo preto puro.
    // O pb-[30vh] cria o espaço para a Gaveta de Identidade (30% inferior).
    <main className="relative z-10 w-full h-screen bg-black overflow-hidden scrollbar-hide">
      
      {/* OIO ONE - Identidade em Profundidade */}
      <div className="flex flex-col h-full w-full">
        {/* Módulos de Acoplamento (Área onde os vídeos se encaixam) */}
        <div className="relative flex-grow bg-zinc-950 border-t border-zinc-800/40 rounded-t-[40px] shadow-inner overflow-hidden">
          {/* Feed de Vídeo Infinito (70% - Estilo Social Grande) */}
          <InfiniteFeed initialPosts={posts} />
        </div>

        {/* Espaço reservado para a Gaveta de Vidro (30%) que vamos costurar depois */}
        <div className="h-[30vh] w-full bg-black/40 backdrop-blur-xl border-t border-zinc-800/40 rounded-t-[40px]">
          {/* A Gaveta de Chat/Identidade (image_2.png) se encaixa aqui por profundidade */}
        </div>
      </div>
      
      {/* SALTO QUÂNTICO: Miniaturas de Navegação Rápida */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="w-1.5 h-1.5 bg-zinc-800 rounded-full transition-all hover:h-6 hover:bg-zinc-500 cursor-pointer"
          />
        ))}
      </div>

    </main>
  )
}

export default HomePage
