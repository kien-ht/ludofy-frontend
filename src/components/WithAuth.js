import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { GET_TOKEN } from "commons/helpers";
import { verifyToken } from "services/auth.service";

export default function WithAuth(Component) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isVefiried, setIsVefiried] = useState(false);

  // // const verify = async () => await verifyToken();

  // // useEffect(() => {
  // //   setIsLoading(true);
  // //   verifyToken()
  // //     .then((res) => {
  // //       if (res.success) {
  // //         setIsVefiried(true);
  // //       }
  // //       setIsLoading(false);
  // //     })
  // //     .catch((err) => {
  // //       console.log(err);
  // //     });
  // // }, []);

  return () => {
    // return <Component />;
    const isAuth = GET_TOKEN();

    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to="/login" />;
    }
  };
}
