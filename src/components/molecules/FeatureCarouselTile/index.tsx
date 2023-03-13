import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./FeatureCarouselTile.module.scss";
import Button from "components/atoms/Button";
import { FC } from "react";
import { featureIcons, icons } from "core/constants";
import clsx from "clsx";

import { storyblokEditable } from "@storyblok/react";

const FeatureCarouselTile: FC<{
  blok: {
    image?: any;
    video?: any;
    header?: string;
    body?: string;
    features?: string[];
    button?: any;
    path: string;
    brandName: string;
    _uid: string;
  };
}> = ({ blok }) => {
  const {
    image,
    video,
    header,
    body = "",
    features,
    button,
    path,
    brandName,
    _uid,
  } = blok;
  // const { ref, inView } = useInView({ threshold: 0.1 });
  const paragraphs = body.split("\n");

  return (
    <section
      {...storyblokEditable(blok)}
      /* ref={ref} */ className={styles.wrap}
    >
      <div className="row ">
        <div className={clsx("col-md p-0", styles.mediaContainer)}>
          {!video && image.filename && (
            <Image src={image.filename} alt={image.alt} fill />
          )}
          {video && (
            /* inView && */ <iframe
              src={video}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className="col-md p-0">
          <div className={styles.content}>
            <h6>{"Featured Product"}</h6>
            <h2>{header}</h2>
            {paragraphs.map((paragraph, index) => (
              <p key={`${_uid}-bodyp-${index}`}>{paragraph}</p>
            ))}

            {features && (
              <ul className={styles.icons}>
                {features.map((feature) => (
                  <li key={`${_uid}-${feature}`}>
                    <FontAwesomeIcon
                      icon={featureIcons[feature].icon}
                      size="2x"
                      style={{ color: featureIcons[feature].color }}
                    />
                    <div>{featureIcons[feature].label}</div>
                  </li>
                ))}
              </ul>
            )}

            <Button
              path={path}
              label={`Shop ${brandName}`}
              icon={icons.faArrowRight}
            />
            {/* <Link href={path} className="btn btn-outline-primary">
              {`Shop ${brandName}`}
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarouselTile;
