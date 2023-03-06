import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCripto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 80px;
  font-size: 34px;

  &::after{
    content: "";
    width:100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {

      const { criptoMoneda, moneda } = monedas;

      const cotizarCripto = async () => {
        try {
          setCargando(true);
          setResultado({})
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`

          const res = await fetch(url);
          const data = await res.json();

          setResultado(data.DISPLAY[criptoMoneda][moneda])
        } catch (error) {
          console.log(error);
        } finally {
          setCargando(false)
        }
      }

      cotizarCripto()
    }
  }, [monedas])


  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="Imagen cripto" />
        <div>
          <Heading>cotiza criptomonedas al instante</Heading>
          <Formulario setMonedas={setMonedas} />
          {cargando && <Spinner />}
          {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
    </>
  );
}

export default App;
