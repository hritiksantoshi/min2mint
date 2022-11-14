import React from "react";
import { Modal } from "react-bootstrap";
import { useModal } from "../../../../utils/ModelContext";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
function LoaderModal() {
    const { loading } = useModal();
  return (
    <Modal show={loading} centered size="sm">
        <LoadingOverlay
          active={loading}
          spinner={<FadeLoader color={"#ffffff"} />}
          text="Loading..."
        >
          
        </LoadingOverlay>
    </Modal>
  );
}

export default LoaderModal;
