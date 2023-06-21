import internet_surveillance from "../../img/internet_surveillance.jpeg"
import helicopter_parents from "../../img/helicopter_parents.jpeg"
import usps from "../../img/usps.jpeg"
import email from "../../img/emails.jpeg"

export default function Intro() {

  return (
    <div className="intro">
      <div className="grid">
        <div className="box">
          <h1>
            Are you afraid of internet surveillance?
          </h1>
          <img
            src={internet_surveillance}
            alt="I'm sorry"
          />
        </div>

        <div className="box">
          <h1>
            Are you afraid of your helicoptering parents?
          </h1>
          <img
            src={helicopter_parents}
            alt="I'm even more sorry"
          />
        </div >

        <div className="box">
          <h1>
            Is the cornerstone of America's economy failing you?
          </h1>

          <img
            src={usps}
            alt="I'm really really sorry"
          />
        </div>

        <div className="box">
          <h1>
            Are you only using online mailing for work or talking to your grandparents?
          </h1>

          <img
            className="email"
            src={email}
            alt="I'm really really sorry"
          />
        </div>
      </div>
    </div>
  )
}