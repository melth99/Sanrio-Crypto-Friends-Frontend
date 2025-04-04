

export default function About() {

    return (
        <>
            <div className="about">
                <h1> Welcome to CryptoHaven </h1>
    
    

                <div className="safety">
                <h3> Beware of Scammers!</h3>
                <p className="scam-warning">
                    If you believe you have been the victim of a cryptocurrency crime, please contact:
                </p>
                <ul class="safety-links">
                    {/*   the _blank makes the link create a new tab & noopner noreferrer is more secure to phishing */}
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://disb.dc.gov/page/you-invest-crypto-know-risks">DISB Enforcement and Consumer Protection Division</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.sec.gov/securities-topics/crypto-assets">US Securities and Exchange Commission</a></li>
                </ul>

            </div>
        </div >
        </>
    )
}