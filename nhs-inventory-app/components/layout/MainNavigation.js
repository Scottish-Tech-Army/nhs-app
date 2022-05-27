import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>StarMap</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Stars</Link>
          </li>
          <li>
            <Link href='project/wallet'>Wallet</Link>
          </li>
          <li>
            <Link href='project/my-account'>Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
