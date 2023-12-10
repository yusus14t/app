import img from "../../../assets.app/img/blog-grid/350x300-0.jpg";

function Detail() {
  return (
    <>
      <div className="box"></div>
      <div className="container  p-2 rounded mb-2 mt-4 text-justify d-flex">
        <div className="">
          <img
            className="rounded"
            style={{ height: "200px", width: "400px" }}
            src={img}
            alt=""
          />
        </div>
        <div className="mx-auto bg-dark p-2 rounded">
          <h2 className="text-disabled">
            <span className="disabled"> Name</span>: Yusuf Iqbal
          </h2>
        </div>
      </div>
    </>
  );
}

export default Detail;
