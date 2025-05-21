import irctc_logo from '/assets/irctc logo.png'
import tourism_logo from '/assets/irctc toursim logo.png'
import './css/Navbar.css'

function Navbar(){
    return(
        <nav className="navbar">
            <div className="navabr-left">
                <img src={tourism_logo} alt="irctc logo" className="logo"/>
                <p><span className="brand-name">आईआरसीटीसी पर्यटन</span></p>
            </div>

            <div className="navabr-right">
                <button className="earn-rewards">Earn Rewards</button>
                <a href="#" className="nav-link">Contact US</a>
                <a href="#" className="nav-link">Login</a>
                <img src={irctc_logo} alt="IRCTC" className="irctc-logo"/>
            </div>
        </nav>
    )
}

export default Navbar