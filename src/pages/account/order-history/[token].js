import AccountOrderDetails from "views/Account/OrderDetails";

export default AccountOrderDetails;

export async function getServerSideProps({ params: { token } }) {
  if (!token) return { notFound: true };

  return { props: { token } };
}
