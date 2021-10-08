import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "./config";

import styles from "./SocialIcons.module.scss";

export default function SocialIcons() {
  return (
    <ul className={styles.list}>
      {config.map(({ title, url, icon }) => (
        <li key={uuidv4()}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className={clsx("btn btn-sm", styles.link)}
          >
            <span className="visually-hidden">{title}</span>
            <FontAwesomeIcon icon={icon} fixedWidth />
          </a>
        </li>
      ))}
    </ul>
  );
}
