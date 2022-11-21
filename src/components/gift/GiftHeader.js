import { useNavigate } from "react-router-dom";

function GiftHeader({ className, step, product }) {
  const navigate = useNavigate();

  let stepClassName1 = "step active";
  let stepClassName2 = "step";
  let stepClassName3 = "step";
  let progressClassName1 = "progress";
  let progressClassName2 = "progress";

  if (className === "for") {
    stepClassName1 = "step active";
  } else if (className === "how") {
    stepClassName1 = "step past";
    stepClassName2 = "step active";
    progressClassName1 = "progress full";
  } else if (className === "pay") {
    stepClassName1 = "step past";
    stepClassName2 = "step past";
    stepClassName3 = "step active";
    progressClassName1 = "progress full";
    progressClassName2 = "progress full";
  }

  return (
    <div className="giftHead">
      <div>
        <div className="giftBack">
          {step && (
            <div
              className="giftBackBtn"
              onClick={() =>
                navigate((step !== "1" && `/gift/${step - 1}`) || "..", {
                  state: { product },
                })
              }
            >
              חזור
            </div>
          )}
        </div>
        <div className="giftHeaderDiv">
          <div className="giftHeader">רכישת מתנה</div>
        </div>
      </div>
      <div className="steps">
        <div className={stepClassName1}>
          <div className="label bottom-xs">למי?</div>
          <div className="circle" data-ember-action="2858">
            <div className="number">1</div>
          </div>
        </div>
        <div className={progressClassName1}>
          <span className="fill"></span>
        </div>
        <div className={stepClassName2}>
          <div className="label bottom-xs">איך?</div>
          <div className="circle disabled" data-ember-action="2860">
            <div className="number">2</div>
          </div>
        </div>

        <div className={progressClassName2}>
          <span className="fill"></span>
        </div>
        <div className={stepClassName3}>
          <div className="label bottom-xs">תשלום</div>
          <div className="circle disabled" data-ember-action="2862">
            <div className="number">3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftHeader;
