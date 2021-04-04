import { Redirect } from "react-router";
// import { verifyToken } from "services/auth.service";
import { GET_TOKEN } from "commons/helpers";

export default function AutoPassLogin(Component) {
  return () => {
    const isAuth = GET_TOKEN();

    if (isAuth) {
      return <Redirect to="/list-room" />;
    } else {
      return <Component />;
    }
  };
}
