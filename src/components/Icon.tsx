import { IconContext, type IconType } from "react-icons";

interface Props {
  className: string;
  label: IconType;
}

function Icon({ label, className }: Props) {
  const IconComponent = label;

  return (
    <IconContext.Provider value={{ className }}>
      <IconComponent />
    </IconContext.Provider>
  );
}

export default Icon;
