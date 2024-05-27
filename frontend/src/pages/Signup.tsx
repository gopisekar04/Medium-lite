import Quote from "../components/Quote";
import AuthSignup from "../components/AuthSignup";

export default function Signup() {
  return (
    <div>
      <div className=" lg:grid grid-cols-2">
        <div>
          <AuthSignup />
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </div>
  );
}
