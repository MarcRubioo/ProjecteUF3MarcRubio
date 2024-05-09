import { Card } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props{
    pokemonId: number
}

export const FavoriteCardPokemon: FC<Props> = ({pokemonId}) => {

const router = useRouter()

const onFavoriteClicked=()=>{
  router.push(`/pokemon/${pokemonId}`)
}

  return (
    <Card key={pokemonId} isHoverable>
      <Image className="aspect-square w-full h-full"
              onClick={onFavoriteClicked}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
              alt={`Pokemon ${pokemonId}`} 
              width={140}
              height={140}
      />
    </Card>
  )
}
