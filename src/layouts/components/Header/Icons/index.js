import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { useOverlay } from "contexts/OverlayContext";
import styles from "./Icons.module.scss";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";


const Icons = () => {
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  return (
    <ul className={styles.list}>
      <li>
        <IconLink
          href="/account"
          title="Account"
          icon={icons.faUser}
          hover={icons.faUser}
        />
      </li>

      <li>
        <IconLink
          href="/lists"
          title="Lists"
          icon={icons.faHeart}
          hover={icons.faHeart}
        />
      </li>

      <li>
        <IconCart
          title="Basket"
          icon={icons.faShoppingBasket}
          hover={icons.faShoppingBasket}
        />
      </li>

      {(isTablet || isMobile) && <li>
        <IconMenu title="Menu" icon={icons.faBars} hover={icons.faBars} />
      </li>}

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

  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

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
      {!isTablet && !isMobile && <div className={styles.label}>{props.title}</div>}

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
