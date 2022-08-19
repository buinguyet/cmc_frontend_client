import pfp from '../assets/mainGirl.jpg'

function ProfileComponent(props: any) {

    return (
        <div className='profile__card'>
          <div className='profile__card--info'>
            <img src={pfp} alt={pfp}/>
            <div className='profile__card--info-text'>
              <p>Report for</p>
              <h2>BUI NGUYET</h2>
            </div>
          </div>
          <div className='profile__card--type'>
            <ul>
              <li>Simple Dashboard</li>
            </ul>
          </div>
        </div>
      )
}

export default ProfileComponent;