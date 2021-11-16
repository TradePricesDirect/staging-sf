import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQs.module.scss";

const FAQs = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Boilers Buyers Guide</h2>

        <Accordion title="How do you offer such cheap prices?" open>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="What Boiler do I need for my home?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Where do I start when buying a new Boiler?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="How much does it cost to put in a new boiler?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Can I fit my new boiler myself?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
