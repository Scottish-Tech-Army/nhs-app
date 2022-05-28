import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NHS</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Box 1</Link>
          </li>
          <li>
            <Link href='box2'>Box 2</Link>
          </li>
          <li>
            <Link href='box3'>Box 3</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
