import { IData } from "./types";

interface IStatusComponent {
    item: IData,
    index: number,
}

function StatusComponent(props: IStatusComponent) {
    const { index, item } = props;

    return (
        <div key={index} className='status__item' style={{
            backgroundColor: item.color
        }}>
            <div className='status__item--image' >

            </div>
            <div className='status__item--info'>
                <div className='status__item--info-title'>
                    <h3>{item.label}</h3>
                    <p>...</p>
                </div>
                <h2>{item.value} clicks</h2>
            </div>
        </div>
    );
}

export default StatusComponent;