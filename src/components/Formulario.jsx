import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas"
import Error from './Error'
import { monedas } from "../data/monedas"
import { useEffect, useState } from "react"

const InputSubmit = styled.input`
    width: 100%;
    padding: 10px;
    color: #fff;
    text-transform: uppercase;
    background-color: #9497ff;
    font-weight: 700;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;

    }

`

const Formulario = ({ setMonedas }) => {

  const [cripto, setCripto] = useState([])
  const [error, setError] = useState(false)
  const [moneda, SelectMonedas] = useSelectMonedas("Selecciona tu moneda", monedas)
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas("Selecciona tu Criptomoneda", cripto)

  useEffect(() => {
    const obtenerCripto = async () => {
      try {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const res = await fetch(url);
        const data = await res.json()

        const arrayCripto = data.Data.map(cripto => {

          const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName,
          }
          return objeto;
        })

        setCripto(arrayCripto)

      } catch (error) {
        console.log(error);
      }
    }

    obtenerCripto()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptoMoneda].includes('')) {
      setError(true);
      return
    }

    setError(false)
    setMonedas(
      {
        moneda,
        criptoMoneda
      }
    )
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMoneda />
        <InputSubmit type={"submit"} value={"cotizar"} />
      </form>
    </>
  )
}

export default Formulario