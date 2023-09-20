import { StyledCard } from '../styles/Card.styled'
type item = {
     [key: string]: string | number|any ;
   id:number;
    title: string;
    body: string;
    image: string;
  }
  const Card: React.FunctionComponent<item> = (props:item) => {


  return (
    <StyledCard layout={props.id % 2 === 0 && 'row-reverse'}>
      <div>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
      </div>

      <div>
        <img src={`${props.image}`} alt='' />
      </div>
    </StyledCard>
  )
}
export default  Card