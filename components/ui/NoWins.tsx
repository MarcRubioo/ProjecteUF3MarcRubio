import Image from "next/image"

export const NoWins = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="font-bold	text-2xl"> No has ganado ninguna batalla </span>
        <Image 
            className="opacity-10	"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
            alt="dito"
            height={250}
            width={250}/>
    </div>
  )
}
