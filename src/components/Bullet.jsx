export default function Bullet({ isActive, onClick }) {
    return (
        <li className={`bullet ${isActive ? "is-active" : ""}`} onClick={onClick}></li>
    );
}