import { useState } from 'react';
import { FiSearch } from 'react-icons/fi' ;
import './style.css';
import api from './services/api';

function App() {

  const [input,setInput] = useState('');
  const [cep,setCep] = useState({});

  async function handleSearch(){

    if(input === ''){
      alert("Preencha algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
      
    }catch{
      alert("Erro na Busca")
      setInput("")
    }
  }
  
  return (
    <div className="container">
       <h1 className="title">Buscador CEP</h1>
       <div className="containerInput">
           <input
           type="text"
           placeholder="Digite seu CEP..."
           value={input}
           onChange={(e)=> setInput(e.target.value)}
           onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
           />
           <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/>
           </button>
       </div>

       {cep && Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            {cep.logradouro && <span>{cep.logradouro}</span>}
            {cep.complemento && <span>Complemento: {cep.complemento}</span>}
            {cep.bairro && <span>{cep.bairro}</span>}
            {cep.localidade && cep.uf && <span>{cep.localidade} - {cep.uf}</span>}
          </main>
        )}
       
    </div>
  );
}

export default App;
