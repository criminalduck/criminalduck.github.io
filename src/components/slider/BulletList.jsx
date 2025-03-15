export default function BulletList({ totalSlides, currentIndex, onBulletClick }) {
    return (
        <ul className="bullet-list">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <li
                    key={index}
                    className={`bullet ${index === currentIndex ? "active" : ""}`}
                    onClick={() => onBulletClick(index)}
                />
            ))}
        </ul>
    );
}