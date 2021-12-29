import React from 'react'

import Calculator from './components/calculator/Calculator'

export default props => {

    return (
        <div>
            <h1 style={{ fontSize: '35pt', marginBottom: '3rem'}}>Calculadora</h1>
            <Calculator />
        </div>
    )
}