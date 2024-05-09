import { SmallPokemon } from "@/interfaces"
import { Card, CardBody, CardFooter } from "@nextui-org/react"
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react"

interface Props{
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({pokemon:{id, img, name}}) => {

    const router = useRouter();

    const onClick = ()=>{
        router.push(`/name/${ name }`);
    }

  return (
    <div className="grid aspect-square">
    <Card isHoverable isPressable onClick={onClick} className="p-2 flex">
        <CardBody>
            <Image src={img} alt={name} width={140} height={140} className='aspect-square w-full h-full' />
        </CardBody>

        <CardFooter className='flex justify-between'>
            <span className='capitalize'>{name}</span>
            <span>#{id}</span>
        </CardFooter>

    </Card>
    </div>

  )
}
