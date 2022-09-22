import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate()
  console.error(error);

  const handleBackButtonCLick = () => {
    navigate('/')
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status} </i>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button onClick={handleBackButtonCLick}>Back</Button>
    </div>
  );
}

export default ErrorPage;