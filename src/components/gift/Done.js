import "./Done.css";
import gift from "../../assets/images/giftcard.jpg";

function Done() {
  return (
    <div className="done">
      <img src={gift} alt="giftImg" />
      <h1>המתנה נרכשה בהצלחה!</h1>
    </div>
  );
}

export default Done;
