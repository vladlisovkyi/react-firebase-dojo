import "./Avatar.css";

export default function Avatar({ src, className }) {
  return (
    <div className={`avatar ml-auto ${className}`}>
      <img src={src} alt="user avatar" />
    </div>
  );
}
