import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { NoFavourites } from "../../components/ui"
import { localFavorites } from "@/utils"
import { FavoritePokemons } from "../../components/pokemon"




const FavoritePage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons)
  }, [])
  

  return (
        <Layout title="Pokemons Favoritos">
          {favoritePokemons.length === 0 
            ? ( <NoFavourites/> ) 
            : ( <FavoritePokemons pokemons={favoritePokemons}/> )
          }
        </Layout>
  )
}
export default FavoritePage
