import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import paths from "core/paths";

import styles from "./AboutSteps.module.scss";
import clsx from "clsx";

const steps = [
  {
    title: "Solving Soaring Home Rennovation Costs",
    text: "Be it a kitchen, bathroom or boiler at every stage of production & distrubition a margin is added and costs pile up. Making home rennovations pricey & unaffordable.",
    image: "/images/about/soaring-costs.svg",
  },
  {
    title: "Connecting Consumers & Manufacturers",
    text: "We hated seeing customers hard earnt cash lining the pockets of distributors. Deciding enough was a enough we set out to connect consumers directly to manufacturers… Lots of manufacturers.",
    image: "/images/about/connecting.svg",
  },
  {
    title: "Over 1 Million Products at Trade Prices",
    text: "We went to work, negotiating with manufacturers from across the UK. Bringing together over one million products, from market leading brands all in one place.",
    image: "/images/about/million-products.svg",
  },
  {
    title: "Cutting Out The Middle Man",
    text: "By purchasing directly from the manufacturer we cut out the middle man and pass the savings onto you, the consumer. We also help you spread the costs by offering 0% interest, £0 deposit financing.",
    image: "/images/about/middleman.svg",
  },
  {
    title: "So What's The Catch?",
    text: "There is no catch, just bright ideas, disrupting the home improvement market. Our partnerships ensure we always secure the best prices we simply pass on the savings to you.",
    image: "/images/about/the-catch.svg",
  },
  {
    title: "Our Customers Couldn't be Happier.",
    text: "We've got thousands of customers singing our praises - perhaps even in their new showers! So join the home improvement revolution and start using Trades Prices Direct today.",
    image: "/images/about/happy-customers.svg",
  },
];

const AboutSteps = () => {
  return (
    <div className={styles.wrap}>
      <div className="container position-relative">
        <div className={styles.middleLine} />

        <div className={styles.logo}>
          <Image
            src="/branding/tpd-site-logo-white.svg"
            alt="TradePricesDirect"
            width={130}
            height={50}
            className={styles.logoImage}
          />

          <div className={styles.line} />
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className={styles.stickyContent}>
              <h3>Our Story</h3>
              <h2>How we revolutionised home improvements</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <Link href={paths.register}>
                <a className="btn btn-secondary">Register Now</a>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <ul className={styles.list}>
              {steps.map(({ title, text, image }, index) => (
                <li key={`step-${index}`}>
                  <Step title={title} text={text} image={image} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottomLine}>
        <span></span>
      </div>
    </div>
  );
};

export default AboutSteps;

const Step = ({ title, text, image }) => {
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div ref={ref} className={clsx(styles.step, inView && styles.inView)}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div className={styles.image}>
        <Image src={image} alt="" width={270} height={220} />
      </div>
    </div>
  );
};
