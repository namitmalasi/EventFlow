const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl font-bold text-primary uppercase mt-5">{title}</h1>
  );
};

export default PageTitle;
