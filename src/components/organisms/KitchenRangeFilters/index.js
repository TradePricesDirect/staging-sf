import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/pro-regular-svg-icons";
import paths from "core/paths";
import useDisclosure from "hooks/useDisclosure";
import { FILTERS } from "./utils";

import styles from "./KitchenRangeFilters.module.scss";

const KitchenRangeFilters = ({ filters, onFiltersChange }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(isDesktop);

  useEffect(() => {
    if (!isOpen && isDesktop) onOpen();
    if (isOpen && !isDesktop) onClose();
  }, [isDesktop]);

  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        <span>Filter by</span>
      </h2>

      <div className="row justify-content-between g-4 mb-4 d-xl-none">
        <div className="col-auto">
          <button onClick={onToggle} className="btn btn-sm btn-outline-primary">
            Filter by
            <FontAwesomeIcon
              icon={isOpen ? faMinus : faPlus}
              className="ms-2"
            />
          </button>
        </div>
        <div className="col-auto">
          <Link href={paths.requestQuote}>
            <a className="btn btn-sm btn-outline-secondary">
              Book Free Consultation
            </a>
          </Link>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            <div className={styles.grid}>
              {FILTERS.map(({ title, name, value, image }, index) => {
                const selected =
                  filters.hasOwnProperty(name) &&
                  filters[name].indexOf(value) > -1;

                return (
                  <button
                    key={`kitchen-range-filter-${index}`}
                    type="button"
                    onClick={() => onFiltersChange(name, value)}
                    className={clsx(
                      styles.tile,
                      selected && styles.selected,
                      !selected && hasFilters && styles.faded
                    )}
                  >
                    <Image
                      src={image}
                      alt={title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <h3 className={styles.label}>{title}</h3>
                    {selected && (
                      <span className={styles.closeIcon}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    )}
                  </button>
                );
              })}

              <Link href={paths.requestQuote}>
                <a
                  className={clsx(
                    styles.tile,
                    hasFilters && styles.faded,
                    "d-none d-xl-block"
                  )}
                >
                  <Image
                    src="/images/consultation-thumbnail.jpg"
                    alt=""
                    layout="fill"
                  />
                  <h3 className={styles.label}>Book Free Consultation</h3>
                </a>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KitchenRangeFilters;
