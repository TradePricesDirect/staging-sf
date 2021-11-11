import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQs.module.scss";

const FAQs = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Not convinced? Check out our FAQs</h2>

        <Accordion title="Sounds too good to be true, what's the catch?" open>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="How does TPD benefit?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Does this count as employment?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="Can I stop my membership at any time?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            aperiam excepturi, magni optio tenetur sapiente ea mollitia eaque
            ipsa, a facilis delectus dicta corrupti corporis ullam sunt laborum.
            Velit debitis eius ratione ullam ut atque? Quas nihil minus laborum
            quos.
          </p>
        </Accordion>

        <Accordion title="What skills do I need to join?">
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
