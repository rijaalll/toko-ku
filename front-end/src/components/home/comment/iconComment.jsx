export default function IconComment({iconTitle, iconClass, fontSize, iconSize}) {
    return (
        <div className="w-auto h-auto p-3">
            <div className="w-auto h-auto flex flex-col items-center">
                <div className="py-2 px-3 border-[1px] border-black/70 rounded-2xl">
                    <span style={{ fontSize: `${iconSize}px` }} className={`${iconClass} bi`}></span>
                </div>
                <div className="text-center">
                    <p style={{ fontSize: `${fontSize}px` }}>{iconTitle}</p>
                </div>
            </div>
        </div>
    );
}