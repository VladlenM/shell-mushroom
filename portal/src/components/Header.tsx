import type { Screen } from '@shop/contracts';
import styles from './Header.module.css';

const steps: { screen: Screen; label: string }[] = [
  { screen: 'catalog', label: 'Catalog' },
  { screen: 'checkout', label: 'Checkout' },
];

interface HeaderProps {
  screen: Screen;
  outlined: boolean;
  onOutlinedChange: (outlined: boolean) => void;
}

export function Header({ screen, outlined, onOutlinedChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden>
          ◐
        </span>
        <span className={styles.name}>Shopfront</span>
      </div>

      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.screen} className={styles.step} aria-current={step.screen === screen ? 'step' : undefined}>
            <span className={styles.index}>{index + 1}</span>
            {step.label}
          </li>
        ))}
      </ol>

      <button
        type="button"
        role="switch"
        aria-checked={outlined}
        className={styles.switch}
        onClick={() => onOutlinedChange(!outlined)}
      >
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        Widget outlines
      </button>
    </header>
  );
}
