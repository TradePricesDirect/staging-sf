import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQs.module.scss";

const FAQs = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Confused? Check out our FAQs</h2>

        <Accordion title="How do I make monthly Payments?" open>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Are there any limits on how much I can spend?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Can I request delivery to an address other than my home address?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="What happens to me loan if I want to return my order?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="What happens if I only use my new kitchen to cook pizza?">
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
