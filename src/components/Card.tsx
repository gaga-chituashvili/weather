type CardProps = {
  title: string;
  description: string;
  isActive?: boolean;
};

const Card = ({ title, description, isActive = false }: CardProps) => {
  return (
    <div className={isActive ? "active" : ""}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
