"use client";

export default function NavButton({title, url}) {
    const scroll_To = (height) => {
        window.scrollTo({
            top: height,
            behavior: "smooth",
        });
    }

    return (
        <button onClick={() => scroll_To(url)}>
            <p>{title}</p>
        </button>
);}