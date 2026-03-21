import { User } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import { api_Url } from 'utils/consts'
import { twMerge } from 'tailwind-merge' // Importante para combinar estilos

type Props = {
  user: User
  size?: number
  className?: string // Permite ajustes de design externos (DNA OIO ONE)
}

function Avatar({ user, size, className }: Props) {
  // Michel, definimos o tamanho padrão de elite (48px) se não for informado
  const s = size || 48
  const avatarImage = user?.avatar ? `${api_Url}api/files/_pb_users_auth_/${user.id}/${user.avatar}` : null

  // Estilo base do anel de destaque (Estilo Social Grande)
  const ringStyle = "ring-2 ring-zinc-800/80 p-0.5 rounded-full transition-all duration-300 hover:ring-zinc-700"

  return (
    <div className={twMerge("relative shrink-0", ringStyle, className)} style={{ width: `${s}px`, height: `${s}px` }}>
      {avatarImage ? (
        // Se o usuário tem foto, aplicamos o design imersivo
        <Link href={`/profile/${user.username}`}>
          <Image
            className="rounded-full object-cover grayscale-0 hover:grayscale transition-all duration-300"
            src={avatarImage}
            alt={user.name || 'User Avatar'}
            fill
          />
        </Link>
      ) : (
        // SE NÃO TEM FOTO: Removemos o zinco claro amador e colocamos o zinco escuro profissional
        <div className="w-full h-full rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-800/50 selection:bg-none">
          <span className="text-zinc-600 font-mono font-bold tracking-tight" style={{ fontSize: `${s/2.5}px` }}>
            {/* Pegamos as iniciais do nome com elegância */}
            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'O1'}
          </span>
        </div>
      )}
    </div>
  )
}

export default Avatar
