import Image from "next/image";
// import FeaturedQuooker from "components/molecules/FeaturedQuooker";
// import FeatureCarousel from "components/organisms/FeatureCarousel";

import styles from "./QuookerContent.module.scss";

const QuookerContent = () => {
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <div className={styles.image}>
              <h3>Flex</h3>
              <Image
                src="/images/quooker-flex-hose.jpg"
                alt="Quooker Flex"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <ul>
              <li>
                Cold, hot and boiling water from one tap, with flexible pull-out
                hose for extra reach in the sink.
              </li>
              <li>
                Also chilled sparkling water when you combine your Quooker with
                a CUBE.
              </li>
              <li>Available in 3 finishes</li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className={styles.image}>
              <h3>Flex</h3>
              <Image
                src="/images/quooker-fusion-tap.jpg"
                alt="Quooker Fusion"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <ul>
              <li>Cold, hot and boiling water from one tap.</li>
              <li>
                Also chilled sparkling water when you combine your Quooker with
                a CUBE.
              </li>
              <li>Available in round and square spout, in 5 finishes.</li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className={styles.image}>
              <h3>Flex</h3>
              <Image
                src="/images/quooker-nordic-tap.jpg"
                alt="Quooker Nordic"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <ul>
              <li>All-in-one mixer tap and Quooker tap in the same design.</li>
              <li>
                Quooker tap also available seperately – combine it with your own
                mixer tap.
              </li>
              <li>Available in round and square spout, in 2 finishes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <FeatureCarousel slides={
        [<FeaturedQuooker key="seo-featured-carousel-quooker" />
        ]} /> */}
    </>
  );
};

export default QuookerContent;
