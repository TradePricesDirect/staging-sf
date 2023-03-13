import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import styles from "./PromoGridTile.module.scss";
import { FC, useState } from "react";
import Button from "components/atoms/Button";
import Pill from "components/atoms/Pill/Pill";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import Link from "next/link";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import clsx from "clsx";
import categoryPath from "utils/categoryPath";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { icons } from "core/constants";

// const SuperHeader: FC<{
//   topRow: string;
//   bottomRow: string;
//   vertical?: boolean;
// }> = ({ topRow, bottomRow, vertical }) => (
//   <div className={`${styles.superHeader} ${vertical ? styles.vertical : ""}`}>
//     <div
//       className={`${styles.topRow}  ${vertical ? styles.vertical : ""}`}
//       data-content={topRow}
//     >
//       {[...Array(7)].map((_, i) => (
//         <h1
//           key={`super-header-top-${i}`}
//           className={`${i === 3 ? styles.secondaryColor : ""} ${
//             vertical ? styles.vertical : ""
//           }`}
//         >
//           {topRow}
//         </h1>
//       ))}
//     </div>
//     {!vertical && (
//       <div className={styles.bottomRow} data-content={bottomRow}>
//         {[...Array(7)].map((_, i) => (
//           <h1
//             key={`super-header-top-${i}`}
//             className={i === 3 ? styles.secondaryColor : ""}
//           >
//             {bottomRow}
//           </h1>
//         ))}
//       </div>
//     )}
//   </div>
// );

const PromoGridTile: FC<{
  blok: {
    // carousel?: boolean;
    // superHeader?: {
    //   topRow: string;
    //   bottomRow: string;
    // };
    header?: string;
    centerHeader?: boolean;
    subHeader?: string;
    // button?: {
    //   path: string;
    //   label: string;
    //   icon?: IconDefinition;
    // };
    path?: string;
    buttonLabel?: string;
    buttonIcon?: IconDefinition;
    col?: number;
    row?: number;
    pillText?: string;
    image: any;
    invertHeaderColor?: boolean;
    largeText?: boolean;
  };
}> = ({ blok }) => {
  const {
    // carousel,
    // superHeader,
    header,
    centerHeader,
    subHeader,
    path,
    buttonLabel,
    buttonIcon,
    col,
    row,
    pillText,
    image,
    invertHeaderColor,
    largeText,
  } = blok;

  const { user } = useAuth();
  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const innerContent = (
    <>
      {image && <Image src={image.filename} alt={image.alt} fill />}

      {/* {centerHeader && superHeader && <SuperHeader {...superHeader} />} */}
      <div
        className={clsx(
          styles.content,
          centerHeader ? styles.centerHeader : "",
          invertHeaderColor ? styles.invertHeader : ""
        )}
      >
        {/* {centerHeader ? (
          <h3>{header}</h3>
        ) : ( */}
        <div className={clsx(styles.header, largeText ? styles.large : "")}>
          <h4>{header}</h4>
          <p>{subHeader}</p>
        </div>
        {/* )} */}

        {buttonLabel && (
          <div className={styles.button}>
            <Button
              label={buttonLabel}
              icon={buttonIcon || icons.faArrowRight}
              // color={"white"}
              hover={hover}
            />
          </div>
        )}
      </div>
      {/* {!centerHeader && superHeader && (
        <SuperHeader {...superHeader} vertical />
      )} */}
      {pillText && (
        <div className={styles.promoPill}>
          <Pill text={pillText} />
        </div>
      )}
    </>
  );

  const gridColumnStyle = isMobile || isTablet ? `span 1` : `span ${col}`;

  return (
    <>
      {path ? (
        <Link
          {...storyblokEditable(blok)}
          href={user ? path : paths.register}
          className={styles.container}
          style={{
            gridColumn: gridColumnStyle,
            gridRow: `span ${row}`,
          }}
          {...eventHandlers}
        >
          {innerContent}
        </Link>
      ) : (
        <div
          {...storyblokEditable(blok)}
          className={styles.container}
          style={{
            gridColumn: gridColumnStyle,
            gridRow: `span ${row}`,
          }}
        >
          {innerContent}
        </div>
      )}
    </>
  );
};

export default PromoGridTile;
