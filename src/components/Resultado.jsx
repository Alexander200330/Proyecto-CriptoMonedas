import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: #FFF;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
`;
const Texto = styled.p`
    font-size: 20px
`;

const Precio = styled.p`
    font-size: 26px;
    span {
        font-weight: 700
    }
`;

const Imagen = styled.img`
    display: block;
    width: 110px;
    height: 110px;
`;


const Resultado = ({ resultado }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado;
    const url = `https://cryptocompare.com/${IMAGEURL}`;
    return (
        <Contenedor>
        <Imagen src={url} alt="imagen cripto" />
            <div>
                <Precio>El precio es de <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más alto del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Resultado