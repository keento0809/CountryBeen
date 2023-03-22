interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return (
    <div className="title text-center text-white">
      <h2 className="py-6 font-semibold text-2xl dark:text-gray-200">
        {title}
      </h2>
    </div>
  );
};

export default Title;
