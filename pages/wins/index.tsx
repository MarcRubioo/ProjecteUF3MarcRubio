import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { NoWins } from "@/components/ui/NoWins"
import { WinsPokemons } from "@/components/pokemon/WinsPokemons"
import localWins from "@/utils/localWins"




const WinsPage = () => {

  const [winsPokemons, setWinsPokemons] = useState<number[]>([])

  useEffect(() => {
    setWinsPokemons(localWins.pokemons)
  }, [])
  

  return (
        <Layout title="Wins Pokemons">
          {winsPokemons.length === 0 
            ? ( <NoWins/> ) 
            : ( <WinsPokemons pokemons={winsPokemons}/> )
          }
        </Layout>
  )
}
export default WinsPage
