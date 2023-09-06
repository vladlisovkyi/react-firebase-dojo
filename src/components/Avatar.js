// styles
import './Avatar.css'

export default function Avatar({ src }) {
  return (
    <div className="avatar ml-auto">
      <img src={src} alt="user avatar" />
    </div>
  )
}
