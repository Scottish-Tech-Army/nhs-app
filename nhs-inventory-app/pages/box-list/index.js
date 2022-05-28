import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Card from '../ui/Card'

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <Card></Card>
    </div>
  );
}

export default Layout;