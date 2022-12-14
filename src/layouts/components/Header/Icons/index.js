import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasHeart,
  faShoppingBasket as fasShoppingBasket,
  faUser as fasUser,
  faBars as fasBars,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faHeart as falHeart,
  faShoppingBasket as falShoppingBasket,
  faUser as falUser,
  faBars as falBars,
} from "@fortawesome/pro-light-svg-icons";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./Icons.module.scss";

const Icons = () => {
  return (
    <ul className={styles.list}>
      <li>
        <IconLink
          href="/account"
          title="Account"
          icon={falUser}
          hover={fasUser}
        />
      </li>

      <li>
        <IconLink
          href="/lists"
          title="Lists"
          icon={falHeart}
          hover={fasHeart}
        />
      </li>

      <li>
        <IconCart
          title="Basket"
          icon={falShoppingBasket}
          hover={fasShoppingBasket}
        />
      </li>

      <li className={styles["menu-list-item"]}>
        <IconMenu title="Menu" icon={falBars} hover={fasBars} />
      </li>
    </ul>
  );
};

export default Icons;

function IconLink(props) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={props.href} className={clsx("btn btn-sm", styles.link)}
      title={props.title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={hover ? props.hover : props.icon} fixedWidth />
        <span className="visually-hidden">{props.title}</span>
      </div>
    </Link>
  );
}

function IconCart(props) {
  const { items = [] } = useCart();

  const cartItemsQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const overlay = useOverlay();

  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className={clsx("btn btn-sm", styles.link)}
      title={props.title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => overlay.show("cart")}
    >
      <div className={styles.icon}>
        <FontAwesomeIcon icon={hover ? props.hover : props.icon} fixedWidth />

        {cartItemsQuantity > 0 && (
          <div className={styles.badge}>
            {cartItemsQuantity}
            <span className="visually-hidden">{props.title} Count</span>
          </div>
        )}
      </div>

      <div className={styles.label}>{props.title}</div>
    </button>
  );
}

function IconMenu(props) {
  const overlay = useOverlay();

  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className={clsx("btn btn-sm", styles.link)}
      aria-controls="site-menu"
      title={props.title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => overlay.show("menu")}
    >
      <div className={styles.icon}>
        <FontAwesomeIcon icon={hover ? props.hover : props.icon} fixedWidth />
      </div>
      <span className="visually-hidden">{props.title}</span>
    </button>
  );
}
