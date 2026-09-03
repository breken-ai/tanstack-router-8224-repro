import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={styles.searchContainer} data-testid="dashboard">
      dashboard (shared chunk, css-module)
    </div>
  )
}
