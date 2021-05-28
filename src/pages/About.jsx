
export function About() {
    const payments = ['MasterCard', 'Maestro', 'Visa', 'American Express', ' Diners Club']

    return (
        <div className="about">
            <p>We’ve made setting up an account quick and easy, so you can get your hands on the newest,
            and most exciting game deals in a matter of seconds. Redeeming your digital codes is simple –
            and we’re here to help if you need any extra help.
            We also know you want to make payments the way they suit you.
                That’s why we offer a wide range of payment options including:</p>
            <ul>
                {payments.map(payment => <li>{payment}</li>)}
            </ul>
        </div>
    )


}