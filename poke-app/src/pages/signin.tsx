
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
              <p className="bg-white py-2 px-5 rounded-md"> Facebook</p>
              <p className="bg-white py-2 px-5 rounded-md"> Google</p>
               <button
                    onClick={onContinue}
                    className="bg-blue-300 py-2 px-5 uppercase rounded-md"> 
                        Georgia Tech SSO
                </button>
            </div>
          </div>
    </div>
)}