import React, { useState } from 'react'
import './Calculator.css'

import { Op } from '../data/array'

import Button from '../button/Button'
import Display from '../display/Display'


export default () => {

    const [valor, setValor] = useState([0, 0])
    const [display, setDisplay] = useState('0')
    const [clear, setClear] = useState(false)
    const [position, setPosition] = useState(0)
    const [operation, setOperation] = useState(null)

    function addNum(n) {
        if (n === '.' && display.includes('.')) {
            return
        }

        const valClear = display === '0' || clear
        const current = valClear ? '' : display
        const disVal = current + n

        setDisplay(disVal)
        setClear(false)

        if (n !== '.') {
            let i = position
            const newValue = parseFloat(disVal)
            const val = valor
            val[i] = newValue
            setValor(val)
        }
    }

    function setOp(n) {
        if (position === 0) {
            setOperation(n)
            setClear(true)
            setPosition(1)
            setDisplay('0')
        } else {
            const eq = operation === '='
            const currentOp = operation

            valor[0] = eval(`${valor[0]} ${currentOp} ${valor[1]}`)
            valor[1] = 0;

            setDisplay(valor[0])
            setOperation(eq ? null : operation)
            setPosition(eq ? 0 : 1)
            setClear(!eq)
            setValor(valor.toFixed(2))
        }

    }

    function clearMemory() {
        setValor([0, 0])
        setDisplay('0')
        setClear(false)
        setPosition(0)
        setOperation(null)
    }

    const btns = Op.map((Ops, i) => {
        let clicked = () => addNum(Ops)

        if (Ops === 'AC') {
            clicked = () => clearMemory()
        }
        else if (Ops === '=' || Ops === '+' || Ops === '-' || Ops === '/' || Ops === '*') { 
            clicked = () => setOp(Ops)
        }

        return (
            <Button click={ clicked } key={i} label={Ops} operator={Ops}/>
        )
    })

    return ( 
        <div className='calculator'>
            <Display value={display}/>
            {btns}
        </div>
    )
}