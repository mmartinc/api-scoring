import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  active?: boolean;
  className?: string
};

export const Button = ({ children, onClick, submit, active, className }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.container, active && styles.isActive, className)}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
