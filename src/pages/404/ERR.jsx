import React from 'react'
import { Link } from 'react-router-dom'


const ERR = () => {
  return (
    <div className='NFERR'>ERRO 404 <br />
        <Link to="/"><button>Voltar</button></Link>
    </div> 
  )
}

export default ERR