type AcknowledgementProps = {};

const Acknowledgement = (props: AcknowledgementProps) => {
  return (
    <div style={{ fontSize: 14 }}>
      Adapted from Statistics Canada, Census Explorer , 2021. This does not
      constitute an endorsement by Statistics Canada of this product.
      <br />
      Data provided by Statistics Canada has been modified for use in this
      project.
      <br />
      <a
        style={{ fontSize: 12 }}
        href="https://www.statcan.gc.ca/en/reference/licence"
      >
        View the licence
      </a>
    </div>
  );
};

export default Acknowledgement;
