export const Title = ({ text }: { text: string }) => {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
      {text}
    </span>
  );
};
