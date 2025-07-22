import ConfirmationPopup from "@/components/ConfirmationPopup";
import Modal from "@/components/sharedcomponents/Modal";
import SuccessPopup from "@/components/SuccessPopup";

export default function popupPage() {
  return (
    <div>
      <Modal>
        <ConfirmationPopup />
      </Modal>
    </div>
  );
}
