import React from "react";
import { modalType } from "@/store/slices/ui.slice";
import CreateTaskModal from "./createTaskModal";
import Modal from "./modalContainer";
import { useUi } from "@/hooks/useUserInterface";
import Notification from "./notification";

const ModalWrapper = () => {
  const { modal } = useUi();

  const AllModal = {
    [modalType.NONE]: <></>,
    [modalType.CREATE_TASK]: <CreateTaskModal />,
    [modalType.NOTIFICATION]: <Notification />,
  };

  return <>{modal && <Modal>{AllModal[modal]}</Modal>}</>;
};

export default ModalWrapper;
