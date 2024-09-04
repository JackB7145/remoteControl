import powerIMG from "../assets/power.png"
const Header = ({socket}) => {
    const handleClick = async() => {
        socket.emit('power')
    }
    return (
        <div className="w-full flex h-[17%] justify-center items-center">
            <button className="p-20px rounded-full bg-[#4d68f6] px-20" onClick={() => handleClick()}><img className="w-20" src={powerIMG}></img></button>
        </div>
    )

}
export default Header;