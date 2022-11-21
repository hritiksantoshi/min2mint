import React from "react";
import { Modal } from "react-bootstrap";
import { useModal } from "../../../../utils/ModelContext";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
function LoaderModal() {
    const { loading } = useModal();
  return (
    <Modal show={loading} centered size="sm">
        <LoadingOverlay
          active={loading}
          spinner={<BeatLoader color={"#36d7b7"} size={20} />} >    
        </LoadingOverlay>
    </Modal>
  );
}

export default LoaderModal;
