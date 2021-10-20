import withAuth from "../withAuth";
import Account from "components/templates/Account";
import PersonalDetails from "./PersonalDetails";
import PasswordChange from "./PasswordChange";

const AccountDetails = () => {
  return (
    <Account>
      <h2 className="mb-4">Personal Details</h2>
      <PersonalDetails />

      <hr />

      <h2 className="mb-4">Password Change</h2>
      <PasswordChange />
    </Account>
  );
};

export default withAuth(AccountDetails);
