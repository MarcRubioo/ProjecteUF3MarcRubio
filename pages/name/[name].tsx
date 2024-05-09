import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon, PokemonListResponde } from "@/interfaces";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import { getPokemonInfo, localFavorites } from "@/utils";
import { useState } from "react";
import confetti from 'canvas-confetti'


interface Props{
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

    const onToggleFavorite =()=>{
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if(!isInFavorites){
            confetti({
                zIndex: 999,
                particleCount:100,
                spread: 160,
                angle: -100,
                origin:{
                    x:1,
                    y:0
                }
            })
        }
    }


    return (
        <Layout title={pokemon.name}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card isHoverable className="md:col-span-1">
                    <CardBody>
                        <Image 
                            src={pokemon.sprites.other?.dream_world.front_default ?? 'URL_POR_DEFECTO'} 
                            alt={pokemon.name} 
                            width={140} height={140} 
                            className='aspect-square w-full h-full' />
                    </CardBody>
                </Card>
                <Card className="md:col-span-2 lg:col-span-4">

                    <CardHeader className="flex justify-between">
                        <span className="capitalize text-5xl">{pokemon.name}</span>
                        <Button 
                            variant={!isInFavorites ? 'ghost' : undefined} 
                            className="bg-gradient-to-r from-indigo-500 ..." onClick={onToggleFavorite}>
                                {isInFavorites ? "En Favoritos" : "Guardar en favoritos"}
                            
                        </Button>
                    </CardHeader>
                    
                    <CardBody>
                        <span className="text-3xl">Sprites:</span>
                        <div className="flex flex-row justify-center gap-8">
                            <Image
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                height={150}
                                width={150}
                            />
                            <Image
                                src={pokemon.sprites.back_default}
                                alt={pokemon.name}
                                height={150}
                                width={150}
                            />
                            <Image
                                src={pokemon.sprites.front_shiny}
                                alt={pokemon.name}
                                height={150}
                                width={150}
                            />
                            <Image
                                src={pokemon.sprites.back_shiny}
                                alt={pokemon.name}
                                height={150}
                                width={150}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>

        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
const {data}= await pokeApi.get<PokemonListResponde>('/pokemon?limit=151')
const pokemonNames: string[]= data.results.map(pokemon => pokemon.name)

    return {
        paths: pokemonNames.map(name =>({
            params: {name}
        })),
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
  
    const {name} = params as {name: string};
    
    const pokemon = await getPokemonInfo(name)


    if(!pokemon){
        return{
            redirect:{
                destination:'/',
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      },
      revalidate: 86000,
    };
}


export default PokemonByNamePage