import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./CopyLink.module.scss";

const CopyLink = () => {
  const [copied, setCopied] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    let timer;

    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ref.current.value);
    setCopied(true);
  };

  const handleFocus = (e) => e.target.select();

  return (
    <div className={styles.inputGroup}>
      <input
        ref={ref}
        type="text"
        readOnly
        defaultValue={window.location.href}
        className={clsx("form-control", styles.input)}
        onFocus={handleFocus}
      />
      <button
        onClick={handleCopyLink}
        type="button"
        className={clsx(
          "btn btn-primary",
          styles.button,
          copied && styles.copied
        )}
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default CopyLink;
