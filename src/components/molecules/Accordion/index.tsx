import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDisclosure from "hooks/useDisclosure";
import styles from "./Accordion.module.scss";
import { FC } from "react";
import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import { icons } from "core/constants";

const Accordion: FC<{
  blok?: {
    open?: boolean;
    header: string;
    body: string;
  };
  open?: boolean;
  header?: string;
  body?: string;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;
  const { header, body, open } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};
  const { isOpen, onToggle } = useDisclosure(open);

  return (
    <div className={styles.wrap} {...storyblokEditableProps}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen ? "true" : "false"}
          className={styles.heading}
        >
          {header}
          <FontAwesomeIcon
            icon={isOpen ? icons.faMinus : icons.faPlus}
            className={styles.icon}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className={styles.body}>{render(body)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
