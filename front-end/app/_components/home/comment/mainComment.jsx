export default function MainComment({ text, top, right, star, fontSize, bottom }) {
    const positionStyle = { right: `${right}rem` };

    if (top > 0) {
        positionStyle.top = `${top}%`;
    } else if (bottom > 0) {
        positionStyle.bottom = `${bottom}%`;
    }

    return (
        <div style={positionStyle} className="bg-white p-3 rounded-xl absolute shadow-lg shadow-black/30 z-[3]">
            <div className="flex flex-col items-center">
                <p style={{ fontSize: `${fontSize}px` }}>{text}</p>
                {star > 0 && (
                    <div className="flex flex-row">
                        {[...Array(star)].map((_, index) => (
                            <span key={index} style={{ fontSize: `${fontSize}px` }} className="bi bi-star-fill text-yellow-400"></span>
                        ))}
                        {[...Array(5 - star)].map((_, index) => (
                            <span key={index} style={{ fontSize: `${fontSize}px` }} className="bi bi-star text-yellow-400"></span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
