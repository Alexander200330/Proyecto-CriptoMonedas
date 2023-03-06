import styled from '@emotion/styled'

const Div = styled.div`
    padding:15px;
    text-align: center;
    color: #FFF;
    background-color: #ff1241;
    font-family: Lato, sans-serif;
    font-size: 17px;
    font-weight: 700;
    border-radius: 12px;
    text-transform: uppercase;
`

const Error = ({children}) => {
  return (
    <Div>
        {children}
    </Div>
  )
}

export default Error