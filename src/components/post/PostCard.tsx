'use client'

import Player from 'components/Player/Player'
import { Post } from 'types'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import { api_Url } from 'utils/consts'
import { pb } from 'utils/pocketbase'
import { useRouter } from 'next/navigation'

function PostCard({ post }: { post: Post }) {
  const router = useRouter()
  const model = pb.authStore.model
  const videoUrl = `${api_Url}api/files/posts/${post.id}/${post.fileUrl}`

  return (
    // OIO ONE - Camada de Profundidade: O Post ocupa a área sensorial total
    <div className="relative w-full h-full bg-black overflow-hidden group">
      
      {/* 1. CAMADA BASE: O VÍDEO (100% da tela) */}
      <div className="absolute inset-0 z-0">
        <Player videoUrl={videoUrl} />
      </div>

      {/* 2. CAMADA DE INTERAÇÃO: Header Flutuante (Transparente) */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <PostHeader user={post.expand.profile} post={post} />
      </div>

      {/* 3. CAMADA DE IDENTIDADE: Footer Flutuante (Sobre o Vídeo) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[2px]">
        <PostFooter id={model?.id || ''} post={post} />
      </div>

      {/* Efeito de Profundidade nas bordas (Design de Elite) */}
      <div className="absolute inset-0 pointer-events-none border border-zinc-800/20 rounded-[40px] z-30"></div>
    </div>
  )
}

export default PostCard
