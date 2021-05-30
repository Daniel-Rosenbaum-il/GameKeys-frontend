import aboutImg from '../assets/img/about-800x533.jpg'
import mainImg from '../assets/img/about2-800x533.jpg'
export function About() {
    const payments = ['MasterCard', 'Maestro', 'Visa', 'American Express', ' Diners Club', 'Sofort', 'Skrill', 'Alipay', 'Giropay', 'Neteller', 'Bitcoin']

    return (
        <div className="about container">
            <p>Here at GameKeys.com, we specialise in providing you with the best digital
            codes for the hottest games. There’s no need to pay full price or
            wait for a game again. We combine the lowest prices with rapid
            digital delivery, so you can start playing your favourite games, fast.
            CDKeys.com has over 20 years of combined industry experience.
            We’ve taken our passion for games and created a truly innovative service
            that puts gamers first.
            </p>
            <div className="about-img flex justify-center mb-20">
                <img src={mainImg} alt="" />
            </div>

            <p>We’ve made setting up an account quick and easy, so you can get your hands on the newest,
            and most exciting game deals in a matter of seconds. Redeeming your digital codes is simple –
            and we’re here to help if you need any extra help.
            We also know you want to make payments the way they suit you.
                That’s why we offer a wide range of payment options including:</p>
            <ul>
                {payments.map((payment, idx) => <li key={idx}>{payment}</li>)}
            </ul>
            {/* <div className="about-img flex justify-center">
                <img src={aboutImg} alt="" />
            </div> */}
        </div>
    )


}