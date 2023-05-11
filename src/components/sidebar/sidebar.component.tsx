import React, { forwardRef } from 'react';
import styles from './sidebar.module.css';
import classNames from 'classnames';

export type SidebarProps = React.HTMLAttributes<HTMLElement>;

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ children, className, ...props }, ref) => (
    <aside
      ref={ref}
      className={classNames(styles.container, className)}
      {...props}
    >
      {children}
    </aside>
  )
);
Sidebar.displayName = 'Sidebar';

export { Sidebar };
