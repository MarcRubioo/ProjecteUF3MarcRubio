import { FC } from "react";
import { FavoriteCardPokemon } from "./";

interface Props {
  pokemons: number[];
}

export const WinsPokemons: FC<Props> = ({ pokemons }) => {
  const uniquePokemons = Array.from(new Set(pokemons));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {uniquePokemons.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id} />
      ))}
    </div>
  );
};
