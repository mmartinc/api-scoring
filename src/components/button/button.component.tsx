import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  active?: boolean;
};

export const Button = ({ children, onClick, submit, active }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.container, active && styles.isActive)}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
