const addWins = (id: number) => {
    let wins: number[] = JSON.parse(localStorage.getItem('wins') || '[]');
    wins.push(id);
    localStorage.setItem('wins', JSON.stringify(wins));
}

const existInWins = (id: number): boolean => {
    if (typeof window === 'undefined') return false;
    const wins: number[] = JSON.parse(localStorage.getItem('wins') || '[]');
    return wins.includes(id);
}

const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('wins') || '[]');
}

export default {
    existInWins,
    addWins,
    pokemons
}