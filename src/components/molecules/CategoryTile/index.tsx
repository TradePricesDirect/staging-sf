import Link from "next/link";
import clsx from "clsx";
import styles from "./CategoryTile.module.scss";
import Button from "components/atoms/Button";
import { FC, useState } from "react";
import Image from "next/image";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";

const CategoryTile: FC<{
  name: string;
  href?: string;
  image?: any;
  logo?: any;
  onClick?: any;
  className?: string;
  icon?: IconDefinition;
  useBackgroundImage?: boolean;
  selected?: boolean;
}> = ({ name, href, image, logo, onClick, className, icon, useBackgroundImage, selected }) => {
  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (!image) {
    image = {
      url: "/images/placeholder-thumbnail.png",
      alt: "placeholder",
    };
  }

  const BackgroundImageTile = () => {
    return (
      href ? (
        <Link
          href={href}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: selected
              ? `linear-gradient(0deg, rgb(38 88 232 / 40%), rgb(38 88 232 / 40%)), url(${image.url})`
              : `url(${image.url})`,
          }}
          className={clsx(styles.card, logo ? styles.logo : null)}
          onClick={onClick}
          {...eventHandlers}
        >
            <div className={styles.image}>
            </div>
          <div className={styles.content}>
            <Button label={name} hover={hover} />
          </div>
        </Link>
      ) : (
        <button
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: selected
                  ? `linear-gradient(0deg, rgb(38 88 232 / 40%), rgb(38 88 232 / 40%)), url(${image.url})`
                  : `url(${image.url})`
          }}
          className={clsx(styles.card, logo ? styles.logo : null)}
          onClick={onClick}
          {...eventHandlers}
        >
          <div className={styles.buttonFlex}>
              <div className={styles.image}>
              </div>
            <div className={styles.content}>
              <Button label={name} hover={hover} />
            </div>
          </div>
        </button>
      )
    )
  }

  const ImageTile = () => {
    return (
      href ? (
        <Link
          href={href}
          className={clsx(styles.card, logo ? styles.logo : null)}
          onClick={onClick}
          {...eventHandlers}
        >
          {image ? (
            <div className={styles.image}>
              <Image src={image.url} alt={image.alt} fill loading="eager" />
            </div>
          ) : (
            <div className={styles.icon}>
              <FontAwesomeIcon icon={icon || icons.faArrowRight} />
            </div>
          )}

          <div className={styles.content}>
            <Button label={name} hover={hover} />
          </div>
        </Link>
      ) : (
        <button
          className={clsx(styles.card, logo ? styles.logo : null)}
          onClick={onClick}
          {...eventHandlers}
        >
          <div className={styles.buttonFlex}>
            { image ? (
              <div className={styles.image}>
                <Image src={image.url} alt={image.alt} fill loading="eager" />
              </div>
            ) : (
              <div className={styles.icon}>
                <FontAwesomeIcon icon={icon || icons.faArrowRight} />
              </div>
            )}
            <div className={styles.content}>
              <Button label={name} hover={hover} />
            </div>
          </div>
        </button>
      )
    )
  }

  return (
    <div className={clsx(styles.container, className)}>
      {useBackgroundImage ? (
        <BackgroundImageTile/>
      ):(
        <ImageTile/>
      )}
    </div>
  );
};

export default CategoryTile;
