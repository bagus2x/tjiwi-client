interface DelProps {
  isDeleted: boolean;
  children: string;
}

const Del = ({ children, isDeleted }: DelProps) => {
  return isDeleted ? <del>{children}</del> : <>{children}</>;
};

export default Del;
