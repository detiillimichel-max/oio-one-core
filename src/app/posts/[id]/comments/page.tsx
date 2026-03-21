import InfiniteComments from 'components/comments/InfiniteComments'
import { Avatar, Date } from 'components/UI'
import { Post } from 'types'
import { api_Url } from 'utils/consts'
import DeleteButton from './DeleteButton'
import { useUser } from 'utils/useUser'

// Michel, aqui a gente define o tipo de PageProps do jeito que a Vercel exige agora
type PageProps = {
  params: Promise<{
    id: string
  }>
  children?: React.ReactNode
}

async function Page({ params }: PageProps) {
  // AQUI ESTÁ A MÁGICA: A gente espera o params carregar para pegar o ID
  const resolvedParams = await params
  const postId = resolvedParams.id
  
  const user = useUser()
  const userId = user?.model?.id || ''

  const post = (await fetch(
    `${api_Url}collections/posts/records/${postId}?expand=profile`,
  ).then((res) => res.json())) as Post

  return (
    <div className="flex flex-col gap-6 relative">
      {/* OIO ONE - Identidade do Autor no Topo */}
      <div className="flex gap-4 items-center">
        <Avatar user={post.expand.profile} size={56} />
        <div className="flex-grow">
          <p>{post.expand.profile.name}</p>
          <p className="text-sm text-zinc-400">
            {post.expand.profile.username}
          </p>
        </div>
        <Date date={post.created} />
        {post.expand.profile.id == userId && <DeleteButton postId={post.id} />}
      </div>
      
      <p>{post.caption}</p>
      
      <div className="w-full bg-zinc-800 h-[1px]"></div>
      
      {/* Aqui a função que você não quer perder: Comentários Infinitos */}
      <InfiniteComments postId={postId} />
      
      <p className="text-[10px] text-zinc-600 text-center">OIO ONE - Autor: Michel</p>
    </div>
  )
}

export default Page
