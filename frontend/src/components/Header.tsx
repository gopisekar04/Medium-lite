import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 pt-2 border-b-2">
      <Link to={"/blogs"} className="cursor-pointer">
        <h1 className="font-serif font-extrabold text-xl">MEDIUM</h1>
      </Link>
      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
          >
            Publish
          </button>
        </Link>
        <Avatar size={"big"} name="Gopi" />
      </div>
    </div>
  );
}
