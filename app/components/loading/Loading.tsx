import { LoadingProps } from "@/app/type/type";

const Loading: React.FC<LoadingProps> = ({ isCreating, text }) => {
  return isCreating === true ? (
    <div
      className="flex flex-row items-baseline justify-center"
      aria-label="now creating problem"
    >
      <p className="mr-3 flex animate-pulse justify-end text-2xl">{text}</p>
      <div className="flex flex-row items-center justify-center gap-3">
        <div
          className="h-2 w-2 animate-ping rounded-full bg-blue-600"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="h-2 w-2 animate-ping rounded-full bg-blue-600"
          style={{ animationDelay: "0.125s" }}
        ></div>
        <div
          className="h-2 w-2 animate-ping rounded-full bg-blue-600"
          style={{ animationDelay: "0.15s" }}
        ></div>
      </div>
    </div>
  ) : null;
};

export default Loading;
