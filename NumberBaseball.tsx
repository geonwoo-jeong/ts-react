import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import Try from './Try'

const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const array = []

    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0]        
        array.push(chosen)
    }

    return array
}

interface TryInfo {
    try: string
    result: string
}

const NumberBaseball = () => {
    const [answer, setAnswer] = useState(getNumbers())
    const [value, setValue] = useState('')
    const [result, setResult] = useState('')
    const [tries, setTries] = useState<TryInfo[]>([])
    const inputEl = useRef<HTMLInputElement>(null)

    const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
        e.preventDefault()
        const input = inputEl.current
        if (value === answer.join('')) {
            setTries((t) => ([
                ...t,
                {
                    try: value,
                    result: 'Homerun!'
                }
            ]))
            setResult('Homerun!')
            alert('Game Restart')
            setValue('')
            setAnswer(getNumbers())
            setTries([])
            if (input) {
                input.focus()
            }
        } else {
            const answerArray = value.split('').map((value) => parseInt(value))
            let strike = 0
            let ball = 0
            if (tries.length >= 9) {
                setResult(`10번을 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)
                alert('게임을 다시 시작합니다')
                setValue('')
                setAnswer(getNumbers())
                setTries([])
                if (input) {
                    input.focus()
                }
            } else {
                console.log(`Answer is ${answer.join('')}`)
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log(`strike ${answerArray[i]}, ${answer[i]}`)
                        strike += 1
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]))
                        ball += 1
                    }
                }                
            }
        }
    }, [])

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button>Input</button>
            </form>
            <div>Challenge : {tries.length}</div>
            <ul>
                {tries.map(value, index) => (
                    <Try key={`${index + 1}차 시도: ${value.key}`} tryInfo={value} />
                })}                
            </ul>
        </>
    )
}

export default getNumbers;