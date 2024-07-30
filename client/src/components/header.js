import powerIMG from "../assets/power.png"
const Header = () => {
    const handleClick = async() => {
        const res = await fetch('http://100.65.12.151:3000/power')

        if (res.ok){
            console.log(res)
        }
    }
    return (
        <div className="w-full flex h-[17%] justify-center items-center">
            <button className="p-20px rounded-full bg-[#CF4848] px-20" onClick={() => handleClick()}><img className="w-20" src={powerIMG}></img></button>
        </div>
    )

}
export default Header;