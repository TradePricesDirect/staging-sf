import { Fragment } from "react";
import nl2br from "react-nl2br";
import pluralize from "utils/pluralize";
import RichTextEditorContent from "components/atoms/RichTextEditorContent";

import styles from "./Content.module.scss";

const Content = ({ content, stats, colors }) => {
  return (
    <div className="container py-8">
      <div className="row">
        <div className="col-md-8">
          <div className={styles.main}>
            <div className={styles.content}>
              <RichTextEditorContent jsonData={content} />
            </div>

            <div className="row">
              <div className="col-12 col-lg-6">
                <div className={styles.tile}>
                  <h3>Get Personalised Quote</h3>
                  <p>
                    Speak to an expert today who will help you design your dream
                    kitchen.
                  </p>

                  <img
                    className={styles.image}
                    src="/images/personalised-quote.svg"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className={styles.tile}>
                  <h3>Instant Finance Available</h3>
                  <p>
                    Spread the cost of your purchase and get up to 5 years
                    credit.
                  </p>

                  <img
                    className={styles.image}
                    src="/images/instant-finance.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <aside>
            <dl className={styles.stats}>
              {stats.map(({ key, value }, index) => (
                <Fragment key={`stat-${index}`}>
                  <dt>{key}</dt>
                  <dd>{nl2br(value)}</dd>
                </Fragment>
              ))}

              <dt>Available Colors</dt>
              <dd>
                <p>{pluralize(colors.length, "option")} to choose from</p>

                <ul className={styles.colors}>
                  {colors.map(({ name, slug, value }) => (
                    <li
                      key={`available-color-${slug}`}
                      className={styles.colorItem}
                    >
                      <div
                        className={styles.colorSwatch}
                        style={{ background: value }}
                        data-color={slug}
                      />

                      <div>{name}</div>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Content;
