import Quote from "../components/Quote";
import AuthSignin from "../components/AuthSignin";

export default function Signup() {
  return (
    <div>
      <div className=" lg:grid grid-cols-2">
        <div>
          <AuthSignin />
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </div>
  );
}
