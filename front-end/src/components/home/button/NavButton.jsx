"use client";
export default function NavButton({title, url, height, setScrollY, fontSize}) {
    const scroll_To = (height) => {
        window.scrollTo({
            top: height,
            behavior: "smooth",
        });
    }

    return (
        <button onClick={() => scroll_To((height-100) * url)}>
            <p style={{fontSize: `${fontSize}px`}}>{title}</p>
        </button>
);}