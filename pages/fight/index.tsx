import { pokeApi } from '../../api';
import { Layout } from '@/components/layouts';
import { SmallPokemon,PokemonListResponde, Pokemon } from '../../interfaces';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from "next/image";
import { getPokemonInfo } from "@/utils";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import localWins from '@/utils/localWins';


interface Props {
  pokemons: SmallPokemon[];
  pokemon?: Pokemon;
}

interface BattleState {
  player1Life: number;
  player2Life: number;
  round: number;
  winner: string | null;
}

const FightPage: NextPage<Props> = ({ pokemons , pokemon}) => {

  const addWins =(id: number)=>{
      localWins.addWins(id)
  }


  const router = useRouter();
  const [battleEnded, setBattleEnded] = useState(false);

  const player1Id = router.query.player1 as string;
  const player2Id = router.query.player2 as string;

  const player1Pokemon = pokemons.find(pokemon => pokemon.id === parseInt(player1Id));
  const player2Pokemon = pokemons.find(pokemon => pokemon.id === parseInt(player2Id));

  const [player1Action, setPlayer1Action] = useState<string | null>(null);
  const [player2Action, setPlayer2Action] = useState<string | null>(null);

  const [battleState, setBattleState] = useState<BattleState>({
    player1Life: 100,
    player2Life: 100,
    round: 1,
    winner: null,
  });

  const handleAttack = (attacker: string, defender: string) => {
    const attackerLife = attacker === 'player1' ? battleState.player1Life : battleState.player2Life;
    const defenderLife = attacker === 'player1' ? battleState.player2Life : battleState.player1Life;
    const damage = 10; 
    const newDefenderLife = defenderLife - damage;

    setBattleState(prevState => ({
      ...prevState,
      [`${defender}Life`]: newDefenderLife < 0 ? 0 : newDefenderLife,
    }));
  };

  const handleDodge = (attacker: string, defender: string) => {

    if(attacker === "player1" && defender === "player2"){
      const succesfuldodge = Math.random() < 0.5 ? 'ok' : 'fail'
      if(succesfuldodge === "fail"){
        const livePl1 = battleState.player1Life
        const livePl2 = battleState.player2Life
        const damage = 10; 
        const newAtackerLife = livePl1;
        const newDefenderLife = livePl2 - damage;
        console.log("esquivo player2 fallado")
        setPlayer2Action('Dodge fail');

        setBattleState(prevState => ({
          ...prevState,
          [`${attacker}Life`]: newAtackerLife < 0 ? 0 : newAtackerLife,
          [`${defender}Life`]: newDefenderLife < 0 ? 0 : newDefenderLife,
        }));
      }
      else{
        const livePl1 = battleState.player1Life
        const livePl2 = battleState.player2Life
        const damage = 5; 
        const newAtackerLife = livePl1 - damage;
        const newDefenderLife = livePl2 ;

        console.log("esquivo player2 con exito")
        setPlayer2Action('Dodge succsesful');

        
        
        setBattleState(prevState => ({
          ...prevState,
          [`${attacker}Life`]: newAtackerLife < 0 ? 0 : newAtackerLife,
          [`${defender}Life`]: newDefenderLife < 0 ? 0 : newDefenderLife,
        }));
      }
    }

    if(attacker === "player2" && defender === "player1"){
      const succesfuldodge = Math.random() < 0.5 ? 'ok' : 'fail'
      if(succesfuldodge === "fail"){
        const livePl1 = battleState.player1Life
        const livePl2 = battleState.player2Life
        const damage = 10; 
        const newAtackerLife = livePl2;
        const newDefenderLife = livePl1 - damage;
        
        setPlayer1Action('Dodge fail');

        setBattleState(prevState => ({
          ...prevState,
          [`${attacker}Life`]: newAtackerLife < 0 ? 0 : newAtackerLife,
          [`${defender}Life`]: newDefenderLife < 0 ? 0 : newDefenderLife,
        }));
      }
      else{
        const livePl1 = battleState.player1Life
        const livePl2 = battleState.player2Life
        const damage = 5; 
        const newAtackerLife = livePl2 - damage;
        const newDefenderLife = livePl1 ;

        setPlayer1Action('Dodge succesful');

        setBattleState(prevState => ({
          ...prevState,
          [`${attacker}Life`]: newAtackerLife < 0 ? 0 : newAtackerLife,
          [`${defender}Life`]: newDefenderLife < 0 ? 0 : newDefenderLife,
        }));
      }
    }
  };

  const handleNextRound = (action: string) => {
    const player1Action = action
    const player2Action = Math.random() < 0.5 ? 'attack' : 'dodge';

    if (player1Action === 'attack') {
      if (player2Action === 'attack') {
        
        handleAttack('player1', 'player2');
        setPlayer1Action('attack');
        handleAttack('player2', 'player1');
        setPlayer2Action('attack');
      } else {
        setPlayer1Action('attack');
        setPlayer2Action('dodge');
        handleDodge('player1', 'player2')
      }
    } 
    
    
    if (player2Action === 'attack'){
       if (player1Action === 'attack') {
        handleAttack('player1', 'player2');
        setPlayer1Action('attack');
        handleAttack('player2', 'player1');
        setPlayer2Action('attack');
      } else {
        setPlayer2Action('attack');
        setPlayer1Action('dodge');
        handleDodge('player2', 'player1')
      }
    }

    setBattleState(prevState => ({
      ...prevState,
      round: prevState.round + 1,
    }));
  };

  const handleBattleResult = () => {
    if (!battleEnded) {
      let winner: string | null = null;
  
      if (battleState.player1Life <= 0) {
        winner = 'Player 2';
      } else if (battleState.player2Life <= 0) {
        winner = 'Player 1';
        addWins(player2Pokemon!.id)
      }
  
      if (winner) {
        setBattleState(prevState => ({
          ...prevState,
          winner: winner,
        }));
        setBattleEnded(true);
      }
    }
  };

  useEffect(() => {
    handleBattleResult();
  }, [battleState, battleEnded]);


  return (
    <Layout title='Battle de Pokemons'>
      <div className='flex flex-col gap-3 items-center'>
        <div className='text-center text-3xl'>
          {battleState.winner && <h2>¡{battleState.winner} gana!</h2>}
        </div>
        
        <div className="flex gap-10 justify-center items-center h-screen ">
          <div>
            {player1Pokemon && (
              <div className='flex flex-col gap-3 '>   
                <div className=" rounded-lg  h-[300px] w-auto">
                  <h2 className="text-2xl font-bold text-red-500">Jugador 1</h2>
                  <p className="text-lg">Pokemon: {player1Pokemon.name}</p>
                  <Image
                    src={player1Pokemon.img}
                    alt={player1Pokemon.name}
                    height={200}
                    width={200}
                    className="mx-auto mt-4 min-h-[230px] max-h-[230px]"
                  />
                </div>
                <p>Vida: {battleState.player1Life}</p>
                <progress  className='w-full' value={battleState.player1Life} max={100}></progress>
                {player1Action && <p>Movimiento: {player1Action}</p>}
              </div>
            )}
          </div>
          

          <Image alt="pep" src="/imgs/vs.png" height={100} width={100}/>
          

          <div>
            {player2Pokemon && (
              <div className='flex flex-col gap-3 '>
                <div className=" rounded-lg h-[300px] w-auto">
                  <h2 className="text-2xl font-bold text-blue-500">CPU player</h2>
                  <p className="text-lg">Pokemon: {player2Pokemon.name}</p>
                  
                    <Image
                      src={player2Pokemon.img}
                      alt={player2Pokemon.name}
                      height={200}
                      width={200}
                      className="mx-auto mt-4 min-h-[230px] max-h-[230px]"
                    />
                </div>
                <p>Vida: {battleState.player2Life}</p>
                <progress className='w-full' value={battleState.player2Life} max={100}></progress>
                {player2Action && <p>Movimiento: {player2Action}</p>}
              </div>
            )}
          </div>
        </div> 

        <div className='items-center'>
          {!battleEnded && (
            <div className='flex flex-col gap-3  justify-center items-center'>
              <button className='rounded-md bg-red-500 w-[150px] h-[40px]' onClick={() => handleNextRound("attack")}>Atacar</button>
              <button className='rounded-md bg-gray-500 w-[150px] h-[40px]' onClick={() => handleNextRound("dodge")}>Esquivar</button>
            </div>
          )}

          {battleEnded && (
            <Link  href="/">
              <button className='rounded-md bg-red-500 w-[150px] h-[40px]'>Salir</button>
            </Link>
            
          )}
        </div>
      </div> 
        
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await pokeApi.get<PokemonListResponde>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));


  const pokemonDetailsPromises = pokemons.map(pokemon => getPokemonInfo(pokemon.id.toString()));
  const pokemonDetails = await Promise.all(pokemonDetailsPromises);

  
  const pokemonsWithDetails: SmallPokemon[] = pokemons.map((pokemon, index) => ({
    ...pokemon,
    details: pokemonDetails[index],
    vida: 100,
  }));

  return {
    props: {
      pokemons: pokemonsWithDetails
    },
    revalidate: 86400
  };
}

export default FightPage;