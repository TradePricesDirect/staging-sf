import { v4 as uuid } from "uuid";
import {
  faAddressBook,
  faBoxOpen,
  faCreditCard,
  faHeart,
  faHome,
  faUser,
} from "@fortawesome/pro-regular-svg-icons";
import paths from "core/paths";

const routes = [
  {
    id: uuid(),
    href: paths.account.dashboard,
    name: "Dashboard",
    icon: faHome,
  },
  {
    id: uuid(),
    href: paths.account.orders,
    name: "Orders",
    icon: faBoxOpen,
  },
  {
    id: uuid(),
    href: paths.account.details,
    name: "Account Details",
    icon: faUser,
  },
  {
    id: uuid(),
    href: paths.account.addresses,
    name: "Edit Addresses",
    icon: faAddressBook,
  },
  {
    id: uuid(),
    href: paths.account.paymentMethods,
    name: "Payment Methods",
    icon: faCreditCard,
  },
  {
    id: uuid(),
    href: paths.wishlists,
    name: "Wishlists",
    icon: faHeart,
  },
];

export default routes;
