import { pokeApi } from '../../api';
import { Layout } from '@/components/layouts';
import { PokemonListResponde, SmallPokemon } from '../../interfaces';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { PokemonCardBattle } from '../../components/pokemon';
import Link from 'next/link';

interface Props {
  pokemons: SmallPokemon[];
}

const GamePage: NextPage<Props> = ({ pokemons }) => {
  const [selectedPokemonPlayer1, setSelectedPokemonPlayer1] = useState<number | null>(null);
  const [selectedPokemonPlayer2, setSelectedPokemonPlayer2] = useState<number | null>(null);
  const [selectedPokemonNamePlayer1, setSelectedPokemonNamePlayer1] = useState<string>('');
  const [selectedPokemonNamePlayer2, setSelectedPokemonNamePlayer2] = useState<string>('');

  const handleSelectPlayer1 = (id: number, name: string) => {
    setSelectedPokemonPlayer1(id);
    setSelectedPokemonNamePlayer1(name);
  };

  const handleSelectPlayer2 = (id: number, name: string) => {
    setSelectedPokemonPlayer2(id);
    setSelectedPokemonNamePlayer2(name);
  };

  const isBothPlayersSelected = selectedPokemonPlayer1 !== null && selectedPokemonPlayer2 !== null;

  return (
    <Layout title='Lista de Pokemons'>
      <div className='relative'>
        <div className='flex felx-row gap-[60px]'>
          <div>
            <p className='text-2xl pb-5 text-red-500'>Player 1</p>
            <div className='flex flex-row gap-3'>
              <p className='text-md pb-5 text-red-300'>Select your pokemon:</p>
              <p className='capitalize'> {selectedPokemonNamePlayer1} </p>
            </div>

            <div className="grid grid-cols-3  gap-4">
              {pokemons.map((pokemon) => (
                <PokemonCardBattle
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={(id) => handleSelectPlayer1(id, pokemon.name)}
                  isSelected={selectedPokemonPlayer1 === pokemon.id}
                  player="player1"
                />
              ))}
            </div>
          </div>

          <div>
            <p className='text-2xl pb-5 text-blue-500'>CPU Player</p>
            <div className='flex flex-row gap-3'>
              <p className='text-md pb-5 text-blue-300'>Select your pokemon:</p>
              <p className='capitalize'> {selectedPokemonNamePlayer2} </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {pokemons.map((pokemon) => (
                <PokemonCardBattle
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={(id) => handleSelectPlayer2(id, pokemon.name)}
                  isSelected={selectedPokemonPlayer2 === pokemon.id}
                  player="player2"
                />
              ))}
            </div>
          </div>

          <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
            {isBothPlayersSelected ? (
              <Link href={{ pathname: "/fight", query: { player1: selectedPokemonPlayer1, player2: selectedPokemonPlayer2 } }}>
                <p className='bg-red-500 border border-white h-[60px] w-[100px] flex items-center justify-center cursor-pointer rounded-md hover:bg-red-400'>
                  Go Fight!!!
                </p>
              </Link>
            ) : (
              <div className='text-gray-500 bg-gray-300 h-[60px] w-[150px] flex items-center justify-center cursor-not-allowed rounded-md'>
                Select a Pokemon
              </div>
            )}
          </div>

        </div>
      </div>

    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponde>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  };
}

export default GamePage;


