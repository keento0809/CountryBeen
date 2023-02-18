type Props = {
  isSignup: boolean;
  onClick: (bool: boolean) => void;
};

const HeroTab = ({ isSignup, onClick }: Props) => {
  return (
    <div>
      <h1 className="mb-5 text-4xl lg:text-5xl font-bold text-white">
        CountryBeen
      </h1>
      <p className="mb-5 text-slate-300">
        Have you ever consider how many countries you've been to so far and
        analyzing it visually? Here's the best tool making that request happen.
        Start a brand new adventure here!
      </p>
      <p className="mb-2 text-sm">
        {isSignup ? "Have an account?" : "Need an account?"}{" "}
        <span
          onClick={() => onClick(!isSignup)}
          className="text-secondary cursor-pointer"
        >
          {isSignup ? "Login" : "Signup"}
        </span>{" "}
        here!
      </p>
    </div>
  );
};

export default HeroTab;
