import { Link } from "react-router-dom";
import { Button } from "antd";
function NotFoundPage() {
  return (
    <>
      <div className="text-center">
        <div className="flex w-full justify-center">
          <img src="\404Image.png" className="w-64 h-64"></img>
        </div>
        <p>Page not found</p>
        <p>
          Oops! It looks like the page you're trying to access doesn't exist or
          may have been moved.
        </p>
        <div className="mt-1.5 md:mt-3 text-center">
          <Link to="/login">
            <Button type="link" className="!p-0">
              <p className="text-[#3F72AF] text-sm font-sans inter-normal ">
                Go back
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default NotFoundPage;
