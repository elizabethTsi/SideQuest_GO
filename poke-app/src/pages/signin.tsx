
type SigninProps = {
  onContinue: () => void;
};
export default function Signin({ onContinue }: SigninProps) {
    return (
        <div className="relative h-full">
        <img
            src="/images/sidequest.png"
            alt="SideQuest adventure"
            className="h-full rounded-2xl object-cover"
          />
          <div className="absolute top-70 right-12 z-10">
            <div className="flex flex-col gap-2  text-sm text-wid">
              <p className="flex flex-row items-center bg-white py-2 px-5 rounded-md">
                <img
                  src="/images/facebook.png"
                  alt="Facebook Logo"
                  className="h-5 w-5 mr-3"
                /> Facebook</p>
              <p className="flex flex-row items-center bg-white py-2 px-5 rounded-md"> 
                <img
                  src="/images/google.png"
                  alt="Google Logo"
                  className="h-5 w-5 mr-3"
                />
                Google</p>
               <button
                    onClick={onContinue}
                    className="bg-blue-300 py-2 px-5 uppercase rounded-md"> 
                        Georgia Tech SSO
                </button>
            </div>
          </div>
    </div>
)}