import { useState, useEffect } from 'react'

export function Button({ initVal }) {
    const [number, setNumber] = useState(initVal);
    const [valor, setValor] = useState('');

    useEffect(() => {
        setValor(number % 2 == 0 ? "Par" : "Ímpar");
    }, [number]);

    function incrementa() {
        setNumber((n) => n + 1);
    }

    return (
        <button onClick={incrementa}>
            <p>Hi: {number} ({valor})</p>
        </button>
    );
}
