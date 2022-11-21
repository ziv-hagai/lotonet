import OnlyEventsList from "./OnlyEventsList";

const MallAbout = ({ arr, header }) => {
  return (
    <div className="featured-product">
      <div className="module-heading">
        <div className="row align-items-center">
          <div className="col-12">
            <h6 className="module-heading__title">{header}</h6>
          </div>
        </div>
      </div>
      <div className="allCategory">
        <OnlyEventsList
          slider={true}
          categories={arr}
          divClassName="featuredProduct-box"
          h5ClassName="featuredProduct-box__title"
        />
      </div>
    </div>
  );
};

export default MallAbout;
