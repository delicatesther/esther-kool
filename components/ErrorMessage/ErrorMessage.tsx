import React from "react";
import style from "./errorMessage.module.scss";

export const ErrorMessage = ({ error }: any) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <div className={style.error} key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </div>
    ));
  }
  return (
    <div className={style.error}>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </div>
  );
};

export default ErrorMessage;
