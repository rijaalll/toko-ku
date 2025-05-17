import Link from "next/link";

export default function LinkButtonIcon({url, icon, size}) {
    return (
        <Link className="p-2" href={url} >
            <span style={{fontSize: `${size}px`}} className={`${icon} bi`}></span>
        </Link>
    )
}