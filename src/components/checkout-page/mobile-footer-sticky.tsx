export default function MobileFooterSticky({
  tourDetail,
  total,
  availabilityLoading,
  paxRoomMatch,
}: {
  tourDetail: any;
  total: any;
  availabilityLoading: any;
  paxRoomMatch: any;
}) {
  return (
    <div className="card card-body p-2 border-0 border-top rounded-0 fixed-bottom d-lg-none">
      <div className="row align-items-center">
        <div className="col-9">
          <span className="h6">{tourDetail.name}</span>
        </div>
        <div className="col-3 border-start text-center">
          <strong>Total</strong>
          {availabilityLoading || !paxRoomMatch ? (
            <h6 className="placeholder-glow text-centerplaceholder-glow m-0">
              <span className="placeholder placeholder-sm col-9"></span>
            </h6>
          ) : (
            <p className="m-0">{total}</p>
          )}
        </div>
      </div>
    </div>
  );
}
