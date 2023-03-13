import { FC } from "react";
import Link from "next/link";

import styles from "./Button.module.scss";
import clsx from "clsx";
import NavIcon from "../NavIcon";
import { storyblokEditable } from "@storyblok/react";
import { icons } from "core/constants";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";

const Button: FC<{
  blok?: {
    path?: string;
    label: string;
    icon?: string;
    onClick?: any;
    hover?: boolean;
    color?: string;
    border?: boolean;
    disabled?: boolean;
    className?: string;
    loading?: boolean;
    submit?: boolean;
    gap?: number;
  };
  path?: string;
  label: string;
  icon?: IconDefinition;
  onClick?: any;
  hover?: boolean;
  color?: string;
  border?: boolean;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  submit?: boolean;
}> = (props) => {
  const { blok } = props;

  const conditionalProps = blok ? blok : props;
  const {
    path,
    label,
    icon,
    onClick,
    hover,
    border,
    disabled,
    color,
    loading,
    submit,
    className,
  } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};

  const innerContent = (
    <>
      <span className={styles.label}>{label}</span>
      {icon && (
        <div className={clsx(styles.icon, loading ? styles.spin : "")}>
          {" "}
          <NavIcon
            icon={loading ? icons.faSync : blok ? icons[icon as string] : icon}
            color={color === "secondary" ? "white" : color}
          />
        </div>
      )}
    </>
  );

  return (
    <div
      className={clsx(styles.container, className)}
      {...storyblokEditableProps}
    >
      {path ? (
        <Link
          href={path}
          className={clsx(
            styles.button,
            hover ? styles.hover : "",
            border ? styles.border : "",
            color ? styles[color] : ""
          )}
          onClick={onClick}
        >
          {innerContent}
        </Link>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className={clsx(
            styles.button,
            disabled ? styles.disabled : "",
            hover ? styles.hover : "",
            border ? styles.border : "",
            color ? styles[color] : ""
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {innerContent}
        </button>
      )}
    </div>
  );
};

export default Button;
