import React from "react";
import { motion } from "framer-motion";
import { useUi } from "@/hooks/useUserInterface";
import { modalType } from "@/store/slices/ui.slice";

const CardDropdown = ({ task }) => {
  const { updateModal } = useUi();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-5 cursor-pointer right-0 bg-lightBlue/10 rounded-lg w-20 border border-lightBlue/10 z-10 shadow-md lexend-deca-font text-sm font-light"
      onClick={(e) => e.stopPropagation()}
    >
      <p
        onClick={() =>
          updateModal({
            type: modalType.CREATE_TASK,
            state: { task },
          })
        }
        className="px-3 py-1.5 hover:bg-lightBlue/10 transition-all duration-300"
      >
        Edit
      </p>
      <p
        onClick={() =>
          updateModal({
            type: modalType.DELETE,
            state: { task },
          })
        }
        className="px-3 py-1.5 hover:bg-lightBlue/10 transition-all duration-300"
      >
        Delete
      </p>
    </motion.div>
  );
};

export default CardDropdown;
