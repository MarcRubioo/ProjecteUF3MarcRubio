
import Image from 'next/image';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <div className='flex justify-between bg-gray-900 '>
      <div
        className="bg-gray-900 flex justify-between"
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          padding: '0px 20px',
        }}
      >
        <Link href="/" passHref>
          <Image
            className='h-[4.375rem] w-[4.375rem]' /* 70px*/
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Logo App"
            width={64}
            height={64}
          />
        </Link>
        
        <Link href='/' passHref>
            <span className="text-white text-3xl">P</span>
            <span className="text-white text-xl">okemon</span>
        </Link>
      </div>
      <div className='flex gap-4 justify-center items-center pr-5'>
        <Link className="ml-auto" href="/wins" passHref>
          <span className="text-white text-lg">Victorias</span>
        </Link>

        <Link className="ml-auto" href="/favorites" passHref>
          <span className="text-white text-lg">Favoritos</span>
        </Link>
      </div>
    </div>
  );
};

        