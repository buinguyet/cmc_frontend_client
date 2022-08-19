import type { IData } from "./types";

interface StateComponentInterface extends IData {
  handleClickColor: (data: IData) => void,
}

function StatusComponent(props: StateComponentInterface) {
  const {handleClickColor, ...colorState}= props;

  
  return (
    <div className='status__item' style={{
      backgroundColor: colorState.color
    }}>
        <div className='status__item--image' >
        </div>
        <div className='status__item--info' onClick={()=> handleClickColor(colorState)}>
            <div className='status__item--info-title'>
                <h3>{colorState.label}</h3>
                <p>...</p>
            </div>
            <h3>{colorState.value} clicks</h3>
            <p>Click me!</p>
        </div>
    </div>
  )
}

export default StatusComponent;