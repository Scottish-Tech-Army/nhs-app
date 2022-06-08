import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NHS</div>
      <nav>
        <ul>
          <li>
          <Link href='/scan'>Scan</Link>
          </li>
          <li>
            <Link href='/storage-area'>
              Library
            </Link>
          </li>
          <li>
            <Link href='/review'>Review</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
