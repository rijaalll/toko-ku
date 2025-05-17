export default function ColorButton({color, colorState, setColorState, colorName}) {
    return (
        <button style={{backgroundColor: `${color}`}} onClick={() => setColorState(colorName)} className={`${colorState === colorName ? 'opacity-100 scale-100' : 'opacity-50 scale-70'} w-4 h-4 rounded-full duration-300 cursor-pointer`}></button>
    );
}