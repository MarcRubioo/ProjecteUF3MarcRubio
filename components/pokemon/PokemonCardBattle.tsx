import { SmallPokemon } from "@/interfaces";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";

interface Props {
  pokemon: SmallPokemon;
  onSelect: (id: number) => void;
  isSelected: boolean;
  player: string; 
}

export const PokemonCardBattle: FC<Props> = ({ pokemon: { id, img, name }, onSelect, isSelected, player }) => {
  const onClick = () => {
    onSelect(id);
  };

  const cardColor = player === 'player1' ? 'bg-red-500' : 'bg-blue-500'; 

  return (
    <div className="grid aspect-square">
      <Card
        isHoverable
        isPressable
        onClick={onClick}
        className={`p-2 flex ${isSelected ? cardColor : ''}`}
        style={isSelected ? { pointerEvents: 'none' } : undefined}
      >
        <CardBody>
          <Image src={img} alt={name} width={140} height={140} className='aspect-square w-full h-full' />
        </CardBody>

        <CardFooter className='flex justify-between'>
          <span className='capitalize'>{name}</span>
          <span>#{id}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

