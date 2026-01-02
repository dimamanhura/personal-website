interface ActionsWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export const ActionsWrapper = ({ children }: ActionsWrapperProps) => {
  return <div className="flex items-center justify-center gap-2">{children}</div>;
};

export default ActionsWrapper;
